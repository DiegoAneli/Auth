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
            La tua email: {session.user?.email}
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
          <div className="text-white text-6xl font-bold"></div>
        </div>
      </div>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-200">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-400">Caratteristiche Principali</h2>
          <div className="flex flex-wrap">
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Interfaccia User-Friendly</h3>
                <p>Naviga facilmente tra i tuoi task con un design semplice e intuitivo.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Collaborazione in Tempo Reale</h3>
                <p>Lavora insieme al tuo team ovunque tu sia, con aggiornamenti in tempo reale.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Reportistica Avanzata</h3>
                <p>Monitora l'avanzamento dei tuoi progetti con report dettagliati e personalizzabili.</p>
              </div>
            </div>
            <div className="w-full md:w-1/3 px-4 py-6">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h3 className="text-2xl font-bold mb-4 text-gray-400">Integrazioni Versatili</h3>
                <p>Connetti TaskManager con le tue app preferite per una gestione centralizzata dei tuoi progetti.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section id="cta" className="py-20 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white text-center">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-4">Continua a Gestire i Tuoi Task in Modo Efficace!</h2>
          <p className="text-xl mb-8">Rimani sempre aggiornato e collabora con il tuo team.</p>
          <Link href="/api/auth/signout">
            <button className="bg-white text-blue-600 py-3 px-6 rounded-full font-semibold hover:bg-gray-200 transition duration-300">
              Esci
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default PrivatePage;
