import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    const interventi = await db.collection('interventi').find().toArray();

    res.status(200).json(interventi);
  } catch (error) {
    console.error('Errore nel recupero degli interventi:', error);
    res.status(500).json({ message: 'Errore nel recupero degli interventi' });
  }
};
