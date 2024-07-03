'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import NavbarIn from '../../components/NavbarIn';

interface FormState {
  name: string;
}

const UserEditPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [form, setForm] = useState<FormState>({ name: '' });
  const [error, setError] = useState<string>('');
  const [success, setSuccess] = useState<string>('');

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    } else if (session) {
      setForm({
        name: session.user?.name || '',
      });
    }
  }, [session, status, router]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const res = await fetch('/api/user/update', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(form),
    });

    const data = await res.json();

    if (res.ok) {
      setSuccess('User updated successfully.');
    } else {
      setError(data.message);
    }
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen">
      <NavbarIn />
      <div className="min-h-screen flex flex-col items-center justify-center bg-white p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Modifica Profilo Utente</h1>
        
        {error && <p className="text-red-500 mb-6">{error}</p>}
        {success && <p className="text-green-500 mb-6">{success}</p>}
        <form onSubmit={handleSubmit} className="w-full max-w-md">
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 mb-2">Nome Completo</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
          >
            Salva Modifiche
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserEditPage;
