'use client';
import Button from '@/components/Button';
import EditorComponent from '@/components/Editor';
import TagInput from '@/components/TagInput';
import { FileText, Link, Send, Twitter } from 'lucide-react';
import React, { FormEvent, useCallback, useState } from 'react';
import { ContentType } from '@repo/backend-common/types';
import { addContentValidator } from '@repo/backend-common/types';
import toast from 'react-hot-toast';
import { z } from 'zod';

export type SelectType = 'Link' | 'Tweet' | 'Note';

export default function page() {
  const [loading, setLoading] = useState<boolean>(false);
  const [formData, setFormData] = useState<ContentType>({
    type: 'Note',
    title: '',
    url: '',
    description: '',
    tags: [] as string[],
  });

  const handleSelection = useCallback((type: SelectType) => {
    setFormData({
      type: type,
      title: '',
      url: '',
      description: '',
      tags: [],
    });

  }, [])

  const handleSubmit = async () => {
    setLoading(true)
    try {
      addContentValidator.parse(formData);
      if(formData.type === 'Link' || formData.type === 'Tweet'){
        const titleValidation = z.string().min(5).safeParse(formData.title)
        if(!titleValidation.success){
          toast.error("title must be of atleast of 5 char", {duration: 1000})
          return
        }
        const urlValidation = z.string().url().safeParse(formData.url)
        if(!urlValidation.success){
          toast.error('url must be valid', { duration: 1000 });
          return;
        }
        // make backend request

      }

    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error('invalid data please add atleast one tag', { duration: 1000 });
        return;
      }
      toast.error('Something went wrong', { duration: 1000 });
      return;
    } finally{
      new Promise(() => {
        setTimeout(() => {
          setLoading(false)
        }, 1000)
      })
    }
  };

  return (
    <div className="mt-11 flex h-screen justify-center">
      {/* <div>{JSON.stringify(formData)}</div> */}
      <div>
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
                    Icon={FileText}
                    className={`${formData.type === 'Note' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      handleSelection('Note');
                    }}
                  >
                    Note
                  </Button>
                  <Button
                    isLoading={false}
                    Icon={Twitter}
                    className={`${formData.type === 'Tweet' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      handleSelection('Tweet');
                    }}
                  >
                    Tweet
                  </Button>
                  <Button
                    isLoading={false}
                    Icon={Link}
                    className={`${formData.type === 'Link' ? 'bg-neutral-700 transition-all duration-100' : ''}`}
                    onClick={() => {
                      handleSelection('Link');
                    }}
                  >
                    Link
                  </Button>
                </div>
                <Button
                  className="bg-green-700"
                  isLoading={loading}
                  Icon={Send}
                  onClick={() => {
                    handleSubmit();
                  }}
                >
                  Submit
                </Button>
              </div>
            </div>
          </div>

          {formData.type !== 'Note' ? (
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
                onChange={(e) =>
                  setFormData((c) => ({ ...c, title: e.target.value }))
                }
              ></input>
            </div>
          ) : null}

          {formData.type === 'Tweet' ? (
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
                onChange={(e) =>
                  setFormData((c) => ({ ...c, url: e.target.value }))
                }
              ></input>
            </div>
          ) : null}

          {formData.type === 'Link' ? (
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
                onChange={(e) =>
                  setFormData((c) => ({ ...c, url: e.target.value }))
                }
              ></input>
            </div>
          ) : null}

          {formData.type === 'Note' ? (
            <div className="mt-5 flex flex-col">
              <div className="border-custom w-full rounded-lg border">
                <EditorComponent formData={formData} setFormData={setFormData}/>
              </div>
            </div>
          ) : null}

          {/*  */}
          <div className="mt-5 flex flex-col">
            <label
              className="mb-1 pl-1 tracking-wider opacity-80"
              htmlFor="tweet url"
            >
              Enter a tag*
            </label>
            <TagInput formData={formData} setFormData={setFormData}/>
          </div>
        </div>
      </div>
    </div>
  );
}
