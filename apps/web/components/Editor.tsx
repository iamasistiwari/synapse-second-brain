'use client';
import React from 'react';
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
      className="w-full max-w-[80vw]"
      defaultValue={formData.description}
      disableLocalStorage={true}
      onUpdate={(editor) => {
        const markdown = editor?.storage.markdown.getMarkdown();
        setFormData((c) => ({ ...c, description: markdown }));
      }}
    />
  );
}
