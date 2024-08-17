import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { nome, dataInizio, dataFine, tipologia, azienda, costo, edificio, scala, tipoIntervento } = req.body;

    const newIntervento = {
      nome,
      dataInizio,
      dataFine,
      tipologia,
      azienda,
      costo,
      edificio,
      scala,
      tipoIntervento,
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      
      // Inserisci il nuovo intervento
      const result = await db.collection('interventi').insertOne(newIntervento);

      // Trova il documento appena inserito
      const insertedIntervento = await db.collection('interventi').findOne({ _id: result.insertedId });

      return res.status(201).json(insertedIntervento);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add intervento', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
