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
import { Search } from 'lucide-react';
import axios, { AxiosError } from 'axios';
import { SearchType } from '@repo/common/type';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

export default function MobileSearchDailog({
  openRef,
}: {
  openRef: React.RefObject<HTMLButtonElement | null>;
}) {
  const closeRef = useRef<HTMLButtonElement>(null);
  //   const openRef = useRef<HTMLButtonElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [response, setResponse] = useState<SearchType[]>([]);
  const [searchCame, setsearchCame] = useState<boolean>(false);
  const [searchComplete, setsearchComplete] = useState<boolean>(false);
  const requestRef = useRef<AbortController | null>(null);
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
      if (requestRef.current) {
        requestRef.current.abort();
      }
      requestRef.current = new AbortController();
      try {
        const res = await axios.post(
          `https://api-synapse.ashishtiwari.net/api/v1/content/ask`,
          { data: search },
          {
            withCredentials: true,
            signal: requestRef.current.signal,
          }
        );

        if (res.status >= 400) {
          throw new Error(res.data.error);
        }
        setResponse(res.data.message as SearchType[]);
        setsearchComplete(true);
      } catch (error) {
        toast.error(
          error instanceof AxiosError ? error.message : 'Something went wrong',
          { duration: 1000 }
        );
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
      </div>
    );
  };

  const ContentLoader = ({ contents }: { contents: SearchType[] }) => {
    const searchLength =
      contents.length < 4
        ? contents.length
        : contents.length - (contents.length - 4);

    return (
      <>
        {searchCame && !searchComplete ? (
          <SkeletonLoader />
        ) : (
          contents.slice(0, searchLength).map((content, index) => (
            <span
              key={index}
              className={`flex h-20 flex-col justify-center text-neutral-800 hover:cursor-pointer dark:text-neutral-100 ${
                index !== searchLength - 1 ? 'border-custom border-b' : ''
              }`}
              onClick={() => {
                router.push(
                  `/content/${content.content_title}--${content.content_id}`
                );
              }}
            >
              <span className="flex justify-start pl-2 text-lg font-semibold">
                {content.content_title}
                <span
                  className={`ml-2 flex items-center justify-center rounded-full px-3 text-xs ${content.content_type === 'Link' ? 'bg-custom-purple' : content.content_type === 'Tweet' ? 'bg-blue-800' : 'bg-orange-500'}`}
                >
                  {content.content_type}
                </span>
              </span>
              <span className="flex justify-start pl-2 opacity-75">
                {content.sections_content.substring(0, 30)}
              </span>
            </span>
          ))
        )}
      </>
    );
  };

  return (
    <Dialog>
      <DialogTrigger
        className="focus:rounded-lg focus:outline-none focus:ring-[0.5px] focus:ring-blue-900"
        ref={openRef}
      ></DialogTrigger>
      <DialogContent className="top-[15%] mt-28 max-h-[50vh] min-h-[25vw] w-[95vw] rounded-lg focus:outline-none focus:ring-0">
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
      {Array.from({ length: 4 }).map((_, index) => (
        <span
          key={index}
          className="flex h-10 animate-pulse flex-col justify-center rounded-lg px-6 py-2 xl:h-20"
        >
          <span className="h-full w-full rounded-lg bg-neutral-300 dark:bg-neutral-700"></span>
        </span>
      ))}
    </>
  );
};
