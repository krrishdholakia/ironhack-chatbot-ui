import { NextApiRequest, NextApiResponse } from 'next';

import verifyToken from '../../lib/auth';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<void> => {
  const { prompt } = req.body;
  let session;
  try {
    const authorization = req?.headers?.authorization?.split(' ')[1];
    session = await verifyToken(authorization);
  } catch (error) {
    return res.status(401).send({ error: 'You must be logged in.' });
  }

  await fetch(
    'https://n8n-ih.herokuapp.com/webhook/a5fa6da2-5717-4b35-9fe1-4734620b8eb9',
    {
      method: 'POST',
      headers: {
        'X-API-Key': 'kwr4ZGD.ktq7ztn3nyr',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: session.name,
        user_email: session.email,
        prompt,
      }),
    },
  );

  res.status(200).send('OK');
};

export default handler;
