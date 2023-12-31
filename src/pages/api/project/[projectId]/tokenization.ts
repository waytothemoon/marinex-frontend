import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from 'types/auth';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken && session.token.role === UserRole.ADMIN) {
    const { projectId } = req.query;

    axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

    const response = await axios.post(`/api/v1/project/${projectId}/tokenization`, req.body).catch((err) => {
      res.status(err.response.status).json({ error: err });
    });
    if (response) {
      res.status(200).json(response.data);
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
