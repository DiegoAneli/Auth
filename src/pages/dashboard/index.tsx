'use client';

import { useSession } from 'next-auth/react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto
import Link from 'next/link';
import { ReactNode } from 'react';
import {
  HomeIcon,
  ClipboardDocumentListIcon,
  DocumentPlusIcon,
  DocumentIcon,
  ChatBubbleLeftRightIcon,
  DocumentArrowUpIcon,
  VideoCameraIcon,
  CalendarIcon
} from '@heroicons/react/24/outline';

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
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <HomeIcon className="h-5 w-5 text-white" />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/dashboard/progetti" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
                <span>Progetti</span>
              </a>
            </Link>
            <Link href="/dashboard/attivita" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <DocumentIcon className="h-5 w-5 text-white" />
                <span>Attività Recenti</span>
              </a>
            </Link>
            <Link href="/dashboard/chat" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
                <span>Chat</span>
              </a>
            </Link>
            <Link href="/dashboard/caricadocumento" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <DocumentArrowUpIcon className="h-5 w-5 text-white" />
                <span>Carica Documento</span>
              </a>
            </Link>
            <Link href="/dashboard/videoconferenza" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <VideoCameraIcon className="h-5 w-5 text-white" />
                <span>Videoconferenza</span>
              </a>
            </Link>
            <Link href="/dashboard/calendario" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <CalendarIcon className="h-5 w-5 text-white" />
                <span>Calendario</span>
              </a>
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
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
