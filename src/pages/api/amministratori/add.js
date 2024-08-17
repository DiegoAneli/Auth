import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { name, surname, phone, email, ragioneSociale, partitaIva, codiceFiscale, recapiti, numeroIscrizioneAlbo, assicurazione, specializzazioni, esperienza, dataInizioIncarico} = req.body;

    const newAmmninistratore = {
      name, 
      surname, 
      phone, 
      email, 
      ragioneSociale, 
      partitaIva, 
      codiceFiscale, 
      recapiti, 
      numeroIscrizioneAlbo, 
      assicurazione, 
      specializzazioni, 
      esperienza,
      dataInizioIncarico,
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      
      // Inserisci il nuovo documento
      const result = await db.collection('amministratori').insertOne(newAmmninistratore);

      // Trova il documento appena inserito
      const insertedAmministratore = await db.collection('amministratori').findOne({ _id: result.insertedId });

      return res.status(201).json(insertedAmministratore);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add amministratore', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
