import { toaster } from '@lib';
import { useEffect } from 'react';

const ConferenceCardSkeleton = ({ type = 'loading' }) => {
  useEffect(() => {
    if (type === 'error') {
      toaster.error('Error! Unable to load conferences');
    }
  }, [type]);

  const boneClass = type === 'loading' ? 'animate-pulse bg-gray-200' : 'bg-red-200';

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-3xl border border-gray-200 bg-white p-8">
      <div className="mb-6 flex items-center justify-between">
        <div className={`h-6 w-20 rounded-full ${boneClass}`}></div>
        <div className={`h-4 w-24 rounded ${boneClass}`}></div>
      </div>
      <div className={`mb-4 h-7 w-3/4 rounded ${boneClass}`}></div>
      <div className={`mb-6 h-4 w-1/2 rounded ${boneClass}`}></div>
      <div className={`mb-8 h-4 w-1/3 rounded ${boneClass}`}></div>
      <div className="mt-auto flex items-center justify-between border-t border-gray-100 pt-6">
        <div className="flex flex-col gap-2">
          <div className={`h-3 w-20 rounded ${boneClass}`}></div>
          <div className="flex gap-1">
            <div className={`h-5 w-16 rounded-full ${boneClass}`}></div>
            <div className={`h-5 w-14 rounded-full ${boneClass}`}></div>
          </div>
        </div>
        <div className={`h-10 w-10 rounded-full ${boneClass}`}></div>
      </div>
    </div>
  );
};

export default ConferenceCardSkeleton;
