"use client"
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';


export default function Providers({children}: {children: React.ReactNode}) {
  return (
    <SessionProvider>
      <NextThemesProvider attribute='class' defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
      </NextThemesProvider>
    </SessionProvider>
  )
}
