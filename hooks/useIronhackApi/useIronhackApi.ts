import { useContext } from 'react';

import { AuthContext } from '../../components/Auth';

import axios, { AxiosInstance } from 'axios';

let currentToken = '';

const ironhack = axios.create({ headers: { Accept: 'application/json' } });

ironhack.interceptors.request.use((axiosConfig) => ({
  ...axiosConfig,
  headers: {
    ...axiosConfig.headers,
    Authorization: `Bearer ${currentToken}`,
  },
}));

export const useIronhackApi = function (): AxiosInstance {
  const keycloak = useContext(AuthContext);
  if (keycloak?.token) {
    currentToken = keycloak.token;
  }
  return ironhack;
};
