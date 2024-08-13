import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session || !session.user || !session.user.email) {
        return res.status(401).json({ message: 'Unauthorized' });
      }
      
  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');

      const condomini = await db.collection('condomini').find().toArray();

      return res.status(200).json(condomini);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to fetch condomini', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
