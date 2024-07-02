import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function verify(req: NextApiRequest, res: NextApiResponse) {
  const { token } = req.query;

  if (!token) {
    return res.status(400).json({ message: 'Token is missing' });
  }

  try {
    const decoded = jwt.verify(token as string, process.env.JWT_SECRET!);
    const client = await clientPromise;
    const db = client.db('Users_form_registration');
    const usersCollection = db.collection('users');

    const email = (decoded as any).email;
    const user = await usersCollection.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Invalid token' });
    }

    await usersCollection.updateOne({ email }, { $set: { isVerified: true } });

    // Redirige l'utente alla pagina di login
    res.writeHead(302, { Location: '/auth/signin' });
    res.end();
  } catch (error) {
    console.error('Verification error:', error);
    res.status(400).json({ message: 'Invalid or expired token' });
  }
}
