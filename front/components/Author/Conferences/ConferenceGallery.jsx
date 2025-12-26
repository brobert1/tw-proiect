import { isEmpty } from 'lodash';
import ConferenceCard from './ConferenceCard';
import ConferenceCardSkeleton from './ConferenceCardSkeleton';
import { Ghost } from 'lucide-react';

const ConferencesGallery = ({ data, status }) => {
  // Error state
  if (status === 'error') {
    return (
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ConferenceCardSkeleton type="error" />
        <ConferenceCardSkeleton type="error" />
        <ConferenceCardSkeleton type="error" />
      </div>
    );
  }

  // Loading state
  if (status === 'pending') {
    return (
      <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        <ConferenceCardSkeleton type="loading" />
        <ConferenceCardSkeleton type="loading" />
        <ConferenceCardSkeleton type="loading" />
      </div>
    );
  }

  // Empty state
  if (isEmpty(data)) {
    return (
      <div className="mt-4 flex flex-col items-center justify-center rounded-lg border border-dashed border-gray-300 bg-gray-50 p-12 text-center">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-100">
          <Ghost className="h-6 w-6 text-gray-400" />
        </div>
        <h3 className="mt-4 text-lg font-medium text-gray-900">No conferences found</h3>
        <p className="mt-2 text-sm text-gray-500">
          We couldn't find any conferences matching your criteria. Try adjusting your filters.
        </p>
      </div>
    );
  }

  // Success state
  return (
    <div className="mt-2 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {data.map((conference) => (
        <ConferenceCard key={conference.id} conference={conference} />
      ))}
    </div>
  );
};

export default ConferencesGallery;
