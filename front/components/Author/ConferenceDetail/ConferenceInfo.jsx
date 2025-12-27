import { Tag } from 'lucide-react';

const ConferenceInfo = ({ description, topics }) => {
  return (
    <>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">About</h2>
        <p className="text-gray-600">{description || 'No description available.'}</p>
      </div>
      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h2 className="mb-4 text-lg font-semibold text-gray-900">Conference Topics</h2>
        {topics && topics.length > 0 ? (
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm text-gray-700"
              >
                <Tag className="h-3 w-3" />
                {topic}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No topics defined for this conference.</p>
        )}
      </div>
    </>
  );
};

export default ConferenceInfo;
