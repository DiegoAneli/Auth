'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import NavbarIn from '@/components/NavbarIn';

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
    <div className="min-h-screen flex flex-col items-center bg-[#1a202c]">
      <NavbarIn />
      <div className="flex items-center justify-center flex-1 w-full mt-16 max-w-4xl">
        <div className="w-full bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Benvenuto {session.user?.name} !
          </h1>
          <p className="text-lg text-gray-600 mb-8 text-center">
            Ti sei registrato con l'email: <strong>{session.user?.email}</strong>
          </p>
          <p className="text-md text-gray-600 mb-8 text-center">
            Questa è la tua sezione privata dove puoi gestire i tuoi task in modo semplice e intuitivo.
          </p>
          <div className="flex space-x-4 justify-center">
            <Link href="/api/auth/signout">
              <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
                Esci
              </button>
            </Link>
            <Link href="/dashboard">
              <button className="bg-gradient-to-r from-blue-400 via-green-500 to-teal-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
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
