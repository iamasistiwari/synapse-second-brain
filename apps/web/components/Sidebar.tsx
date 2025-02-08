'use client';
import {
  Brain,
  Twitter,
  FileText,
  Link2,
  Tags,
  LayoutDashboard,
  LogOut,
} from 'lucide-react';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import LogoutDailog from './LogoutDailog';

interface SiderBarOptions {
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  href: string;
}
const SiderBarOptions: SiderBarOptions[] = [
  {
    title: 'Dashboard',
    icon: LayoutDashboard,
    href: '/dashboard',
  },
  {
    title: 'Tweets',
    icon: Twitter,
    href: '/tweets',
  },
  {
    title: 'Notes',
    icon: FileText,
    href: '/note',
  },
  {
    title: 'Links',
    icon: Link2,
    href: '/links',
  },
  {
    title: 'Tags',
    icon: Tags,
    href: '/tags',
  },
];

export default function Sidebar() {
  const session = useSession();
  const pathname = usePathname();
  return (
    <div className="border-custom min-w-[250px] border-r px-4 py-5">
      <div className="border-custom flex items-center space-x-2 border-b py-4">
        <Brain className="text-custom h-8 w-8" />
        <span className="text-xl font-semibold">Synapse</span>
      </div>

      <div className="scrollbar-w-2 border-custom scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded flex h-[550px] flex-col space-y-5 overflow-y-auto border-b px-4 pt-10">
        {SiderBarOptions.map((option, index) => (
          <Link
            href={option.href}
            key={index}
            className={`hover:text-custom flex items-center space-x-2 pb-2 transition-all duration-200 hover:scale-105 hover:cursor-pointer hover:border-b hover:border-violet-400 ${pathname === option.href ? 'text-violet-900 dark:text-violet-400' : ''}`}
          >
            <option.icon className="h-4 w-4" />
            <span>{option.title}</span>
          </Link>
        ))}
      </div>

      <div className="flex items-center space-x-2 px-4 pt-6">
        <Image
          src={session.data?.user.image || 'https://github.com/shadcn.png'}
          alt="image"
          width={35}
          height={35}
          className="rounded-3xl"
        />
        <span className="text-sm opacity-80">{session.data?.user.name}</span>

        {/* needs to change with button */}
        <LogoutDailog />
      </div>
    </div>
  );
}
