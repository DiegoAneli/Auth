'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaGoogle, FaGithub } from 'react-icons/fa';
import NavbarUt from '@/components/NavbarUt'; // Assicurati che il percorso sia corretto
import Link from 'next/link';

const SignIn = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    console.log('Submitting login form', form);

    const result = await signIn('credentials', {
      redirect: false,
      email: form.email,
      password: form.password,
      callbackUrl: '/private'
    });

    console.log('SignIn result:', result);

    if (result?.error) {
      console.error('SignIn error:', result.error);
      setError(result.error);
    } else {
      console.log('SignIn successful, redirecting...');
      router.push(result?.url || '/private');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#1a202c]">
      <NavbarUt />
      <div className="flex items-center justify-center flex-1 w-full max-w-md">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-4 text-center">Accedi</h1>
          
          <div className="flex justify-center space-x-4 mb-4">
            <button
              onClick={() => signIn('google')}
              className="w-1/2 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
            >
              <FaGoogle className="mr-2" /> Google
            </button>
            <button
              onClick={() => signIn('github')}
              className="w-1/2 bg-gray-800 hover:bg-gray-900 text-white py-2 px-4 rounded-lg flex items-center justify-center transition duration-300"
            >
              <FaGithub className="mr-2" /> GitHub
            </button>
          </div>

          <p className="text-center text-gray-600 mb-4">Oppure accedi con le credenziali</p>
          
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-gray-700 mb-2">E-mail</label>
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
              <label htmlFor="password" className="block text-gray-700 mb-2">Parola d'ordine</label>
              <input
                type="password"
                id="password"
                name="password"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              />
            </div>
            <div className="flex items-center">
              <input
                type="checkbox"
                id="remember"
                className="mr-2"
              />
              <label htmlFor="remember" className="text-gray-700">Ricordati di me</label>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition duration-300"
            >
              Registrazione
            </button>
          </form>
          <div className="flex justify-between items-center mt-4">
            <Link href="/forgot-password" className="text-sm text-gray-600 hover:underline">Ha dimenticato la password?</Link>
            <Link href="/auth/register" className="text-sm text-gray-600 hover:underline">Crea un nuovo account</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
