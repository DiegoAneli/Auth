import { NextApiRequest, NextApiResponse } from 'next';
import jwt from 'jsonwebtoken';
import clientPromise from '../../../lib/mongodb';

export default async function verify(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Missing token' });
  }

  try {
    const decoded: any = jwt.verify(token as string, process.env.JWT_SECRET!);

    const client = await clientPromise;
    const db = client.db('Users_form_registration');
    const usersCollection = db.collection('users');

    const result = await usersCollection.updateOne(
      { email: decoded.email },
      { $set: { isVerified: true } } // Imposta isVerified su true
    );

    if (result.modifiedCount === 1) {
      res.redirect('/auth/signin?verified=true'); // Reindirizza alla pagina di accesso con un parametro di query
    } else {
      res.status(400).json({ message: 'Verification failed' });
    }
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}
