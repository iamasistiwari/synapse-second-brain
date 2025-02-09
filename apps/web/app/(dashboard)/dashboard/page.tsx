import { getContents } from '@/actions/content';
import ContentCard from '@/components/ContentCard';
import DashboardNav from '@/components/DashboardNav';
import React from 'react';

export default async function page() {
  const contents = await getContents();
  if (!contents) {
    return <div>Bad request</div>;
  }
  return (
    <div className="h-full">
      <div className="px-5 pt-4 xl:px-8 xl:pt-8">
        <DashboardNav title="Dashboard" />
      </div>

      <div className="scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded mt-4 grid max-h-[73vh] w-full grid-cols-2 gap-4 overflow-y-auto scroll-smooth px-4 xl:max-h-[85vh] xl:grid-cols-3 xl:px-8">
        {contents.map((content, index) => (
          <ContentCard key={index} content={content} />
        ))}
      </div>
    </div>
  );
}
