/*import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import clientPromise from '../../../lib/mongodb';
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

export default async function register(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const client = await clientPromise;
  const db = client.db('Users_form_registration');
  const usersCollection = db.collection('users');

  // Ensure the email is lowercase to avoid case sensitivity issues
  const lowercasedEmail = email.toLowerCase();
  const existingUser = await usersCollection.findOne({ email: lowercasedEmail });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    email: lowercasedEmail,
    password: hashedPassword,
    createdAt: new Date(),
    isVerified: false,
  };

  const result = await usersCollection.insertOne(newUser);
  console.log('User registered:', result);

  const token = jwt.sign({ email: lowercasedEmail }, process.env.JWT_SECRET!, { expiresIn: '1h' });
  const verificationLink = `http://localhost:3000/api/auth/verify?token=${token}`;

  // Invio email di benvenuto
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: lowercasedEmail,
    subject: 'Benvenuto in You4Task',
    text: `Ciao ${name},\n\nGrazie per esserti registrato su You4Task! Per favore, verifica il tuo indirizzo email cliccando sul link seguente:\n\n${verificationLink}\n\nCordiali saluti,\nIl team di You4Task`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata:', info.response);
    }
  });

  res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.', user: newUser });
}*/


import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import nodemailer from 'nodemailer';
import clientPromise from '../../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_SERVER_HOST,
  port: Number(process.env.EMAIL_SERVER_PORT),
  auth: {
    user: process.env.EMAIL_SERVER_USER,
    pass: process.env.EMAIL_SERVER_PASSWORD,
  },
  secure: false, // true for 465, false for other ports
});

export default async function register

  (req: 
    { method: string; 
      body: { 
        name: any; 
        email: any; 
        password: any; 
        token: any; };
     }, res: 
        { status: (arg0: number) => { (): any; new(): any; json: { (arg0: { message: string; user?: { name: any; email: any; password: string; createdAt: Date; isVerified: boolean; projects: never[]; }; }): void; new(): any; }; }; }) {
          
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { name, email, password, token } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  const client = await clientPromise;
  const db = client.db('Users_form_registration');
  const usersCollection = db.collection('users');

  const lowercasedEmail = email.toLowerCase();
  const existingUser = await usersCollection.findOne({ email: lowercasedEmail });

  if (existingUser) {
    return res.status(400).json({ message: 'User already exists' });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const newUser = {
    name,
    email: lowercasedEmail,
    password: hashedPassword,
    createdAt: new Date(),
    isVerified: false,
    projects: [],
  };

  const result = await usersCollection.insertOne(newUser);
  console.log('User registered:', result);

  // Verifica il token di invito
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const { projectId, role } = decoded;

      await db.collection('users').updateOne(
        { 'projects._id': new ObjectId(projectId) },
        { $addToSet: { 'projects.$.collaborators': { email: lowercasedEmail, role } } }
      );
    } catch (error) {
      console.error('Errore nella decodifica del token di invito:', error);
    }
  }

  const verificationToken = jwt.sign({ email: lowercasedEmail }, process.env.JWT_SECRET, { expiresIn: '1h' });
  const verificationLink = `http://localhost:3000/api/auth/verify?token=${verificationToken}`;

  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: lowercasedEmail,
    subject: 'Benvenuto in You4Task',
    text: `Ciao ${name},\n\nGrazie per esserti registrato su You4Task! Per favore, verifica il tuo indirizzo email cliccando sul link seguente:\n\n${verificationLink}\n\nCordiali saluti,\nIl team di You4Task`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Errore nell\'invio dell\'email:', error);
    } else {
      console.log('Email inviata:', info.response);
    }
  });

  res.status(201).json({ message: 'User registered successfully. Please check your email to verify your account.', user: newUser });
}

