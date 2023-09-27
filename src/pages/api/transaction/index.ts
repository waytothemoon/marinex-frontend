import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken) {
    const { txType, page } = req.query;
    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };
    console.log('query -->', `/api/v1/transaction/all?page=${page}&txType=${txType}`);
    const response = await axios.get(`/api/v1/transaction/all?page=${page}&txType=${txType}`).catch((err) => {
      if (err && err.response) {
        res.status(err.response.status).json(err);
      }
    });
    if (response) {
      console.log('transaction history -->', response.data);
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
