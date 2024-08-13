'use client';

import { useSession } from 'next-auth/react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto
import Link from 'next/link';
import { ReactNode, useState } from 'react';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
  VideoCameraIcon,
  CalendarIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

interface DashboardProps {
  children?: ReactNode;
}

const Dashboard: React.FC<DashboardProps> = ({ children }) => {
  const { data: session, status } = useSession();
  const [isCollapsed, setIsCollapsed] = useState(false);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return <div>Access Denied. Please <a href="/auth/signin">sign in</a>.</div>;
  }

  return (
    <div className="bg-gray-800 min-h-screen flex flex-col">
      <NavbarIn />
      <div className="flex flex-1 mt-14">
        {/* Sidebar */}
        <div className={`bg-[#1A202C] text-white p-4 transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'}`}>
          <div className="flex justify-between items-center mb-4">
            {!isCollapsed && <h2 className="text-2xl font-bold">Dashboard</h2>}
            <button onClick={() => setIsCollapsed(!isCollapsed)} className="text-white focus:outline-none">
              {isCollapsed ? <ChevronRightIcon className="h-6 w-6" /> : <ChevronLeftIcon className="h-6 w-6" />}
            </button>
          </div>
          <nav className="space-y-2">
            <Link href="/dashboard" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <HomeIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Home</span>}
            </Link>
            <Link href="/dashboard/progetti" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Progetti</span>}
            </Link>
            <Link href="/dashboard/attivita" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <DocumentIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Attività ed Interventi</span>}
            </Link>
            <Link href="/dashboard/argomenti" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Argomenti</span>}
            </Link>
            <Link href="/dashboard/documenti" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <DocumentArrowUpIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Documenti</span>}
            </Link>
            <Link href="/dashboard/sondaggi" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <VideoCameraIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Sondaggi e Proposte</span>}
            </Link>
            <Link href="/dashboard/calendario" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <CalendarIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Calendario</span>}
            </Link>
          </nav>
        </div>

        {/* Main content */}
        <div className="flex-1 p-8">
          {children ? (
            children
          ) : (
            <>
              <h1 className="text-4xl font-bold text-gray-400 mt-8">Home</h1>
              <p className="text-lg text-gray-600 mb-8">
                Seleziona una sezione dal menu a sinistra.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Link href="/dashboard/progetti" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Progetti</h2>
                  <p>Visualizza e gestisci i tuoi progetti.</p>
                  <p className="text-green-500 mt-2">+10% rispetto al mese scorso</p>
                </Link>
                <Link href="/dashboard/attivita" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Attività ed Interventi</h2>
                  <p>Monitora le attività recenti del tuo team.</p>
                  <p className="text-blue-500 mt-2">+5% rispetto al mese scorso</p>
                </Link>
                <Link href="/dashboard/argomenti" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Argomenti</h2>
                  <p>Partecipa alle discussioni del team.</p>
                  <p className="text-blue-500 mt-2">+3% rispetto al mese scorso</p>
                </Link>
                <Link href="/dashboard/documenti" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Documenti</h2>
                  <p>Carica e gestisci i tuoi documenti.</p>
                  <p className="text-green-500 mt-2">+15% rispetto al mese scorso</p>
                </Link>
                <Link href="/dashboard/sondaggi" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Sondaggi e Proposte</h2>
                  <p>Organizza e partecipa alle videoconferenze.</p>
                  <p className="text-yellow-500 mt-2">+8% rispetto al mese scorso</p>
                </Link>
                <Link href="/dashboard/calendario" className="block bg-[#2D3748] text-white p-6 rounded-lg shadow-md hover:bg-gray-700 transition duration-300">
                  <h2 className="text-2xl font-bold mb-4">Calendario</h2>
                  <p>Gestisci i tuoi appuntamenti e impegni.</p>
                  <p className="text-yellow-500 mt-2">+12% rispetto al mese scorso</p>
                </Link>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
