'use client';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import debounce from 'debounce';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Command, Search } from 'lucide-react';
import { SearchType } from '@repo/common/type';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { askContent } from '@/actions/content';

export default function SeachDailog() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [response, setResponse] = useState<SearchType[]>([]);
  const [searchCame, setsearchCame] = useState<boolean>(false);
  const [searchComplete, setsearchComplete] = useState<boolean>(false);
  const router = useRouter();

  useEffect(() => {
    if (searchRef.current) {
      searchRef.current.focus();
    }
  }, [response, searchValue]);

  const handleSeach = useCallback(
    debounce(async (search: string) => {
      if (search.length < 5) return;
      setsearchComplete(false);
      const res = await askContent({ data: search });
      if (res.content && res.error.length < 1) {
        setResponse(res.content);
        setsearchComplete(true);
        return;
      } else {
        toast.error(res.error, { duration: 1000 });
        return;
      }
    }, 800),
    []
  );

  const SeachComp = () => {
    return (
      <div className="relative flex">
        <span className="absolute left-2 top-[9px] opacity-50">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          className="focus:border-custom w-full rounded-lg border-0 bg-transparent pl-10 font-medium text-neutral-800 focus:border-0 focus:border-b focus:outline-none focus:ring-0 dark:text-neutral-100"
          placeholder="Type to AI search..."
          ref={searchRef}
          onChange={(e) => {
            const value = e.target.value;
            setsearchCame(true);
            setSearchValue(value);
            handleSeach(value);
          }}
          value={searchValue}
        ></input>
        <span className="absolute right-0 top-[8px] mr-2 rounded-lg bg-neutral-700 px-2 py-0.5 text-sm font-medium opacity-50">
          esc
        </span>
      </div>
    );
  };

  const ContentLoader = ({ contents }: { contents: SearchType[] }) => {
    const searchLength =
      contents.length < 5
        ? contents.length
        : contents.length - (contents.length - 5);

    return (
      <>
        {searchCame && !searchComplete ? (
          <SkeletonLoader />
        ) : (
          contents.slice(0, searchLength).map((content, index) => (
            <span
              key={index}
              className={`flex h-20 flex-col justify-center px-2 py-2 pl-4 text-neutral-800 hover:cursor-pointer dark:text-neutral-100 ${
                index !== searchLength - 1 ? 'border-custom border-b' : ''
              }`}
              onClick={() => {
                router.push(
                  `/content/${content.content_title}--${content.content_id}`
                );
              }}
            >
              <span className="text-lg font-semibold">
                {content.content_title}
                <span
                  className={`ml-2 rounded-full px-2 py-1 text-sm ${content.content_type === 'Link' ? 'bg-custom-purple' : content.content_type === 'Tweet' ? 'bg-blue-800' : 'bg-orange-500'}`}
                >
                  {content.content_type}
                </span>
              </span>
              <span className="opacity-75">{content.sections_content}</span>
            </span>
          ))
        )}
      </>
    );
  };

  useEffect(() => {
    const handleClick = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && closeRef.current) {
        closeRef.current.click();
      }
      if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
        openRef.current?.click();
      }
    };

    document.addEventListener('keydown', handleClick);
    return () => {
      document.removeEventListener('keydown', handleClick);
    };
  }, []);
  return (
    <Dialog>
      <DialogTrigger
        className="focus:rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-blue-900"
        ref={openRef}
      >
        <TriggerComp />
      </DialogTrigger>
      <DialogContent className="focus:outline-none focus:ring-0">
        <DialogHeader>
          <DialogTitle className="focus:boder-0 focus:outline-none focus:ring-0">
            <SeachComp />
          </DialogTitle>
          <DialogDescription className="">
            <ContentLoader contents={response} />
          </DialogDescription>
        </DialogHeader>
        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
}

const SkeletonLoader = () => {
  return (
    <>
      {Array.from({ length: 5 }).map((_, index) => (
        <span
          key={index}
          className="flex h-20 animate-pulse flex-col justify-center rounded-lg px-6 py-2"
        >
          <span className="h-full w-full rounded-lg bg-neutral-300 dark:bg-neutral-700"></span>
        </span>
      ))}
    </>
  );
};

const TriggerComp = () => {
  return (
    <div className="border-custom group flex h-11 w-52 items-center justify-between rounded-lg border px-2 py-3 font-medium text-neutral-800 dark:text-neutral-100">
      <span className="opacity-50 transition-all duration-200 group-hover:opacity-80">
        Search with AI...
      </span>
      <span className="flex rounded-lg bg-neutral-600 px-2 py-0.5 text-sm text-white opacity-50 dark:bg-neutral-700">
        <Command className="h-4 w-4" />
        +k
      </span>
    </div>
  );
};
