import { useQuery, useQueryClient } from 'react-query';

import { useIronhackApi } from '@/hooks/useIronhackApi';

import { config } from '@/config';
import { useStudents } from '@/hooks';
import type { Cohort, Student } from '@ironhack/types';
import type { AxiosInstance } from 'axios';
import * as R from 'ramda';

type ApiResponse = {
  meta: { page?: number };
  result: Cohort[];
};

async function searchCohorts(
  ironhack: AxiosInstance,
  cohortIds: string[] | unknown[],
): Promise<Cohort[]> {
  const response = await ironhack.post<ApiResponse>(
    `${config.userServiceHost}/v1/cohorts/search`,
    { _id: { $in: cohortIds } },
  );

  return response.data.result;
}

export const useCohorts = function (): Cohort[] {
  const ironhack = useIronhackApi();
  const queryClient = useQueryClient();

  const { data: students } = useStudents();

  const cohortIds = R.pipe(
    R.defaultTo([]) as (b: Student[]) => Record<'cohort', unknown>[],
    R.pluck('cohort'),
  )(students as Student[]) as string[];

  const { data } = useQuery<Cohort[], Error>(
    ['cohorts', { cohortIds }],
    () => searchCohorts(ironhack, cohortIds),
    {
      enabled: cohortIds.length > 0,
      staleTime: 1000 * 60 * 60 * 3, // 1 hours
    },
  );

  if (data) {
    data.forEach((cohort) =>
      queryClient.setQueryData(['cohorts', cohort.id], cohort),
    );
  }

  return data as Cohort[];
};
