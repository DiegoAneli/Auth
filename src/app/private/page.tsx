'use client';

import { useSession, getSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Private() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Do nothing while loading
    if (!session) router.push("/auth/signin"); // Redirect if not authenticated
  }, [session, status, router]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (!session) {
    return null; // Render nothing if not authenticated
  }

  return (
    <div>
      <h1>Welcome {session.user.email}</h1>
      <p>This is a private page.</p>
    </div>
  );
}
