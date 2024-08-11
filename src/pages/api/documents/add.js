import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';

// Disabilita il body parser di Next.js
export const config = {
  api: {
    bodyParser: false,
  },
};

export default async (req, res) => {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method === 'POST') {
    const form = formidable({ multiples: true }); // Utilizza questa forma

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Errore nel caricamento del file' });
      }

      const { documentName } = fields;
      const file = files.file[0]; // Se utilizzi `multiples: true`, `files.file` sarà un array

      if (!documentName || !file) {
        return res.status(400).json({ message: 'Document name and file are required' });
      }

      const client = await clientPromise;
      const db = client.db('Users_form_registration');

      const fileData = fs.readFileSync(file.filepath);

      const newDocument = {
        _id: new ObjectId(),
        name: documentName,
        fileData: fileData, // Salva il file come Buffer
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
    });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
