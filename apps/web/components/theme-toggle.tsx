'use client';
import { useEffect, useState } from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
    } else {
      setTheme('light');
    }
  };

  return (
    <div
      className="flex h-10 w-10 items-center justify-center rounded-md border border-neutral-300 hover:cursor-pointer active:scale-90 dark:border-neutral-800"
      onClick={toggleTheme}
    >
      {theme === 'light' ? (
        <Moon className="h-6 w-6 opacity-80 active:scale-90" />
      ) : (
        <Sun className="h-6 w-6 text-yellow-200 opacity-80 active:scale-90" />
      )}
    </div>
  );
}
