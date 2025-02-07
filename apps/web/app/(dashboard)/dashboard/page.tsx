import { getContent } from '@/actions/content';
import ContentCard from '@/components/ContentCard';
import DashboardNav from '@/components/DashboardNav';
import React from 'react';

export default async function page() {

  const contents = await getContent();
  if (!contents) {
    return <div>bad</div>;
  }
  return (
    <div className="">
      <div className="">
        <DashboardNav title="Dashboard" />
      </div>

      <div className="scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded mt-4 grid max-h-[42vw] w-full grid-cols-3 gap-4 overflow-y-auto scroll-smooth">
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </div>
    </div>
  );
}
