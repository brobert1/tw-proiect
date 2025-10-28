import { toaster } from '@lib';
import { useEffect } from 'react';

const ConferenceCardSkeleton = ({ type = 'loading' }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load conferences');
    }
  }, [type]);

  const boneClass = type === 'loading' ? 'animate-pulse bg-gray-300' : 'bg-red-300';

  return (
    <div className="flex flex-col rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <div className={`mb-2 inline-block h-6 w-16 rounded-md ${boneClass}`}></div>
        <div className={`h-6 w-3/4 rounded ${boneClass}`}></div>
        <div className="mt-2 space-y-2">
          <div className={`h-4 w-full rounded ${boneClass}`}></div>
          <div className={`h-4 w-5/6 rounded ${boneClass}`}></div>
        </div>
      </div>
      <div className="mb-6 flex flex-col gap-2">
        <div className="flex items-center gap-2">
          <div className={`h-3 w-20 rounded ${boneClass}`}></div>
          <div className={`h-3 w-32 rounded ${boneClass}`}></div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-4 w-4 rounded ${boneClass}`}></div>
          <div className={`h-3 w-28 rounded ${boneClass}`}></div>
          <div className={`h-3 w-24 rounded ${boneClass}`}></div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-20 rounded ${boneClass}`}></div>
          <div className={`h-3 w-24 rounded ${boneClass}`}></div>
        </div>
        <div className="flex items-center gap-2">
          <div className={`h-3 w-16 rounded ${boneClass}`}></div>
          <div className={`h-3 w-24 rounded ${boneClass}`}></div>
        </div>
        <div className="mt-2 flex flex-wrap gap-1">
          <div className={`h-6 w-16 rounded-md ${boneClass}`}></div>
          <div className={`h-6 w-20 rounded-md ${boneClass}`}></div>
          <div className={`h-6 w-14 rounded-md ${boneClass}`}></div>
        </div>
      </div>
      <div className={`h-10 w-full rounded-md ${boneClass}`}></div>
    </div>
  );
};

export default ConferenceCardSkeleton;
