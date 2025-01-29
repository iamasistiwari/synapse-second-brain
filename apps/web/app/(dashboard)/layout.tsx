import { ThemeToggle } from '@/components/theme-toggle';
import Sidebar from '@/components/Sidebar';
import React from 'react';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen w-full">
      {/* leave this just temporay */}
      <div className="absolute left-52">
        <ThemeToggle />
      </div>

      {/* sidebar */}
      <Sidebar />

      {/* children */}
      <aside className="container max-h-screen w-full px-10 py-8">
        {children}
      </aside>
    </div>
  );
}
