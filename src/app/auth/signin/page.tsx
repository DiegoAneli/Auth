'use client';

import { useState } from 'react';
import { signIn } from "next-auth/react";
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';

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
    <div className="min-h-screen flex flex-col md:flex-row">
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Accedi</h1>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center mb-6 transition duration-300"
        >
          <FaGoogle className="mr-2" /> Accedi con Google
        </button>
        <div className="text-center text-gray-500 mb-6">o</div>
        {error && <p className="text-red-500 mb-6">{error}</p>}
        <form onSubmit={handleSubmit} className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={form.password}
              onChange={(e) => setForm({ ...form, password: e.target.value })}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
          >
            Accedi
          </button>
        </form>
      </div>
      <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        {/* Placeholder for background image or gradient */}
      </div>
    </div>
  );
};

export default SignIn;
