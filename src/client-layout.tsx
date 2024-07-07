'use client';

import { SessionProvider } from 'next-auth/react';
import RemoveCZShortcutListen from './RemoveCZShortcutListen'; // Assicurati che il percorso sia corretto

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <RemoveCZShortcutListen />
      {children}
    </SessionProvider>
  );
}