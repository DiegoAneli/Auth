'use client';

import Link from 'next/link';
import Navbar from '../components/Navbar';

export default function Home() {
  return (
    <div className="min-h-screen">
      <Navbar />

      <div className="min-h-screen flex">
        {/* Left section */}
        <div className="flex-1 flex flex-col justify-center bg-white p-10">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">
            Making Gradients Great Again
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Hand crafting unique world most beautiful gradients for your personal as well as commercial projects.
            For a low cost of zero dollars and
          </p>
          <Link href="/auth/signin">
            <button className="bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-white py-3 px-6 rounded-full font-semibold hover:opacity-90 transition duration-300">
              Get Started
            </button>
          </Link>
        </div>
        {/* Right section */}
        <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
          <div className="text-white text-6xl font-bold">G</div>
        </div>
      </div>
    </div>
  );
}
