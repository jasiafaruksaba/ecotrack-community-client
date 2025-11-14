// client/src/components/SkeletonLoader.jsx
import React from 'react';

// Base Skeleton Structure (shimmer effect)
const SkeletonItem = ({ classes }) => (
  <div className={`${classes} bg-gray-200 animate-pulse rounded-lg`}></div>
);

const SkeletonLoader = ({ count = 4, type = 'card' }) => {
  
  if (type === 'card') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="border rounded-xl shadow-md p-0 overflow-hidden h-full">
            {/* Image placeholder (h-48) */}
            <SkeletonItem classes="w-full h-48" /> 
            <div className="p-4 space-y-3">
              {/* Category placeholder */}
              <SkeletonItem classes="w-1/3 h-4" /> 
              {/* Title placeholder */}
              <SkeletonItem classes="w-3/4 h-6" /> 
              {/* Description placeholder */}
              <SkeletonItem classes="h-3 w-full" />
              <SkeletonItem classes="h-3 w-5/6" />
              {/* Button placeholder */}
              <SkeletonItem classes="h-10 w-full mt-4" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'list') {
    return (
      <>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className="flex space-x-4 border-b pb-3 mb-3">
            <div className="flex-grow space-y-2">
              <SkeletonItem classes="w-full h-4" />
              <SkeletonItem classes="w-2/3 h-3" />
            </div>
          </div>
        ))}
      </>
    );
  }

  if (type === 'stat') {
    return (
        <div className="p-4 bg-white rounded shadow">
            <SkeletonItem classes="w-1/2 h-8 mx-auto mb-2" /> 
            <SkeletonItem classes="w-3/4 h-3 mx-auto" /> 
        </div>
    );
  }
  
  return null;
};

export default SkeletonLoader;