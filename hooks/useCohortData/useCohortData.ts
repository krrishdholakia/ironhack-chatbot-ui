import { useCohorts } from '@/hooks/useCohorts';

import { Cohort } from '@ironhack/types';
import moment from 'moment';
import * as R from 'ramda';

type CohortData = {
  name: string;
  week: number;
  track: Cohort['track'];
};

function buildCohortName(cohort: Cohort) {
  const { track, format, campus, start_date, language } = cohort;
  const startDate = moment.utc(start_date).format('YYYY-MM-DD');
  return `${campus && campus.toUpperCase()} ${track && track.toUpperCase()} ${
    format && format.toUpperCase()
  } ${startDate} ${language && language.toUpperCase()}`;
}

function getCohortWeek(cohort: Cohort): number {
  return Math.ceil(
    Math.abs(moment.utc(cohort.start_date).diff(moment(), 'weeks', true)),
  );
}

export const useCohortData = function (): CohortData {
  const cohorts = useCohorts();

  const cohort = R.head(cohorts || []);

  if (!cohort) {
    return { name: '', week: 0, track: undefined };
  }

  return {
    name: buildCohortName(cohort),
    week: getCohortWeek(cohort),
    track: cohort.track,
  };
};
