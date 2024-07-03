'use client';

import { useSession } from 'next-auth/react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto

export default function Report() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied. Please <a href="/auth/signin">sign in</a>.</div>;
  }

  return (
    <div>
      <NavbarIn />
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">Pagina dei Report</h1>
          <p className="text-lg text-gray-600 mb-8">
            Benvenuto, {session?.user?.name}!
          </p>
          <div className="w-full max-w-2xl">
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Report 1</h2>
              <p className="text-gray-600 mb-4">
                Questa è una breve descrizione del primo report disponibile.
              </p>
              <button
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
              >
                Visualizza Report 1
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Report 2</h2>
              <p className="text-gray-600 mb-4">
                Questa è una breve descrizione del secondo report disponibile.
              </p>
              <button
                className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded-lg transition duration-300"
              >
                Visualizza Report 2
              </button>
            </div>
            <div className="mb-4">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Report 3</h2>
              <p className="text-gray-600 mb-4">
                Questa è una breve descrizione del terzo report disponibile.
              </p>
              <button
                className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg transition duration-300"
              >
                Visualizza Report 3
              </button>
            </div>
          </div>
        </div>
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          {/* Placeholder for background image or gradient */}
        </div>
      </div>
    </div>
  );
}
