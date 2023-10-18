import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import { config } from '@/config';

export const submitSatisfactionSurvey = async (
  req: NextApiRequest,
  res: NextApiResponse,
) => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
  });

  const { student_id } = req.query;
  const { cohort_id, custom_params, responses, survey_type } = req.body;

  const { apiKey, endpoint } = config.n8n;

  fetch(`${endpoint}`, {
    method: 'POST',
    headers: {
      'X-API-Key': apiKey as string,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...(custom_params && { custom_params: custom_params }),
      cohort_id,
      responses,
      student_id,
      survey_type,
    }),
  });

  res.status(200).send('OK');
};
