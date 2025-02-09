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
import { LogOut } from 'lucide-react';
import { signOut } from 'next-auth/react';
import toast from 'react-hot-toast';

export default function LogoutDailog() {
  const [loading, setLoading] = useState<boolean>(false);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
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
          <button className="hover:cursor-pointer active:scale-90">
            <LogOut className="border-custom h-10 w-10 rounded-md border p-2 opacity-80" />
          </button>
        </DialogTrigger>
        <DialogContent className="focus:outline-none focus:ring-0">
          <DialogHeader>
            <DialogTitle
              asChild
              className="focus:boder-0 focus:outline-none focus:ring-0"
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col">
                  <h1 className="mb-5 w-96 justify-center text-center text-lg font-medium lg:text-xl">
                    Are you sure you want to logout ?
                  </h1>
                  <Button
                    isLoading={loading}
                    type="button"
                    Icon={LogOut}
                    className="min-w-96 font-semibold"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logut
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
export function MobileLogoutDailog() {
  const [loading, setLoading] = useState<boolean>(false);

  const logOut = async () => {
    setLoading(true);
    try {
      await signOut({ callbackUrl: '/' });
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
          <div className="flex w-full items-center justify-center">
            <Button
              isLoading={loading}
              Icon={LogOut}
              size={'lg'}
              className="w-[300px]"
            >
              Log out
            </Button>
          </div>
        </DialogTrigger>
        <DialogContent className="w-[90vw] rounded-lg focus:outline-none focus:ring-0">
          <DialogHeader>
            <DialogTitle
              asChild
              className="focus:boder-0 focus:outline-none focus:ring-0"
            >
              <div className="flex h-full w-full flex-col items-center justify-center">
                <div className="flex flex-col py-6">
                  <h1 className="mb-5 w-full items-center justify-center text-center text-lg font-medium lg:text-xl">
                    Are you sure you want to logout ?
                  </h1>
                  <Button
                    isLoading={loading}
                    type="button"
                    Icon={LogOut}
                    className="font-semibold"
                    onClick={() => {
                      logOut();
                    }}
                  >
                    Logut
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
