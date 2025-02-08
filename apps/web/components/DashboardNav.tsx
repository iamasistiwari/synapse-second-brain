'use client';
import Button from '@/components/ui/Button';
import { Plus, Share2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import SeachDailog from './SeachDailog';
import { ThemeToggle } from './ui/theme-toggle';

export default function DashboardNav({ title }: { title: string }) {
  const [isContent, setIsContent] = useState<boolean>(false);
  const router = useRouter();
  return (
    <div className="">
      <div className="flex items-center justify-between">
        <span className="text-2xl font-semibold">{title}</span>
        <div className="flex space-x-4">
          <div className="mb-1 flex items-center justify-center">
            <ThemeToggle />
          </div>
          <div className="mb-1">
            <SeachDailog />
          </div>
          <Button
            Icon={Plus}
            isLoading={isContent}
            onClick={() => {
              setIsContent(true);
              setTimeout(() => {
                router.push('/addcontent');
                setIsContent(false);
              }, 200);
            }}
          >
            Add Content
          </Button>
          <Button Icon={Share2} isLoading={false} variant={'ghost'}>
            Share Content
          </Button>
        </div>
      </div>
    </div>
  );
}
