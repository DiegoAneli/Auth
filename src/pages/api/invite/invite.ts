import { unstable_getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]';
import clientPromise from '../../../lib/mongodb';
import nodemailer from 'nodemailer';
import { ObjectId } from 'mongodb';
import jwt from 'jsonwebtoken';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: false, // true for 465, false for other ports
});

export default async function handler(req, res) {
  const session = await unstable_getServerSession(req, res, authOptions);

  if (!session || !session.user || !session.user.email) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { email, role, projectId } = req.body;

  if (!email || !role || !projectId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT secret not defined' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('Users_form_registration');
    const project = await db.collection('users').findOne(
      { 'projects._id': new ObjectId(projectId) },
      { projection: { 'projects.$': 1 } }
    );

    if (!project || !project.projects || project.projects.length === 0) {
      return res.status(404).json({ message: 'Project not found' });
    }

    // Genera il token di invito
    const token = jwt.sign({ email, projectId, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    const invitationLink = `http://localhost:3000/api/invite/accept?token=${token}`;

    // Configura l'email di invito
    const mailOptions = {
      from: process.env.EMAIL_FROM,
      to: email,
      subject: 'Invito a collaborare su un progetto di You4Task',
      text: `Ciao,\n\nSei stato invitato a collaborare su un progetto in You4Task. Per accettare l'invito, clicca sul link seguente:\n\n${invitationLink}\n\nCordiali saluti,\nIl team di You4Task`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Errore nell\'invio dell\'email:', error);
        return res.status(500).json({ message: 'Errore nell\'invio dell\'email' });
      } else {
        console.log('Email inviata:', info.response);
        return res.status(200).json({ message: 'Invitation sent successfully' });
      }
    });

  } catch (error) {
    return res.status(500).json({ message: 'Server error', error });
  }
}
