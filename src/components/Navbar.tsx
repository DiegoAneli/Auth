'use client';

import { useState } from 'react';
import Link from 'next/link';
import { FaSignInAlt, FaUserPlus, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-10">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">
          <Link href="/">
            You4Task
          </Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-800 transition duration-300">Caratteristiche</Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-gray-800 transition duration-300">Testimonianze</Link>
          <Link href="#cta" className="text-gray-600 hover:text-gray-800 transition duration-300">Inizia Ora</Link>
        </div>
        <div className="hidden md:flex space-x-4">
          <Link href="/auth/signin">
            <FaUserPlus className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
          </Link>
          <Link href="/api/auth/signin?csrf=true">
            <FaSignInAlt className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
          </Link>
        </div>
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-600 hover:text-gray-800 transition duration-300">
            {isOpen ? <FaTimes className="text-2xl" /> : <FaBars className="text-2xl" />}
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <Link href="#features" className="block px-6 py-4 text-gray-600 hover:text-gray-800 transition duration-300" onClick={toggleMenu}>Caratteristiche</Link>
          <Link href="#testimonials" className="block px-6 py-4 text-gray-600 hover:text-gray-800 transition duration-300" onClick={toggleMenu}>Testimonianze</Link>
          <Link href="#cta" className="block px-6 py-4 text-gray-600 hover:text-gray-800 transition duration-300" onClick={toggleMenu}>Inizia Ora</Link>
          <Link href="/api/auth/signin?csrf=true" className="block px-6 py-4 text-gray-600 hover:text-gray-800 transition duration-300" onClick={toggleMenu}>
            <FaSignInAlt className="inline mr-2" /> Accedi
          </Link>
          <Link href="/auth/signin" className="block px-6 py-4 text-gray-600 hover:text-gray-800 transition duration-300" onClick={toggleMenu}>
            <FaUserPlus className="inline mr-2" /> Registrati
          </Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
