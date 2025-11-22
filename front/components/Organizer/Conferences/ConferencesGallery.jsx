import { isEmpty } from 'lodash';
import ConferenceCard from './ConferenceCard';
import ConferenceCardSkeleton from './ConferenceCardSkeleton';

const ConferencesGallery = ({ data, status }) => {
  return (
    <>
      {status === 'error' && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ConferenceCardSkeleton type="error" />
          <ConferenceCardSkeleton type="error" />
          <ConferenceCardSkeleton type="error" />
        </div>
      )}
      {status === 'pending' && (
        <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <ConferenceCardSkeleton type="loading" />
          <ConferenceCardSkeleton type="loading" />
          <ConferenceCardSkeleton type="loading" />
        </div>
      )}
      {status === 'success' &&
        (isEmpty(data) ? (
          <div className="mt-6 rounded-lg border border-gray-200 bg-white p-12 text-center">
            <p className="text-lg font-medium text-text-secondary">No conferences yet</p>
            <p className="mt-2 text-sm text-text-secondary">
              Click "Add New Conference" to create your first conference
            </p>
          </div>
        ) : (
          <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((conference) => (
              <ConferenceCard key={conference.id} conference={conference} />
            ))}
          </div>
        ))}
    </>
  );
};

export default ConferencesGallery;
