import { getTweets } from '@/actions/content';
import ContentCard from '@/components/ContentCard';
import DashboardNav from '@/components/DashboardNav';
import React from 'react';

export default async function page() {
  const contents = await getTweets();
  if (!contents) {
    return <div>Bad request</div>;
  }
  return (
    <div className="h-full">
      <div className="border-custom relative rounded-bl-lg rounded-br-lg border-b px-5 pt-4 xl:px-8 xl:pt-8">
        <DashboardNav title="Tweets" />
      </div>

      <div className="scrollbar-w-2 scrollbar-track-blue-lighter scrollbar-thumb-blue scrollbar-thumb-rounded mt-4 grid h-[85dvh] w-full grid-cols-1 gap-4 overflow-y-auto scroll-smooth px-4 pb-10 xl:max-h-[85vh] xl:grid-cols-3 xl:px-8">
        {contents.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
