'use client';

import React from 'react';
import Link from 'next/link';
import { HomeIcon, ClipboardDocumentListIcon, DocumentPlusIcon, DocumentIcon, ChatBubbleLeftRightIcon, DocumentArrowUpIcon, VideoCameraIcon, UserIcon, ArrowRightOnRectangleIcon, UserPlusIcon } from '@heroicons/react/24/outline';

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-[#352651] text-white h-screen p-4">
      <div className="flex items-center mb-8">
        <img src="/logo1.png" alt="Logo" className="h-12 w-18 ml-6" />
      </div>
      <ul className="space-y-4">
        <li>
          <Link href="/dashboard" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
            <HomeIcon className="h-5 w-5 text-white" />
            <span className="text-lg text-white">Dashboard</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/section1" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
            <ClipboardDocumentListIcon className="h-5 w-5 text-white" />
            <span className="text-lg text-white">Sezione 1</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/section2" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
            <DocumentPlusIcon className="h-5 w-5 text-white" />
            <span className="text-lg text-white">Sezione 2</span>
          </Link>
        </li>
        <li>
          <Link href="/dashboard/section3" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
            <DocumentIcon className="h-5 w-5 text-white" />
            <span className="text-lg text-white">Sezione 3</span>
          </Link>
        </li>
        {/* Aggiungi altre sezioni qui */}
      </ul>
      <div className="mt-8">
        <h2 className="text-gray-300 text-sm font-bold mb-4">ACCOUNT PAGES</h2>
        <ul className="space-y-4">
          <li>
            <Link href="/signin" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
              <ArrowRightOnRectangleIcon className="h-5 w-5 text-white" />
              <span className="text-lg text-white">Accedi</span>
            </Link>
          </li>
          <li>
            <Link href="/signup" className="flex items-center space-x-2 p-2 hover:bg-gray-600 rounded-lg">
              <UserPlusIcon className="h-5 w-5 text-white" />
              <span className="text-lg text-white">Registrati</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar;
