'use client';
import { deleteContent } from '@/actions/content';
import { ReceivedContent } from '@repo/common/type';
import { Trash2 } from 'lucide-react';
import { useSession } from 'next-auth/react';
import React from 'react';
import toast from 'react-hot-toast';

export default function DeleteContent({
  content,
}: {
  content: ReceivedContent;
}) {
  const session = useSession();
  const handleDelete = async () => {
    const toastId = toast.loading(`Deleting ${content.title}`);
    const res = await deleteContent({
      contentId: content.id,
      userId: session.data?.user.id || '',
    });
    if (!res) {
      toast.error('Not able to delete', { id: toastId });
      return;
    }
    toast.success('Deleted', { id: toastId });
  };
  return (
    <div className="flex min-w-40 max-w-48 items-center justify-end space-x-1 rounded-lg bg-neutral-200 px-1 py-0.5 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-white">
      Added on
      <span className="pl-1 text-sm tracking-tight">
        {new Intl.DateTimeFormat('en-US', {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
        }).format(new Date(content.createdAt))}
      </span>
      <button className="group" onClick={(e) => {
        e.preventDefault(); 
        e.stopPropagation(); 
        handleDelete(); 
      }}>
        <Trash2 className="h-4 w-4 transition-opacity duration-300 group-hover:cursor-pointer group-hover:text-neutral-500" />
      </button>
    </div>
  );
}
