import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

   if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    const condomini = await db.collection('condomini').find().toArray();

    res.status(200).json(condomini);
  } catch (error) {
    console.error('Errore nel recupero dei condomini:', error);
    res.status(500).json({ message: 'Errore nel recupero dei condomini' });
  }
};