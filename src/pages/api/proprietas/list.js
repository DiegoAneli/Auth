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

    const proprietas = await db.collection('proprietas').find().toArray();

    res.status(200).json(proprietas);
  } catch (error) {
    console.error('Errore nel recupero delle proprietas:', error);
    res.status(500).json({ message: 'Errore nel recupero delle proprietas' });
  }
};