'use client';

import { useSession } from 'next-auth/react';
import NavbarIn from '@/components/NavbarIn'; // Assicurati che il percorso sia corretto
import Link from 'next/link';
import { ReactNode } from 'react';
import { 
  HomeIcon, 
  ClipboardDocumentListIcon, 
  DocumentTextIcon, 
  ChartPieIcon, 
  DocumentCheckIcon, 
  CurrencyDollarIcon, 
  CalendarIcon 
} from '@heroicons/react/24/outline';

interface ReportDashboardProps {
  children?: ReactNode;
}

const ReportDashboard: React.FC<ReportDashboardProps> = ({ children }) => {
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
          <h2 className="text-2xl font-bold mb-4">Report</h2>
          <nav className="space-y-2">
            <Link href="/report" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <HomeIcon className="h-5 w-5 text-white" />
                <span>Home</span>
              </a>
            </Link>
            <Link href="/report/analisiprogetti" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
                <span>Analisi Tempistiche Progetti</span>
              </a>
            </Link>
            <Link href="/report/reportattivita" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <DocumentTextIcon className="h-5 w-5 text-white" />
                <span>Report Attività</span>
              </a>
            </Link>
            <Link href="/report/reportcripto" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <ChartPieIcon className="h-5 w-5 text-white" />
                <span>Report Cripto</span>
              </a>
            </Link>
            <Link href="/report/validitadocumento" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <DocumentCheckIcon className="h-5 w-5 text-white" />
                <span>Validità Documento</span>
              </a>
            </Link>
            <Link href="/report/analisispese" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <CurrencyDollarIcon className="h-5 w-5 text-white" />
                <span>Analisi Spese</span>
              </a>
            </Link>
            <Link href="/report/reportcalendario" legacyBehavior>
              <a className="flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700">
                <CalendarIcon className="h-5 w-5 text-white" />
                <span>Report Calendario</span>
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
              <h1 className="text-4xl font-bold text-gray-400 mt-8">Report</h1>
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

export default ReportDashboard;
