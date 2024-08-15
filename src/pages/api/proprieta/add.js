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
      
      // Inserisci il nuovo documento
      const result = await db.collection('condomini').insertOne(newCondomino);

      // Trova il documento appena inserito
      const insertedCondomino = await db.collection('condomini').findOne({ _id: result.insertedId });

      return res.status(201).json(insertedCondomino);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add condomino', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
