'use client';

import { useSession, signOut } from 'next-auth/react';
import { Session } from 'next-auth';

const PrivatePage = () => {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Welcome to the Private Page</h1>
      <p className="text-xl mb-4">Hello, {session.user?.email}</p>
      <button
        onClick={() => signOut()}
        className="bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded-lg"
      >
        Sign Out
      </button>
    </div>
  );
};

export default PrivatePage;
