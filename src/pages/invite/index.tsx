'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { FaGoogle } from 'react-icons/fa';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto

export default function SignIn() {
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
      setSuccess('User registered successfully. Please check your email to verify your account.');
    } else {
      setError(data.message);
    }
  };

  return (
    <div>
      <NavbarIn />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center bg-gray-800 p-10">
          <h1 className="text-4xl font-bold text-gray-200 mb-6">Invita Utente</h1>
          
          <div className="text-center text-gray-500 mb-6"></div>
          {error && <p className="text-red-500 mb-6">{error}</p>}
          {success && <p className="text-green-500 mb-6">{success}</p>}
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-200 mb-2 text-black">Nome Completo</label>
              <input
                type="text"
                id="name"
                name="name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-200 mb-2">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
            >
              Invita
            </button>
          </form>
        </div>
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          {/* Placeholder for background image or gradient */}
        </div>
      </div>
    </div>
  );
}
