import { createContext, useEffect, useState } from 'react';

import dynamic from 'next/dynamic';

import Keycloak from 'keycloak-js';

type AuthProps = {
  children: JSX.Element;
};

let keycloak: Keycloak;

export const AuthContext = createContext<Keycloak | null>(null);

function Auth({ children }: AuthProps): JSX.Element | null {
  const [initialized, setInitialized] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    if (!initialized) {
      setInitialized(true);
      keycloak = new Keycloak({
        realm: 'students',
        url: 'https://account.ironhack.com/auth',
        clientId: 'student-portal-provider',
      });
      keycloak
        .init({ onLoad: 'login-required', checkLoginIframe: false })
        .then((authenticated) => setAuthenticated(authenticated));
    }
  }, [initialized]);

  if (!authenticated) {
    return null;
  }

  return (
    <AuthContext.Provider value={keycloak}>{children}</AuthContext.Provider>
  );
}

export default dynamic(() => Promise.resolve(Auth), {
  ssr: false,
});
