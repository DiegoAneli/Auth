import { getSession } from 'next-auth/react';
import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await getSession({ req });
  console.log("Session:", session);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db();

  if (req.method === 'POST') {
    const { name } = req.body;

    try {
      const result = await db.collection('users').updateOne(
        { email: session.user.email }, // Cerchiamo l'utente usando l'email
        { $set: { name: name } } // Aggiorniamo solo il campo del nome
      );
      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'User update failed' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      console.error("Database update error:", error);
      return res.status(500).json({ message: 'Database update failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
