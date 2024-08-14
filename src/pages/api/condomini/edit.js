import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async (req, res) => {
    const session = await unstable_getServerSession(req, res, authOptions);
    
  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'PUT') {
    const { id } = req.query;
    const { name, surname, phone, email, edificio, scala, garage, postoAuto, proprietario, affittuario } = req.body;

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      const result = await db.collection('condomini').findOneAndUpdate(
        { _id: new ObjectId(id) },
        {
          $set: {
            name,
            surname,
            phone,
            email,
            edificio,
            scala,
            garage,
            postoAuto,
            proprietario,
            affittuario
          }
        },
        { returnDocument: 'after' } // Utilizza returnDocument: 'after' per restituire il documento aggiornato
      );

      if (!result.value) {
        return res.status(404).json({ message: 'Condomino not found' });
      }

      return res.status(200).json(result.value);
    } catch (error) {
      console.error('Failed to update condomino:', error);
      return res.status(500).json({ message: 'Failed to update condomino', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};