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

  if (req.method === 'DELETE') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Condomino ID is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');

      const result = await db.collection('condomini').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Condomino not found or failed to delete' });
      }

      return res.status(200).json({ message: 'Condomino deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Failed to delete condomino', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
