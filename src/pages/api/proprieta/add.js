import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const { edificio, scala, piano, balcone, garage, postoAuto, numeroCatastale, descrizione, superficie, numeroVani, raffreddamento, statoManutenzione, allaccioGas, induzione, sky, allaccioInternet, numeroBagni, giardino, cantina, inVendita, inAffitto, dataInizioProprieta, fineProprieta, millesimi, } = req.body;

    const newProprieta = {
      edificio, 
      scala, 
      piano, 
      balcone, 
      garage, 
      postoAuto, 
      numeroCatastale, 
      descrizione, 
      superficie, 
      numeroVani, 
      raffreddamento, 
      statoManutenzione, 
      allaccioGas, 
      induzione, 
      sky, 
      allaccioInternet, 
      numeroBagni, 
      giardino, 
      cantina, 
      inVendita, 
      inAffitto,
      dataInizioProprieta,
      fineProprieta,
      millesimi,
      createdAt: new Date(),
    };

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      
      // Inserisci il nuovo documento
      const result = await db.collection('proprietas').insertOne(newProprieta);

      // Trova il documento appena inserito
      const insertedProprieta = await db.collection('proprietas').findOne({ _id: result.insertedId });

      return res.status(201).json(insertedProprieta);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to add proprietà', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
