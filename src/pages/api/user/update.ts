import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  const client = await clientPromise;
  const db = client.db('Users_form_registration');

  if (req.method === 'POST') {
    const { name, surname, phone, email, address, city, postalCode, fiscalCode, image, birthdate } = req.body;

    try {
      const result = await db.collection('users').updateOne(
        { email: session.user.email },
        { $set: { name, surname, phone, email, address, city, postalCode, fiscalCode, image, birthdate } }
      );
      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'User update failed' });
      }
      return res.status(200).json({ message: 'User updated successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Database update failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
