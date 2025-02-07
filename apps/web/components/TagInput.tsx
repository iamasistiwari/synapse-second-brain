'use client';
import { ContentType } from '@repo/common/type';
import React from 'react';
import toast from 'react-hot-toast';
import TagsInput from 'react-tagsinput';
import 'react-tagsinput/react-tagsinput.css';

interface TagInputProps {
  formData: ContentType;
  setFormData: React.Dispatch<React.SetStateAction<ContentType>>;
}

export default function TagInput({ formData, setFormData }: TagInputProps) {
  const maxTags = 2;
  const handleTagsChange = (newTags: string[]) => {
    if (formData.tags.length === maxTags) {
      toast.error('not allowed more than 2 tags', { duration: 1000 });
      return;
    } else {
      setFormData((c) => ({ ...c, tags: newTags }));
    }
  };

  return (
    <div className="">
      <style>
        {`
          .custom-tags-input .react-tagsinput-tag {
            display: none !important;
          }
        `}
      </style>

      <TagsInput
        value={formData.tags}
        onChange={handleTagsChange}
        onlyUnique={true}
        inputProps={{
          placeholder: 'Enter your tags',
          className:
            'border h-11 w-96 rounded-lg bg-transparent px-3 text-black focus:outline-none dark:text-white',
        }}
        className="custom-tags-input"
      />

      <div className="mt-3 flex w-96 flex-wrap gap-2">
        {formData.tags.map((tag, index) => (
          <span
            key={index}
            className="flex items-center rounded-lg bg-blue-500 px-3 py-1 text-white"
          >
            {tag}
            <button
              onClick={() =>
                setFormData((c) => ({
                  ...c,
                  tags: c.tags.filter((_, i) => i !== index),
                }))
              }
              className="ml-2 rounded-full px-2 py-1 text-xs text-white hover:bg-red-600"
            >
              ×
            </button>
          </span>
        ))}
      </div>
    </div>
  );
}
