'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes, FaSignOutAlt, FaUser } from 'react-icons/fa';
import { useSession } from 'next-auth/react';

const NavbarIn = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#1A202C] fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <div className="text-2xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 mr-4">
            <Link href="/">
              You4Condo
            </Link>
          </div>
          {session && (
            <div className="text-gray-200">
              Benvenuto, {session.user?.name}
            </div>
          )}
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="/dashboard" className="text-gray-200 hover:text-gray-400 transition duration-300">Dashboard</Link>
          <Link href="/report" className="text-gray-200 hover:text-gray-400 transition duration-300">Report</Link>
          <Link href="/invite" className="text-gray-200 hover:text-gray-400 transition duration-300">Invita Collaboratore</Link>
        </div>
        <div className="hidden md:flex space-x-4 items-center">
          <Link href="/api/auth/signout">
            <FaSignOutAlt className="text-2xl text-gray-200 hover:text-gray-400 transition duration-300" />
          </Link>
          <Link href="/user/edit">
            <FaUser className="text-2xl text-gray-200 hover:text-gray-400 transition duration-300" />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-200 hover:text-gray-400 transition duration-300">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-[#1A202C] shadow-lg">
          <Link href="/dashboard" className="block px-6 py-4 text-gray-200 hover:text-gray-400 transition duration-300" onClick={toggleMenu}>Dashboard</Link>
          <Link href="/report" className="block px-6 py-4 text-gray-200 hover:text-gray-400 transition duration-300" onClick={toggleMenu}>Report</Link>
          <Link href="/invite" className="block px-6 py-4 text-gray-200 hover:text-gray-400 transition duration-300" onClick={toggleMenu}>
            <FaUserPlus className="inline mr-2" /> Invita Collaboratore
          </Link>
          <Link href="/user/edit" className="block px-6 py-4 text-gray-200 hover:text-gray-400 transition duration-300" onClick={toggleMenu}>
            <FaUser className="inline mr-2" /> Modifica Utente
          </Link>
          <Link href="/api/auth/signout" className="block px-6 py-4 text-gray-200 hover:text-gray-400 transition duration-300" onClick={toggleMenu}>
            <FaSignOutAlt className="inline mr-2" /> Esci
          </Link>
        </div>
      )}
    </nav>
  );
};

export default NavbarIn;
