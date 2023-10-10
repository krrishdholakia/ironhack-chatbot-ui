import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
  });

  const { cohort_id, custom_params, responses, student_id, survey_type } =
    req.body;

  await fetch(`${process.env.N8N_SATISFACTION_SURVEY_ENDPOINT}`, {
    method: 'POST',
    headers: {
      'X-API-Key': process.env.N8N_API_KEY as string,
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

export default handler;
