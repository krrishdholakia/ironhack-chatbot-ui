import nextAuth from 'next-auth';
import type { NextAuthOptions } from 'next-auth';
import type { JWT } from 'next-auth/jwt';
import keycloakProvider from 'next-auth/providers/keycloak';

import { start } from '@/lib/bugsnag';
import Bugsnag from '@bugsnag/js';
import axios from 'axios';
import * as R from 'ramda';

start();

type RefreshedToken = {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  refresh_expires_in: number;
};

const refreshAccessToken = async (token: JWT): Promise<JWT> => {
  try {
    if (Date.now() > token.refreshTokenExpired) throw Error;

    const params = new URLSearchParams({
      grant_type: 'refresh_token',
      client_id: process.env.KEYCLOAK_ID as string,
      client_secret: process.env.KEYCLOAK_SECRET as string,
      refresh_token: token.refreshToken,
    });
    const response = await axios.post<RefreshedToken>(
      `${process.env.KEYCLOAK_ISSUER as string}/protocol/openid-connect/token`,
      params.toString(),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      },
    );

    return {
      ...token,
      accessToken: response.data.access_token,
      accessTokenExpired: Date.now() + (response.data.expires_in - 15) * 1000,
      refreshToken: response.data.refresh_token ?? token.refreshToken,
      refreshTokenExpired:
        Date.now() + (response.data.refresh_expires_in - 15) * 1000,
    };
  } catch (error: any) {
    Bugsnag.notify(error, (bugsnagEvent) => {
      bugsnagEvent.context = 'refresh access token';
      bugsnagEvent.addMetadata('Token', token);
    });
    return {
      ...token,
      error: 'RefreshAccessTokenError',
    };
  }
};

export const authOptions: NextAuthOptions = {
  providers: [
    keycloakProvider({
      clientId: R.defaultTo('', process.env.KEYCLOAK_ID),
      clientSecret: R.defaultTo('', process.env.KEYCLOAK_SECRET),
      issuer: process.env.KEYCLOAK_ISSUER,
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    jwt({ token, user, account }) {
      // Initial sign in
      if (account && user && token) {
        const newToken = token;
        newToken.accessToken = account.access_token;
        newToken.refreshToken = account.refresh_token;
        newToken.accessTokenExpired = (account.expires_at - 15) * 1000;
        newToken.refreshTokenExpired =
          Date.now() + (account.refresh_expires_in - 15) * 1000;
        newToken.user = user;
        return token;
      }

      if (Date.now() < token.accessTokenExpired) return token;

      return refreshAccessToken(token);
    },
    session({ session, token }) {
      const newSession = session;
      if (token) {
        newSession.accessToken = token.accessToken;
        newSession.error = token.error;
        if (token.error) {
          Bugsnag.notify(new Error('login error'), (event) => {
            event.context = 'auth';
            event.addMetadata('Session', session);
            event.addMetadata('Token', token);
            event.addMetadata('Token Error', { error: token.error });
          });
        }
      }
      return newSession;
    },
  },
};

export default nextAuth(authOptions);
