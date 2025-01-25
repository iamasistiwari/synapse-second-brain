'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true)
  },[])

  if(!mounted){
    return null
  }
  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 hover:cursor-pointer active:scale-90 dark:border-neutral-800"
      onClick={() => {
        theme === 'light' ? setTheme('dark') : setTheme('light');
      }}
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6" />
      ) : (
        <Sun className="h-6 w-6" />
      )}
    </div>
  );
}
