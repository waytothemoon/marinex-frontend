import { getSession } from 'next-auth/react';
import type { NextApiRequest, NextApiResponse } from 'next';
import { UserRole } from 'types/auth';
import axios from 'utils/axios';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const session = await await getSession({ req });

  if (session && session.token.accessToken) {
    if (session.token.role === UserRole.PROJECT_OWNER) {
      console.log(req.body);
      const formData = new FormData();
      formData.append('projectImage', req.body.projectImage);
      formData.append('projectName', req.body.projectName);
      formData.append('description', req.body.description);
      formData.append('imoNumber', req.body.imoNumber);
      formData.append('vesselType', req.body.vesselType);
      formData.append('builtYear', req.body.builtYear);
      formData.append('flag', req.body.flag);
      formData.append('estimatedEarning', req.body.estimatedEarning);

      const config = {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      };
      axios.defaults.headers.common = { Authorization: `bearer ${session.token.accessToken as string}` };

      const response = await axios.post(`/api/v1/project/register`, formData, config).catch((err) => {
        // console.log(err);
        res.status(500).json(err);
      });

      if (response) {
        res.status(200).json(response);
      }
    }
  } else {
    res.status(404).send({ error: 'No permission' });
  }
}
