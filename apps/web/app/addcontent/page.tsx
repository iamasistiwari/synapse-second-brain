'use client';
import Button from '@/components/Button';
import EditorComponent from '@/components/Editor';
import { Link, Notebook, Plus, Send, Twitter } from 'lucide-react';
import React, { FormEvent, useState } from 'react';

// type FormData = ContentType;

type ContentType = 'link' | 'tweet' | 'note';

export default function page() {
  const [selected, setSelected] = useState<ContentType>('note');

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  return (
    <div className="mt-11 flex h-screen justify-center">
      <form onSubmit={handleSubmit}>
        <div className="flex w-full flex-col">
          <div className="flex w-[80vw] items-center justify-center">
            <div className="flex flex-col">
              <label
                className="opac mb-2 flex w-full justify-start pl-1 font-medium"
                htmlFor="type"
              >
                Choose content type
              </label>
              <div className="flex w-[45vw] justify-between">
                <div id="type" className="flex gap-x-3">
                  <Button
                    isLoading={false}
                    Icon={Notebook}
                    className={`${selected === 'note' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      setSelected('note');
                    }}
                  >
                    Note
                  </Button>
                  <Button
                    isLoading={false}
                    Icon={Twitter}
                    className={`${selected === 'tweet' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      setSelected('tweet');
                    }}
                  >
                    Tweet
                  </Button>
                  <Button
                    isLoading={false}
                    Icon={Link}
                    className={`${selected === 'link' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      setSelected('link');
                    }}
                  >
                    Link
                  </Button>
                </div>
                <Button className='bg-green-700' isLoading={false} Icon={Send}>Submit</Button>
              </div>
            </div>
          </div>

          {selected !== 'note' ? (
            <div className="mb-5 flex flex-col">
              <label
                className="mb-1 pl-1 tracking-wider opacity-80"
                htmlFor="title"
              >
                Enter title*
              </label>
              <input
                type="title"
                id="title"
                name="title"
                className="border-custom h-11 w-full rounded-lg border bg-transparent pl-3 text-black focus:outline-none dark:text-white"
                placeholder="title"
              ></input>
            </div>
          ) : null}

          {selected === 'tweet' ? (
            <div className="mb-5 flex flex-col">
              <label
                className="mb-1 pl-1 tracking-wider opacity-80"
                htmlFor="tweet url"
              >
                Enter tweet url*
              </label>
              <input
                type="tweet url"
                id="tweet url"
                className="border-custom h-11 w-full rounded-lg border bg-transparent pl-3 text-blue-600 focus:outline-none dark:text-blue-500"
                placeholder="tweet url"
              ></input>
            </div>
          ) : null}

          {selected === 'link' ? (
            <div className="mb-5 flex flex-col">
              <label
                className="mb-1 pl-1 tracking-wider opacity-80"
                htmlFor="tweet url"
              >
                Enter url*
              </label>
              <input
                type="url"
                id="url"
                className="border-custom h-11 w-full rounded-lg border bg-transparent pl-3 text-blue-600 focus:outline-none dark:text-blue-500"
                placeholder="url"
              ></input>
            </div>
          ) : null}

          {selected === 'note' ? (
            <div className="mt-5 flex flex-col">
              <div className="border-custom w-full rounded-lg border">
                <EditorComponent />
              </div>
            </div>
          ) : null}
        </div>
      </form>
    </div>
  );
}
