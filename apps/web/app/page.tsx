import React from 'react';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { ThemeToggle } from '@/components/theme-toggle';


export default async function page() {
  const session = await getServerSession(authOptions);

  return (
    <div className="h-screen w-screen">
      <ThemeToggle />
      {JSON.stringify(session)}
    </div>
  );
}
