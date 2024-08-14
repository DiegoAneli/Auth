import { NextApiRequest, NextApiResponse } from 'next';
import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';
import formidable from 'formidable';
import fs from 'fs';
import path from 'path';

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
    const form = formidable({ multiples: false });

    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error('Errore durante il parsing del form:', err);
        return res.status(500).json({ message: 'Errore nel caricamento del file' });
      }

      const { documentName } = fields;
      const file = files.file[0]; // Prendi il primo file dall'array

      console.log('fields:', fields);
      console.log('files:', files);

      // Controlla se il file esiste e se ha un percorso valido
      if (!documentName || !file || !file.filepath) {
        console.error('Nome del documento o file non valido.');
        return res.status(400).json({ message: 'Document name and valid file are required' });
      }

      try {
        const client = await clientPromise;
        const db = client.db('Users_form_registration');

        const extension = path.extname(file.originalFilename);
        const fileData = fs.readFileSync(file.filepath);

        const newDocument = {
          _id: new ObjectId(),
          name: documentName[0], // Assicurati che sia il nome corretto
          originalFilename: file.originalFilename,
          extension: extension,
          fileData: fileData,
          createdAt: new Date(),
          uploadedBy: session.user.email, // Opzionale: Traccia chi ha caricato il file
        };

        const result = await db.collection('documents').insertOne(newDocument);

        if (!result.acknowledged) {
          console.error('Errore durante l\'inserimento nel database.');
          return res.status(400).json({ message: 'Failed to add document' });
        }

        return res.status(201).json(newDocument);
      } catch (error) {
        console.error('Errore durante l\'inserimento nel database:', error);
        return res.status(500).json({ message: 'Database insertion failed', error });
      }
    });
  } else {
    return res.status(405).json({ message: 'Method not allowed' });
  }
};
