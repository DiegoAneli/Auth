'use client';

import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-lg">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-semibold text-gray-800">
          <Link href="/">
            TaskManager
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link href="#features" className="text-gray-600 hover:text-gray-800 transition duration-300">Features</Link>
          <Link href="#testimonials" className="text-gray-600 hover:text-gray-800 transition duration-300">Testimonials</Link>
          <Link href="#cta" className="text-gray-600 hover:text-gray-800 transition duration-300">Get Started</Link>
        </div>
        <div>
          <Link href="/auth/signin">
            <FaSignInAlt className="text-2xl text-gray-600 hover:text-gray-800 transition duration-300" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
