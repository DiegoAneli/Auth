import { NextApiRequest, NextApiResponse } from 'next';
import { getSession } from 'next-auth/react';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await getSession({ req });

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'GET') {
    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    try {
      const user = await db.collection('users').findOne({ email: session.user.email });
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }

      return res.status(200).json(user.projects || []);
    } catch (error) {
      return res.status(500).json({ message: 'Database query failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
