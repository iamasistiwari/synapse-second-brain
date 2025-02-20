import Sidebar from '@/components/Sidebar';
import React from 'react';

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-[100vh] w-full overflow-y-hidden">
      <Sidebar />

      <aside className="container w-full">{children}</aside>
    </div>
  );
}
