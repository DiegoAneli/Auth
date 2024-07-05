'use client';

import { useSession } from 'next-auth/react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto
import Link from 'next/link';
import { ReactNode } from 'react';

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied. Please <a href="/auth/signin">sign in</a>.</div>;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavbarIn />
      <div className="flex flex-1">
        {/* Sidebar */}
        <div className="w-64 bg-gray-800 text-white p-4">
          <h2 className="text-2xl font-bold mb-4">Dashboard</h2>
          <nav className="space-y-2">
            <Link href="/dashboard" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Home</a>
            </Link>
            <Link href="/dashboard/progetti" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Progetti</a>
            </Link>
            <Link href="/dashboard/attivita" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Attività Recenti</a>
            </Link>
            <Link href="/dashboard/chat" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Chat</a>
            </Link>
            <Link href="/dashboard/caricadocumento" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Carica Documento</a>
            </Link>
            <Link href="/dashboard/videoconferenza" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Videoconferenza</a>
            </Link>
            <Link href="/dashboard/calendario" legacyBehavior>
              <a className="block px-4 py-2 rounded hover:bg-gray-700">Calendario</a>
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children ? (
            children
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-400 mt-8 ">Dashboard</h1>
              <p className="text-lg text-gray-600 mb-8">
              Seleziona una sezione dal menu a sinistra.
              </p>
              <p></p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
