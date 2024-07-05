'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import NavbarIn from '../components/NavbarIn';

const PrivatePage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log('Session:', session);
    console.log('Status:', status);
    if (status === 'unauthenticated') {
      router.push('/auth/signin');
    }
  }, [session, status, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen">
      <NavbarIn />
      
      <div className="min-h-screen flex flex-col md:flex-row">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center bg-white p-10">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Benvenuto {session.user?.name} !
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Ti sei registrato con l'email: <strong>{session.user?.email}</strong>
          </p>
          <p className="text-md text-gray-600 mb-8">
            Questa è la tua pagina privata dove puoi gestire i tuoi task in modo semplice e intuitivo.
          </p>
          <div className="flex space-x-4">
            <Link href="/api/auth/signout">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Esci
              </button>
            </Link>
          </div>
        </div>
        
        {/* Right section */}
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="text-white text-center px-6 py-20">
            <h2 className="text-3xl font-bold mb-4">Continua a Gestire i Tuoi Task in Modo Efficace!</h2>
            <p className="text-xl mb-8">Rimani sempre aggiornato e collabora con il tuo team.</p>
            <Link href="/dashboard">
              <button className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
                Vai alla dashboard
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivatePage;
