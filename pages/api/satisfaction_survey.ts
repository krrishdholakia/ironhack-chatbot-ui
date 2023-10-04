import { NextApiRequest, NextApiResponse } from 'next';
import NextCors from 'nextjs-cors';

import verifyToken from '../../lib/auth';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await NextCors(req, res, {
    methods: ['POST'],
    origin: '*',
  });

  const { surveyType, responses } = req.body;

  let session;

  try {
    const authorization = req?.headers?.authorization?.split(' ')[1];
    session = await verifyToken(authorization);
  } catch (error) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  await fetch(
    `https://n8n-ih.herokuapp.com/webhook/${process.env.N8N_SATISFACTION_SURVEY_PATH}`,
    {
      method: 'POST',
      headers: {
        'X-API-Key': process.env.N8N_API_KEY as string,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: session.name,
        user_email: session.email,
        surveyType,
        responses,
      }),
    },
  );

  res.status(200).send('OK');
};

export default handler;
