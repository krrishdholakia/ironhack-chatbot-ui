import { useCohorts } from '@/hooks/useCohorts';

import { Cohort } from '@ironhack/types';
import moment from 'moment';
import * as R from 'ramda';

function buildCohortName(cohort: Cohort) {
  const { track, format, campus, start_date, language } = cohort;
  const startDate = moment.utc(start_date).format('YYYY-MM-DD');
  return `${campus && campus.toUpperCase()} ${track && track.toUpperCase()} ${
    format && format.toUpperCase()
  } ${startDate} ${language && language.toUpperCase()}`;
}

export const useCohortName = function (): string {
  const cohorts = useCohorts();

  const cohort = R.head(cohorts || []);

  return cohort ? buildCohortName(cohort) : '';
};
