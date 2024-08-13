import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, surname, phone, email, edificio, scala, garage, postoAuto, proprietario, affittuario } = req.body;

    const newCondomino = {
      name,
      surname,
      phone,
      email,
      edificio,
      scala,
      garage,
      postoAuto,
      proprietario,
      affittuario,
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      const result = await db.collection('condomini').insertOne(newCondomino);
      return res.status(201).json(result.ops[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add condomino', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
