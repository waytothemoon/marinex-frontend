import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'utils/axios';
import { UserRole } from 'types/auth';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await getSession({ req });

  if (session && session.token.accessToken) {
    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

    const response = await axios.get(`/api/v1/user/current`).catch((err) => {
      console.log(err);
      if (err) {
        res.status(err.response.status).json({ error: err });
      }
    });
    if (response) {
      const data = {
        ...response.data,
        role:
          response.data.role === 'investor' ? UserRole.INVESTOR : response.data.role === 'prowner' ? UserRole.PROJECT_OWNER : UserRole.ADMIN
      };
      res.status(200).json(data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
