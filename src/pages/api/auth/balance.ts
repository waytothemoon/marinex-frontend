import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session && session.token.accessToken) {
    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

    await axios
      .get(`/api/v1/user/balance`)
      .then((response) => {
        res.status(200).json(response.data);
      })
      .catch((error) => {
        res.status(400).json({ error: error });
      });
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
