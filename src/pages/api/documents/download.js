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

  if (req.method === 'GET') {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({ message: 'Document ID is required' });
    }

    try {
      const client = await clientPromise;
      const db = client.db('Users_form_registration');

      const user = await db.collection('users').findOne(
        { email: session.user.email, 'documents._id': new ObjectId(id) },
        { projection: { 'documents.$': 1 } }
      );

      if (!user || !user.documents || user.documents.length === 0) {
        return res.status(404).json({ message: 'Document not found' });
      }

      const document = user.documents[0];
      const buffer = Buffer.from(document.fileData); // assuming fileData is stored as base64 string

      res.setHeader('Content-Disposition', `attachment; filename="${document.originalFilename}"`);
      res.setHeader('Content-Type', document.mimeType || 'application/octet-stream');
      res.status(200).send(buffer);
    } catch (error) {
      return res.status(500).json({ message: 'Failed to download document', error });
    }
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};