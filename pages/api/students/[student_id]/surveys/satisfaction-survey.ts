import { NextApiRequest, NextApiResponse } from 'next';

import { submitSatisfactionSurvey } from '@/controllers';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  await submitSatisfactionSurvey(req, res);
};

export default handler;
