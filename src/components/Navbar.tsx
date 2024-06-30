'use client';

import Link from 'next/link';
import { FaSignInAlt } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className="bg-blue-600 text-white">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-bold">
          <Link href="/">
            TaskManager
          </Link>
        </div>
        <div className="flex space-x-6">
          <Link href="#features">
            Features
          </Link>
          <Link href="#testimonials">
            Testimonials
          </Link>
          <Link href="#cta">
            Get Started
          </Link>
        </div>
        <div>
          <Link href="/auth/signin">
            <FaSignInAlt className="text-2xl" />
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
