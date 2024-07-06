import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (req.method === 'GET') {
    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');
      const user = await db.collection('users').findOne(
        { 'projects._id': new ObjectId(id) },
        { projection: { 'projects.$': 1 } }
      );

      if (!user || !user.projects || user.projects.length === 0) {
        return res.status(404).json({ message: 'Progetto non trovato' });
      }

      return res.status(200).json(user.projects[0]);
    } catch (error) {
      return res.status(500).json({ message: 'Errore del server', error });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Metodo ${req.method} non consentito`);
  }
}
