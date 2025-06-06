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
      return res.status(400).json({ message: 'Document ID is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');

      // Modifica per eliminare dalla collezione "documents"
      const result = await db.collection('documents').deleteOne({ _id: new ObjectId(id) });

      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Document not found or failed to delete' });
      }

      return res.status(200).json({ message: 'Document deleted successfully' });
    } catch (error) {
      console.error('Errore durante l\'eliminazione del documento:', error);
      return res.status(500).json({ message: 'Failed to delete document', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
