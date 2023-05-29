import { NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth/next';

import { authOptions } from './auth/[...nextauth]';

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse,
): Promise<Response> => {
  const session = await getServerSession(req, res, authOptions);

  if (!session) {
    return new Response('Error', {
      status: 401,
      statusText: 'You must be logged in.',
    });
  }

  const { prompt } = req.body;

  return fetch(
    'https://n8n-ih.herokuapp.com/webhook/a5fa6da2-5717-4b35-9fe1-4734620b8eb9',
    {
      method: 'POST',
      headers: {
        'X-API-Key': 'kwr4ZGD.ktq7ztn3nyr',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_name: session.user.name,
        user_email: session.user.email,
        prompt,
      }),
    },
  );
};

export default handler;
