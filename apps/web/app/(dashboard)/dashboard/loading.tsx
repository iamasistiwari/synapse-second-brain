import React from 'react';

export default function Loading() {
  return (
    <div>
      <div className='flex justify-between px-5 h-20 items-center'>
        <div className="h-11 w-44 bg-neutral-800 animate-pulse rounded-xl"></div>
        <div className="h-11 w-11 lg:w-96 bg-neutral-800 animate-pulse rounded-xl"></div>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 px-4 gap-4'>
        {new Array(6).fill(0).map((_, i) => (
          <div key={i} className="my-2 h-64 lg:h-80 rounded-xl w-full  bg-neutral-800 animate-pulse"></div>
        ))}
      </div>
    </div>
  );
}
