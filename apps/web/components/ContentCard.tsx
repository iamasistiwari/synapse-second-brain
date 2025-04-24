import { ReceivedContent } from '@repo/common/type';
import { CameraOff, Forward } from 'lucide-react';
import Markdown from 'markdown-to-jsx';
import Image from 'next/image';
import Link from 'next/link';
import DeleteContent from './DeleteContent';

export interface UseLinkType {
  lang: string;
  author: string;
  title: string;
  publisher: string;
  image: {
    height: string;
    width: string;
    url: string;
  };
  date: string;
  url: string;
  description: string;
  logo: {
    height: string;
    width: string;
    url: string;
  };
}

export default function ContentCard({ content }: { content: ReceivedContent }) {
  if (content.type === 'Note') {
    return (
      <div className="border-custom flex flex-col justify-between rounded-lg border px-2 transition-all duration-200 hover:bg-neutral-100 hover:dark:bg-neutral-800">
        <div className="hidden space-y-2.5 xl:block">
          <div className="pt-2 text-[16px] font-semibold">{content.title}</div>
          <Markdown
            suppressHydrationWarning
            options={{
              overrides: {
                p: {
                  component: 'p',
                  props: {
                    className: 'text-sm xl:text-base leading-relaxed mb-4',
                  },
                },
                h1: {
                  component: 'h1',
                  props: {
                    className:
                      'text-[15px] xl:text-2xl font-bold text-primary mb-4',
                  },
                },
                h2: {
                  component: 'h2',
                  props: {
                    className:
                      'text-[12px] xl:text-xl font-semibold text-secondary mb-4',
                  },
                },
                h3: {
                  component: 'h3',
                  props: {
                    className:
                      'text-[11px] xl:text-lg font-semibold text-gray-800 mb-4',
                  },
                },
                ul: {
                  component: 'ul',
                  props: {
                    className: 'list-disc pl-3 xl:pl-6 xl:mb-4 rounded-lg',
                  },
                },
                ol: {
                  component: 'ol',
                  props: {
                    className: 'list-decimal pl-3 xl:pl-6 xl:mb-4 rounded-lg',
                  },
                },
                li: {
                  component: 'li',
                  props: {
                    className: 'mb-1 xl:mb-2 text-sm xl:text-base',
                  },
                },
                input: {
                  component: 'input',
                  props: {
                    className:
                      'rounded-full w-3 xl:w-4 h-3 xl:h-4 mr-1 appearance-none border-2 border-gray-400 focus:outline-none',
                  },
                },

                blockquote: {
                  component: 'blockquote',
                  props: {
                    className:
                      'border-l-2 border-custom pl-2 xl:pl-3 italic text-gray-600 mb-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-300 dark:text-neutral-200',
                  },
                },
                pre: {
                  component: 'pre',
                  props: {
                    className:
                      'overflow-x-auto bg-gray-100 dark:bg-neutral-800 p-2 xl:p-3 rounded-lg border border-gray-300 dark:border-neutral-700 mb-1 xl:mb-2',
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
            {content.description.length < 120
              ? content.description
              : content.description.substring(0, 120)}
          </Markdown>
          {content.description.length > 120 ? (
            <Link
              href={`/content/${content.title.replace(/\s/g, '')}--${content.id}`}
              className="flex w-full items-center justify-center tracking-wider text-blue-500 underline"
            >
              see more
              <Forward className="ml-1 h-4 w-4" />{' '}
            </Link>
          ) : null}
        </div>

        {/* markdown for small size screen */}
        <div className="block space-y-2.5 xl:hidden">
          <div className="pt-2 text-[16px] font-semibold">{content.title}</div>
          <Markdown
            options={{
              overrides: {
                p: {
                  component: 'p',
                  props: {
                    className: 'text-sm xl:text-base leading-relaxed mb-4',
                  },
                },
                h1: {
                  component: 'h1',
                  props: {
                    className:
                      'text-[15px] xl:text-2xl font-bold text-primary mb-4',
                  },
                },
                h2: {
                  component: 'h2',
                  props: {
                    className:
                      'text-[12px] xl:text-xl font-semibold text-secondary mb-4',
                  },
                },
                h3: {
                  component: 'h3',
                  props: {
                    className:
                      'text-[11px] xl:text-lg font-semibold text-gray-800 mb-4',
                  },
                },
                ul: {
                  component: 'ul',
                  props: {
                    className: 'list-disc pl-3 xl:pl-6 xl:mb-4 rounded-lg',
                  },
                },
                ol: {
                  component: 'ol',
                  props: {
                    className: 'list-decimal pl-3 xl:pl-6 xl:mb-4 rounded-lg',
                  },
                },
                li: {
                  component: 'li',
                  props: {
                    className: 'mb-1 xl:mb-2 text-sm xl:text-base',
                  },
                },
                input: {
                  component: 'input',
                  props: {
                    className:
                      'rounded-full w-3 xl:w-4 h-3 xl:h-4 mr-1 appearance-none border-2 border-gray-400 focus:outline-none',
                  },
                },

                blockquote: {
                  component: 'blockquote',
                  props: {
                    className:
                      'border-l-2 border-custom pl-2 xl:pl-3 italic text-gray-600 mb-2 bg-neutral-300 dark:bg-neutral-800 rounded-lg text-neutral-800 dark:text-neutral-300 dark:text-neutral-200',
                  },
                },
                pre: {
                  component: 'pre',
                  props: {
                    className:
                      'overflow-x-auto bg-gray-100 dark:bg-neutral-800 p-2 xl:p-3 rounded-lg border border-gray-300 dark:border-neutral-700 mb-1 xl:mb-2',
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
            {content.description.length < 80
              ? content.description
              : content.description.substring(0, 80)}
          </Markdown>
          {content.description.length > 80 ? (
            <Link
              href={`/content/${content.title.replace(/\s/g, '')}--${content.id}`}
              className="flex w-full items-center justify-center tracking-wider text-blue-500 underline"
            >
              see more
              <Forward className="ml-1 h-4 w-4" />{' '}
            </Link>
          ) : null}
        </div>

        <div className="my-1 flex justify-between xl:py-2">
          <div className="flex items-center justify-center space-x-0.5 xl:space-x-1">
            {content.Tags.map((tag, index) => (
              <div
                className="rounded-lg bg-custom-purple px-1.5 text-xs text-white xl:px-2 xl:text-sm"
                key={index}
              >
                {tag.title.length < 6
                  ? tag.title
                  : tag.title.substring(0, 5) + '..'}
              </div>
            ))}
          </div>

          <DeleteContent content={content}/>
          
        </div>
      </div>
    );
  }
  const linkData = JSON.parse(content.description) as unknown as UseLinkType;
  return (
    <Link
      href={`/content/${content.title.replace(/\s/g, '')}--${content.id}`}
      className="border-custom flex flex-col justify-between rounded-lg border px-2 transition-all duration-200 hover:bg-neutral-100 hover:dark:bg-neutral-800"
    >
      <div className="space-y-2.5">
        <div className="flex flex-row justify-between pt-2">
          <div className="text-[11px] tracking-tight text-neutral-900 dark:text-neutral-300 xl:text-[15px]">
            <span className="hidden xl:block">{linkData.author}</span>
            <span className="block xl:hidden">{linkData.author}</span>
          </div>
          <div className="flex items-center justify-center">
            <div className="mr-2 hidden text-xs leading-3 tracking-tighter text-neutral-900 dark:text-neutral-300 xl:block">
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

        <div className="border-custom relative h-44 w-full rounded-lg border xl:h-48">
          {linkData.image === null ? (
            <div className="flex h-full items-center justify-center text-xs opacity-55 xl:text-base">
              <CameraOff className="pr-2" />
              No image found
            </div>
          ) : (
            <Image
              alt="link-image"
              fill
              src={linkData.image.url}
              className="rounded-lg"
            />
          )}
        </div>
        <div className="text-[16px] font-semibold">{content.title}</div>

        {/* link title */}
        {content.type !== 'Tweet' ? (
          <>
            <div className="text-xs text-neutral-900 dark:text-neutral-300 lg:text-[15px]">
              {linkData.title}
            </div>
            {/* <div
              suppressHydrationWarning
              className="block text-[10px] text-neutral-900 dark:text-neutral-300 xl:hidden"
            >
              {smAuthorTitle}
            </div> */}
          </>
        ) : null}

        {/* twitt des */}
        {content.type === 'Tweet' ? (
          <>
            <div className="hidden text-[15px] text-neutral-900 dark:text-neutral-300 xl:block">
              {linkData.description.length < 60
                ? linkData.description
                : linkData.description.substring(0, 60) + `...`}
            </div>
            <div
              suppressHydrationWarning
              className="block text-[10px] text-neutral-900 dark:text-neutral-300 xl:hidden"
            >
              {linkData.description.length < 45
                ? linkData.description
                : linkData.description.substring(0, 45) + `...`}
            </div>
          </>
        ) : null}
      </div>

      <div className="my-1 flex justify-between xl:py-2">
        <div className="flex items-center justify-center space-x-0.5 xl:space-x-1">
          {content.Tags.map((tag, index) => (
            <div
              className="rounded-lg bg-custom-purple px-1.5 text-xs text-white xl:px-2 xl:text-sm"
              key={index}
            >
              {tag.title}
            </div>
          ))}
        </div>

        <DeleteContent content={content} />
      </div>
    </Link>
  );
}
