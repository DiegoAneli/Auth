'use client';

import { signIn } from "next-auth/react";
import { FaGoogle } from 'react-icons/fa';

export default function SignIn() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
        <button
          onClick={() => signIn('google')}
          className="w-full bg-red-600 text-white py-2 px-4 rounded-lg flex items-center justify-center mb-4"
        >
          <FaGoogle className="mr-2" /> Sign in with Google
        </button>
        <div className="text-center mb-4">or</div>
        <form method="post" action="/api/auth/signin/email">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg"
          >
            Sign in with Email
          </button>
        </form>
      </div>
    </div>
  );
}
