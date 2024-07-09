import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Token is required' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret not defined' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const { email, projectId, role } = decoded;

    const client = await clientPromise;
    const db = client.db('Users_form_registration');

    const user = await db.collection('users').findOne({ email });

    if (user) {
      const result = await db.collection('users').updateOne(
        { email },
        { $addToSet: { projects: { _id: new ObjectId(projectId), role } } }
      );

      if (result.modifiedCount === 0) {
        return res.status(400).json({ message: 'Failed to add project' });
      }

      res.redirect('/dashboard');
    } else {
      res.redirect(`/auth/register?token=${token}`);
    }
  } catch (error) {
    return res.status(500).json({ message: 'Invalid or expired token', error });
  }
}
