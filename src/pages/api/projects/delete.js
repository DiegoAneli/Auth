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
    const { projectId } = req.body;

    if (!projectId) {
      return res.status(400).json({ message: 'Project ID is required' });
    }

    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    try {
      const result = await db.collection('users').updateOne(
        { email: session.user.email },
        { $pull: { projects: { _id: new ObjectId(projectId) } } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'Failed to delete project' });
      }

      return res.status(200).json({ message: 'Project deleted successfully' });
    } catch (error) {
      return res.status(500).json({ message: 'Database update failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
