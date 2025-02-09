import Sidebar from '@/components/Sidebar';
import React from 'react';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex w-full">
      <Sidebar />

      <aside className="container max-h-screen w-full">{children}</aside>
    </div>
  );
}
