/*'use client';

import { useState } from 'react';
import NavbarUt from '@/components/NavbarUt'; // Assicurati che il percorso sia corretto

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      // Mostra un messaggio di successo o reindirizza l'utente
      setSuccess('Utente registrato con successo. Controlla la tua email per verificare il tuo account.');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1a202c]">
      <NavbarUt />
      <div className="flex items-center justify-center flex-1 w-full mt-16 max-w-md">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Registrazione Utente</h1>
          
          <div className="text-center text-gray-500 mb-6"></div>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {success && <p className="text-green-500 mb-6">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Registrati
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}*/



/*'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import NavbarUt from '@/components/NavbarUt'; // Assicurati che il percorso sia corretto

export default function Register() {
  const router = useRouter();
  const { token } = router.query;
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        setForm({ ...form, email: decoded.email });
      } catch (error) {
        setError('Invalid or expired token');
      }
    }
  }, [token]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form, token }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('Utente registrato con successo. Controlla la tua email per verificare il tuo account.');
      router.push('/dashboard');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1a202c]">
      <NavbarUt />
      <div className="flex items-center justify-center flex-1 w-full mt-16 max-w-md">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Registrazione Utente</h1>
          
          <div className="text-center text-gray-500 mb-6"></div>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {success && <p className="text-green-500 mb-6">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                readOnly={!!token}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Registrati
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}*/


'use client';

import { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import NavbarUt from '@/components/NavbarUt'; // Assicurati che il percorso sia corretto
import jwt, { JwtPayload } from 'jsonwebtoken';

export default function Register() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams ? searchParams.get('token') : null;
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (token) {
      try {
        const secret = process.env.NEXT_PUBLIC_JWT_SECRET;
        if (!secret) {
          throw new Error('JWT secret is not defined');
        }
        const decoded = jwt.verify(token, secret) as JwtPayload; // Type assertion
        if (decoded.email) {
          setForm((prevForm) => ({ ...prevForm, email: decoded.email }));
        } else {
          setError('Token non valido o scaduto');
        }
      } catch (error) {
        setError('Token non valido o scaduto');
      }
    }
  }, [token]);

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    const res = await fetch('/api/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ...form, token }),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('Utente registrato con successo. Controlla la tua email per verificare il tuo account.');
      router.push('/auth/signin');
    } else {
      setError(data.message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-[#1a202c]">
      <NavbarUt />
      <div className="flex items-center justify-center flex-1 w-full mt-16 max-w-md">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Registrazione Utente</h1>
          
          <div className="text-center text-gray-500 mb-6"></div>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {success && <p className="text-green-500 mb-6">{success}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-gray-700 mb-2">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                readOnly={!!token}
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Registrati
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
