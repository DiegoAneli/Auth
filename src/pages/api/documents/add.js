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

  if (req.method === 'POST') {
    const { documentName } = req.body;

    if (!documentName) {
      return res.status(400).json({ message: 'Document name is required' });
    }

    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    const newDocument = {
      _id: new ObjectId(),
      name: documentName,
      createdAt: new Date(),
    };

    try {
      const result = await db.collection('users').updateOne(
        { email: session.user.email },
        { $push: { documents: newDocument } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'Failed to add document' });
      }

      return res.status(201).json(newDocument);
    } catch (error) {
      return res.status(500).json({ message: 'Database update failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
