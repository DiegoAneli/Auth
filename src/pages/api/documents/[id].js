import { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid document ID' });
  }

  const client = await clientPromise;
  const db = client.db('Users_form_registration');

  try {
    const document = await db.collection('users').findOne(
      { "documents._id": new ObjectId(id) },
      { projection: { "documents.$": 1 } }
    );

    if (!document || !document.documents || document.documents.length === 0) {
      return res.status(404).json({ message: 'Document not found' });
    }

    const fileData = document.documents[0].fileData.buffer;
    const fileName = document.documents[0].name;

    res.setHeader('Content-Disposition', `attachment; filename=${fileName}`);
    res.setHeader('Content-Type', 'application/octet-stream');
    return res.status(200).send(fileData);
  } catch (error) {
    return res.status(500).json({ message: 'Failed to retrieve document', error });
  }
}
