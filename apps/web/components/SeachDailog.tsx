'use client';
import React, { useEffect, useRef, useState } from 'react';
import debounce from "debounce"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Command, Search, Target } from 'lucide-react';
import axios from 'axios';

export default function SeachDailog() {
  const closeRef = useRef<HTMLButtonElement>(null);
  const openRef = useRef<HTMLButtonElement>(null);
  const [response, setResponse] = useState<string>("");

  const handleSeach = debounce(async (e: React.ChangeEvent<HTMLInputElement>) => {
    if(e.target.value.length < 5){
      return
    }
    try {
      const data = {
        data: e.target.value,
      };
      const res = await axios.post(
        `http://localhost:3001/api/v1/content/ask`,
        data,
        { withCredentials: true }
      );
      console.log(res.data);
      setResponse(res.data)
    } catch (error) {
      
    }
  },500)

  const SeachComp = () => {
    return (
      <div className="relative flex">
        <span className="absolute left-2 top-[9px] opacity-50">
          <Search className="h-5 w-5" />
        </span>
        <input
          type="text"
          className="focus:border-custom w-full border-0 bg-transparent pl-10 font-medium text-neutral-800 focus:border-b focus:outline-none focus:ring-0 dark:text-neutral-100"
          placeholder="Type to AI search..."
          onChange={(e) => {handleSeach(e)}}
        ></input>
        <span className="absolute right-0 top-[8px] mr-2 rounded-lg bg-neutral-700 px-2 py-0.5 text-sm font-medium opacity-50">
          esc
        </span>
      </div>
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
      <DialogTrigger className="focus:outline-none" ref={openRef}>
        <TriggerComp />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="">
            <SeachComp />
          </DialogTitle>
          <DialogDescription>
            This {JSON.stringify(response)}
          </DialogDescription>
        </DialogHeader>

        <DialogClose ref={closeRef} />
      </DialogContent>
    </Dialog>
  );
}

const TriggerComp = () => {
  return (
    <div className="border-custom group flex h-11 w-52 items-center justify-between rounded-lg border px-2 py-3 font-medium text-neutral-800 dark:text-neutral-100">
      <span className="opacity-50 transition-all duration-200 group-hover:opacity-80">
        Search with AI...
      </span>
      <span className="flex rounded-lg bg-neutral-700 px-2 py-0.5 text-sm opacity-50">
        <Command className="h-4 w-4" />
        +k
      </span>
    </div>
  );
};

