import { getContent } from '@/actions/content';
import { UseLinkType } from '@/components/ContentCard';
import { CameraOff } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import React from 'react';

interface Props {
  params: Promise<{
    contentId: string;
  }>;
}

export default async function page({ params }: Props) {
  const contentId = (await params).contentId;
  const content = await getContent(contentId);
  if (!content || content.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center text-xl font-semibold">
        Content not found 404!
      </div>
    );
  }
  if (content[0].type === 'Note') {
    return (
      <div className="flex h-screen flex-col px-4 py-8 xl:px-20">
        <div className="space-y-2.5">
          <div className="pt-2 text-[22px] font-semibold">
            {content[0].title}
          </div>
          <Markdown
            options={{
              overrides: {
                p: {
                  component: 'p',
                  props: {
                    className: 'text-base leading-relaxed mb-4',
                  },
                },
                h1: {
                  component: 'h1',
                  props: {
                    className: 'text-2xl font-bold text-primary mb-4',
                  },
                },
                h2: {
                  component: 'h2',
                  props: {
                    className: 'text-xl font-semibold text-secondary mb-4',
                  },
                },
                h3: {
                  component: 'h3',
                  props: {
                    className: 'text-lg font-semibold text-gray-800 mb-4',
                  },
                },
                ul: {
                  component: 'ul',
                  props: {
                    className: 'list-disc pl-6 mb-4 rounded-lg',
                  },
                },
                ol: {
                  component: 'ol',
                  props: {
                    className: 'list-decimal pl-6 mb-4 rounded-lg',
                  },
                },
                li: {
                  component: 'li',
                  props: {
                    className: 'mb-2',
                  },
                },
                input: {
                  component: 'input',
                  props: {
                    className:
                      'rounded-full w-4 h-4 mr-1 appearance-none border-2 border-gray-400 focus:outline-none',
                  },
                },

                blockquote: {
                  component: 'blockquote',
                  props: {
                    className:
                      'border-l-2 border-custom pl-3 italic text-gray-600 mb-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-300 dark:text-neutral-200',
                  },
                },
                pre: {
                  component: 'pre',
                  props: {
                    className:
                      'overflow-x-auto bg-gray-100 dark:bg-neutral-800 p-3 rounded-lg border border-gray-300 dark:border-neutral-700 mb-2',
                  },
                },
                code: {
                  component: 'code',
                  props: {
                    className:
                      'bg-gray-200 dark:bg-neutral-700 py-0.5 rounded text-sm font-mono',
                  },
                },

                strong: {
                  component: 'strong',
                  props: {
                    className: 'font-semibold',
                  },
                },
                em: {
                  component: 'em',
                  props: {
                    className: 'italic',
                  },
                },
                a: {
                  component: 'a',
                  props: {
                    className: 'text-blue-500 hover:underline',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                  },
                },
              },
            }}
          >
            {content[0].description}
          </Markdown>
        </div>

        <div className="mt-10 flex gap-x-6 py-2">
          <div className="flex space-x-1">
            {content[0].Tags.map((tag, index) => (
              <div
                className="rounded-lg bg-custom-purple px-2 text-white"
                key={index}
              >
                {tag.title}
              </div>
            ))}
          </div>

          <div className="flex w-40 items-center justify-center rounded-lg bg-neutral-200 py-0.5 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-white">
            Added on
            <span className="pl-1 text-sm tracking-tight">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(content[0].createdAt))}
            </span>
          </div>
        </div>
      </div>
    );
  }

  const linkData = JSON.parse(content[0].description) as unknown as UseLinkType;
  return (
    <div className="flex h-screen flex-col px-4 py-8 xl:px-20">
      <div className="space-y-2.5">
        <div className="flex flex-col gap-x-6 pt-2 xl:flex-row">
          {linkData.author !== null ? (
            <div className="pl-1 text-lg font-semibold text-neutral-900 dark:text-neutral-300">
              <span>{linkData.author}</span>
            </div>
          ) : null}
          <div className="flex items-center xl:justify-center">
            <div className="mr-2 pl-1 text-base leading-3 tracking-tighter text-neutral-900 dark:text-neutral-300">
              {new Intl.DateTimeFormat('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric',
              }).format(new Date(linkData.date))}
            </div>
            <Image
              alt="logo-image"
              src={linkData.logo.url}
              height={18}
              width={18}
              className="rounded-lg"
            />
          </div>
        </div>
        <a
          href={`${linkData.url}`}
          target="_blank"
          className="pl-1 text-sm text-blue-500 underline"
        >
          {linkData.url.substring(0, 40) + '...'}
        </a>

        <div className="flex w-full rounded-lg">
          {linkData.image === null ? (
            <div className="border-custom flex h-[21vw] w-[35vw] items-center justify-center rounded-lg border opacity-55">
              <CameraOff className="pr-2" />
              No image found
            </div>
          ) : (
            <div className="border-custom relative flex h-[35vh] w-[95vw] justify-center rounded-lg border xl:h-[42vh] xl:w-[35vw]">
              <Image
                alt="link-image"
                fill
                src={linkData.image.url}
                className="rounded-lg"
              />
            </div>
          )}
        </div>
        <div className="pl-1 text-2xl font-semibold">
          Provided title - {content[0].title}
        </div>
        <div className="pl-1 text-base font-medium">
          Title - {linkData.title}
        </div>
        {/* description */}
        <div className="rounded-lg bg-neutral-100 py-4 pl-2 pr-4 dark:bg-neutral-900">
          {linkData.description}
        </div>
      </div>

      <div className="mt-10 flex gap-x-6 py-2">
        <div className="flex space-x-1">
          {content[0].Tags.map((tag, index) => (
            <div
              className="rounded-lg bg-custom-purple px-2 text-white"
              key={index}
            >
              {tag.title}
            </div>
          ))}
        </div>

        <div className="flex w-40 items-center justify-center rounded-lg bg-neutral-200 py-0.5 text-sm text-neutral-800 dark:bg-neutral-800 dark:text-white">
          Added on
          <span className="pl-1 text-sm tracking-tight">
            {new Intl.DateTimeFormat('en-US', {
              year: 'numeric',
              month: 'short',
              day: 'numeric',
            }).format(new Date(content[0].createdAt))}
          </span>
        </div>
      </div>
    </div>
  );
}
