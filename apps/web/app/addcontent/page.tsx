'use client';
import revalidate from '@/actions/revalidate';
import submitContent from '@/actions/submitContent';
import EditorComponent from '@/components/Editor';
import TagInput from '@/components/TagInput';
import Button from '@/components/ui/Button';
import { ContentType } from '@repo/common/type';
import { FileText, Link, Send, Twitter } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { z } from 'zod';

export type SelectType = 'Link' | 'Tweet' | 'Note';

const FormValidator = z.object({
  type: z.enum(['Note', 'Tweet', 'Link']),
  title: z.string().min(5),
  description: z.string().optional(),
  tags: z.array(z.string()).min(1),
});

export default function Page() {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [loading2, setLoading2] = useState(true);

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
  }, []);

  const handleSubmit = async () => {
    const toastId = toast.loading('Submitting..');
    setLoading(true);

    try {
      const data = formData;
      const formValidation = FormValidator.safeParse(formData);
      if (!formValidation.success) {
        throw new Error('Title: 5+ chars, 1 tag min.');
      }
      if (formData.type !== 'Note') {
        const urlValidation = z.string().url().safeParse(formData.url);
        if (
          formData.type === 'Tweet' &&
          !formData.url.startsWith('https://x.com/')
        ) {
          throw new Error('Tweet url not valid');
        }
        if (!urlValidation.success) {
          throw new Error('Url must be valid.');
        }
      }
      if (formData.type === 'Note') {
        const desValidation = z
          .string()
          .min(10)
          .safeParse(formData.description);
        if (!desValidation.success) {
          throw new Error('Note: 10+ chars');
        }
      }
      const responseData = await submitContent(data);

      if(responseData.error !== ""){
        toast.error(`${responseData.error}`, { id: toastId, duration: 1000 });
        return 
      }
      toast.success(responseData.message, { id: toastId, duration: 1500 });
      router.push(`/dashboard`);
      return;
    } catch (error) {
      const ErrorDetails =
        error instanceof Error ? error.message : 'Something went wrong';
      new Promise(() => {
        setTimeout(() => {
          toast.error(`${ErrorDetails}`, { id: toastId, duration: 3000 });
        }, 500);
      });
      return;
    } finally {
      new Promise(() => {
        setTimeout(() => {
          setLoading(false);
        }, 1000);
      });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading2(false);
    }, 200);
    return () => clearTimeout(timer);
  }, []);

  if (loading2) {
    return (
      <>
        <div className="mt-11 hidden h-screen flex-col transition-all duration-200 xl:flex">
          <span className="mx-72 h-16 animate-pulse rounded-xl bg-neutral-300 dark:bg-neutral-700"></span>
          <span className="mx-40 mt-10 h-12 animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></span>
          <span className="mx-28 mt-10 h-32 animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></span>
          <span className="mx-28 mt-10 h-32 animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></span>
        </div>

        <div className="mt-6 flex w-full flex-col items-center justify-center gap-y-6 xl:hidden">
          <div className="flex h-28 w-[80vw] animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex h-16 w-[80vw] animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex h-16 w-[80vw] animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex h-28 w-[80vw] animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
          <div className="flex h-28 w-[80vw] animate-pulse items-center justify-center rounded-xl bg-neutral-300 dark:bg-neutral-700"></div>
        </div>
      </>
    );
  }

  return (
    <div className="mt-4 flex h-screen justify-center px-4 transition-all duration-75 xl:mt-11">
      <div>
        <div className="flex w-full flex-col">
          <div className="flex w-[80vw] items-center justify-center">
            <div className="border-custom flex flex-col items-center justify-center rounded-lg border p-4">
              <label
                className="mb-2 flex w-full justify-start pl-1 font-medium"
                htmlFor="type"
              >
                Choose content type
              </label>
              <div className="flex w-full justify-between xl:w-[45vw]">
                <div
                  id="type"
                  className="flex flex-col gap-y-2 xl:flex-row xl:gap-x-3"
                >
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
                  className="ml-2 bg-green-700"
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

          <div className="mb-5 mt-2 flex flex-col">
            <label
              className="mb-1 pl-1 tracking-wider opacity-80"
              htmlFor="title"
            >
              Enter title*
            </label>
            <input
              type="title"
              value={formData.title}
              id="title"
              name="title"
              className="border-custom h-11 w-full rounded-lg border bg-transparent pl-3 text-black focus:outline-none dark:text-white"
              placeholder="title"
              onChange={(e) =>
                setFormData((c) => ({ ...c, title: e.target.value }))
              }
            ></input>
          </div>

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
                value={formData.url}
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
                value={formData.url}
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
              <label
                className="mb-1 pl-1 tracking-wider opacity-80"
                htmlFor="tweet url"
              >
                Enter note*
              </label>
              <div className="border-custom min-h-[25vh] w-[80vw] rounded-lg border xl:w-full">
                <EditorComponent
                  formData={formData}
                  setFormData={setFormData}
                />
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
            <TagInput formData={formData} setFormData={setFormData} />
          </div>
        </div>
      </div>
    </div>
  );
}
