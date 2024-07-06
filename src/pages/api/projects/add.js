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
    const { projectName, description, startDate, endDate, image, collaborator } = req.body;

    if (!projectName) {
      return res.status(400).json({ message: 'Project name is required' });
    }

    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    const newProject = {
      _id: new ObjectId(),
      name: projectName,
      description: description || '',
      startDate: startDate || '',
      endDate: endDate || '',
      image: image || '',
      collaborator: collaborator || '',
      createdAt: new Date(),
    };

    try {
      const result = await db.collection('users').updateOne(
        { email: session.user.email },
        { $push: { projects: newProject } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'Failed to add project' });
      }

      return res.status(201).json(newProject);
    } catch (error) {
      return res.status(500).json({ message: 'Database update failed', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
