'use client';

import { useSession } from 'next-auth/react';
import { useEffect } from 'react';

const PrivatePage = () => {
  const { data: session, status } = useSession();

  useEffect(() => {
    console.log('Session:', session);
    console.log('Status:', status);
  }, [session, status]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    return <div>Access Denied</div>;
  }

  return (
    <div>
      <h1>Welcome {session.user?.name}</h1>
      <p>Email: {session.user?.email}</p>
    </div>
  );
};

export default PrivatePage;
