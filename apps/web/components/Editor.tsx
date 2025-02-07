'use client';
import React from 'react';
// import Markdown from 'markdown-to-jsx';
import dynamic from 'next/dynamic';
import { ContentType } from '@repo/common/type';
const Editor = dynamic(
  () => import('novel-lightweight').then((mod) => mod.Editor),
  { ssr: false }
);

interface EditorProps {
  formData: ContentType;
  setFormData: React.Dispatch<React.SetStateAction<ContentType>>;
}

export default function EditorComponent({
  formData,
  setFormData,
}: EditorProps) {
  return (
    <Editor
      className="w-full"
      defaultValue={formData.description}
      disableLocalStorage={true}
      onUpdate={(editor) => {
        const markdown = editor?.storage.markdown.getMarkdown();
        setFormData((c) => ({ ...c, description: markdown }));
      }}
    />
  );
}

{
  /* <div className="">
  <Markdown
    options={{
      overrides: {
        p: {
          component: 'p',
          props: {
            className: 'text-lg leading-relaxed mb-4',
          },
        },
        h1: {
          component: 'h1',
          props: {
            className: 'text-3xl font-bold text-primary mb-4',
          },
        },
        h2: {
          component: 'h2',
          props: {
            className: 'text-2xl font-semibold text-secondary mb-4',
          },
        },
        h3: {
          component: 'h3',
          props: {
            className: 'text-xl font-semibold text-gray-800 mb-4',
          },
        },
        ul: {
          component: 'ul',
          props: {
            className: 'list-disc pl-6 mb-4',
          },
        },
        ol: {
          component: 'ol',
          props: {
            className: 'list-decimal pl-6 mb-4',
          },
        },
        li: {
          component: 'li',
          props: {
            className: 'mb-2',
          },
        },
        blockquote: {
          component: 'blockquote',
          props: {
            className: 'border-l-4 pl-4 italic text-gray-600 mb-4',
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
    {data}
  </Markdown>
</div>; */
}

// async function uploadImage(
//   file: File,
//   path = "default-path",
//   tags = "default-tag",
//   apiKey = "your-api-key"
// ) {
//   const formData = new FormData();
//   formData.append("file", file);
//   formData.append("path", path);
//   formData.append("tags", tags);

//   try {
//     const response = await fetch("https://pics.shade.cool/api/upload", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${apiKey}`,
//       },
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error(`Error: ${response.statusText}`);
//     }

//     const result = await response.json();
//     return result;
//   } catch (error) {
//     console.error("Error uploading image:", error);
//     return { url: null };
//   }
// }
