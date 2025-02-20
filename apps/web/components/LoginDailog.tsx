'use client';
import React, { useState } from 'react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import Button from './ui/Button';
import { signIn } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function LoginDailog() {
  const [loading, setLoading] = useState<boolean>(false);

  const loginWithGoogle = async () => {
    setLoading(true);
    try {
      await signIn('google', { callbackUrl: '/dashboard' });
    } catch (error) {
      toast.error('Something went wrong', { duration: 1000 });
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog>
        <DialogTrigger
          asChild
          className="focus:rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-blue-900"
        >
          <button className="cursor-pointer rounded-lg border border-neutral-700 p-2 px-4 text-white outline-none ring-0 transition-all duration-500 hover:text-purple-400 focus:outline-none active:scale-105">
            Start now
          </button>
        </DialogTrigger>
        <DialogContent className="rounded-2xl border border-neutral-700 px-10 py-5 focus:outline-none ring-2 ring-violet-600 ">
          <DialogHeader>
            <DialogTitle
              asChild
              className="focus:boder-0 focus:outline-none focus:ring-0"
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col">
                  <h1 className="mb-5 justify-center text-center text-lg font-medium lg:text-xl xl:w-96">
                    Sign in to your account
                  </h1>
                  <Button
                    isLoading={loading}
                    type="button"
                    Icon={GoogleIcon}
                    className="font-semibold xl:min-w-96"
                    onClick={() => {
                      loginWithGoogle();
                    }}
                  >
                    Google
                  </Button>
                </div>
              </div>
            </DialogTitle>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
const GoogleIcon = () => {
  return (
    <svg
      className="mr-2 h-4 w-4"
      aria-hidden="true"
      focusable="false"
      data-prefix="fab"
      data-icon="github"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
      <path d="M1 1h22v22H1z" fill="none" />
    </svg>
  );
};
