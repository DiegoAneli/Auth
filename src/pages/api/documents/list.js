import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('Users_form_registration');

  try {
    const user = await db.collection('users').findOne(
      { email: session.user.email },
      { projection: { documents: 1 } }
    );

    if (!user || !user.documents) {
      return res.status(404).json([]);
    }

    return res.status(200).json(user.documents);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve documents', error });
  }
};
