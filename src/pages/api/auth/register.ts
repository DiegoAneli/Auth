import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { MongoClient } from 'mongodb';
import nodemailer from 'nodemailer';
import clientPromise from '../../../lib/mongodb';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: false, // true for 465, false for other ports
});

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const client = await clientPromise;
  const db = client.db('your-database-name');
  const usersCollection = db.collection('users');

  const existingUser = await usersCollection.findOne({ email });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    email,
    password: hashedPassword,
    createdAt: new Date(),
  };

  await usersCollection.insertOne(newUser);

  // Invio email di benvenuto
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: email,
    subject: 'Benvenuto in You4Task',
    text: `Ciao ${name},\n\nGrazie per esserti registrato su You4Task! Siamo entusiasti di averti con noi.\n\nCordiali saluti,\nIl team di You4Task`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata:', info.response);
    }
  });

  res.status(201).json({ message: 'User registered successfully', user: newUser });
}
