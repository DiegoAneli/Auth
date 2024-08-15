import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, referente, phone, email, tipologiaComplessoResidenziale, recapiti } = req.body;

    const newCondominio = {
      name, 
      referente, 
      phone, 
      email, 
      tipologiaComplessoResidenziale, 
      recapiti,
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      
      // Inserisci il nuovo documento
      const result = await db.collection('condominii').insertOne(newCondominio);

      // Trova il documento appena inserito
      const insertedCondominio = await db.collection('condominii').findOne({ _id: result.insertedId });

      return res.status(201).json(insertedCondominio);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add condominio', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
