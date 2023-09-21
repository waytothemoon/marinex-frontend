import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session) {
    const response = await axios.post(`/api/v1/user/re-send/otp-verification`, { email: session.token.email }).catch((err) => {
      console.log(err);
      if (err) {
        console.log(err.response.data);
        res.status(err.response.status).json({ error: err });
      }
    });
    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
