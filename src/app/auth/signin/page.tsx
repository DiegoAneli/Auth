'use client';

import { signIn } from "next-auth/react";
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
  return (
    <div className="min-h-screen flex">
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-10">
        <h1 className="text-4xl font-bold text-gray-800 mb-6">Sign In</h1>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg flex items-center justify-center mb-6 transition duration-300"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <div className="text-center text-gray-500 mb-6">or</div>
        <form method="post" action="/api/auth/signin/email" className="w-full">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg transition duration-300"
          >
            Sign in with Email
          </button>
        </form>
      </div>
      <div className="flex-1 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
        {/* Placeholder for background image or gradient */}
      </div>
    </div>
  );
}
