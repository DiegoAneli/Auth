'use client';

import Link from 'next/link';
import { FaSignInAlt, FaUserPlus } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">
          <Link href="/">
            You4Task
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-800 transition duration-300">Caratteristiche</Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-gray-800 transition duration-300">Testimonianze</Link>
          <Link href="#cta" className="text-gray-600 hover:text-gray-800 transition duration-300">Inizia Ora</Link>
        </div>
        <div className="flex space-x-4">
          <Link href="/auth/signin">
            <FaUserPlus className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
          </Link>
          <Link href="/api/auth/signin?csrf=true">
            <FaSignInAlt className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
