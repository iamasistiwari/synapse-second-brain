import React from 'react';
import { ThemeToggle } from '@/components/ui/theme-toggle';
import LoginDailog from '@/components/LoginDailog';

export default async function page() {
  return (
    <div className="h-screen w-screen">
      <ThemeToggle />
      <LoginDailog />
    </div>
  );
}
