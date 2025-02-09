import { MobileLogoutDailog } from '@/components/LogoutDailog';
import { authOptions } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import Image from 'next/image';
import React from 'react';

export default async function page() {
  const session = await getServerSession(authOptions);
  const name = session?.user.name || 'Ashish Tiwari';
  const email = session?.user.email || 'iamashihstiwari@gmail.com';
  const profileUrl = session?.user.image || 'https://github.com/shadcn.png';

  return (
    <div className="mt-[30vh] flex h-[50vh] justify-center">
      <div className="border-custom h-[20vh] rounded-md border p-4">
        <div className="flex items-center justify-start text-2xl font-semibold">
          <span className="relative h-12 w-12">
            <Image
              src={profileUrl}
              fill
              alt="profile"
              className="rounded-full"
            />
          </span>
          <div className="flex flex-col">
            <span className="ml-2">{name}</span>
            <span className="ml-2 text-sm font-light">{email}</span>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-start">
          <MobileLogoutDailog />
        </div>
      </div>
    </div>
  );
}
