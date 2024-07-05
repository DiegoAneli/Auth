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
              {!isCollapsed && <span>Attività Recenti</span>}
            </Link>
            <Link href="/dashboard/chat" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <ChatBubbleLeftRightIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Chat</span>}
            </Link>
            <Link href="/dashboard/caricadocumento" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <DocumentArrowUpIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Carica Documento</span>}
            </Link>
            <Link href="/dashboard/videoconferenza" className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
              <VideoCameraIcon className="h-5 w-5 text-white" />
              {!isCollapsed && <span>Videoconferenza</span>}
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
              <h1 className="text-4xl font-bold text-gray-400 mt-8 ">Home</h1>
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
