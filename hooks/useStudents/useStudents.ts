import { useContext } from 'react';
import { QueryObserverResult, useQuery } from 'react-query';
import type { UseQueryOptions } from 'react-query';

import { AuthContext } from '../../components/Auth';

import { config } from '@/config';
import { useIronhackApi } from '@/hooks';
import type { Student } from '@ironhack/types';
import { AxiosInstance } from 'axios';
import * as R from 'ramda';

type ApiResponse = {
  meta: { page?: number };
  result: Student[];
};

async function searchStudents(ironhack: AxiosInstance): Promise<Student[]> {
  const response = await ironhack.get<ApiResponse>(
    `${config.userServiceHost}/v1/students/user/token`,
  );

  const results = response?.data?.result;

  if (R.either(R.isNil, R.isEmpty)(results))
    throw new Error('Students not found');
  return results;
}

export const useStudents = function (
  options?: UseQueryOptions<Student[], Error>,
): QueryObserverResult<Student[], Error> {
  const keycloak = useContext(AuthContext);
  const ironhack = useIronhackApi();

  const email = keycloak?.tokenParsed?.email;
  const enabledQuery = email;

  const data = useQuery<Student[], Error>(
    ['students', { email }],
    () => searchStudents(ironhack),
    {
      staleTime: 1000 * 60 * 60 * 3, // 3 hours
      ...options,
      enabled: Boolean(enabledQuery) && R.when(R.isNil, R.T, options?.enabled),
    },
  );

  return data;
};
