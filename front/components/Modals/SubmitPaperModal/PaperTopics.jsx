import { useFormContext } from 'react-hook-form';
import { Tag, Check } from 'lucide-react';
import { classnames } from '@lib';

const PaperTopics = ({ conferenceTopics = [] }) => {
  const {
    watch,
    setValue,
    formState: { errors },
  } = useFormContext();
  const selectedTopics = watch('topics') || [];

  const toggleTopic = (topic) => {
    if (selectedTopics.includes(topic)) {
      setValue(
        'topics',
        selectedTopics.filter((t) => t !== topic)
      );
    } else {
      setValue('topics', [...selectedTopics, topic]);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900">Select Topics</h3>
        <p className="mt-1 text-sm text-gray-500">
          Choose the topics that best match your paper. This helps us assign appropriate reviewers.
        </p>
      </div>
      {errors.topics && <p className="text-sm text-red-600">{errors.topics.message}</p>}
      <div className="flex flex-wrap gap-3">
        {conferenceTopics.map((topic) => {
          const isSelected = selectedTopics.includes(topic);
          return (
            <button
              key={topic}
              type="button"
              onClick={() => toggleTopic(topic)}
              className={classnames(
                'inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-all',
                isSelected
                  ? 'bg-blue-600 text-white ring-2 ring-blue-600 ring-offset-2'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              )}
            >
              {isSelected ? <Check className="h-4 w-4" /> : <Tag className="h-4 w-4" />}
              {topic}
            </button>
          );
        })}
      </div>
      {conferenceTopics.length === 0 && (
        <div className="rounded-lg border border-dashed border-gray-300 bg-gray-50 p-8 text-center">
          <Tag className="mx-auto h-8 w-8 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500">No topics defined for this conference.</p>
        </div>
      )}
      {selectedTopics.length > 0 && (
        <div className="mt-4 rounded-lg bg-blue-50 p-4">
          <p className="text-sm font-medium text-blue-800">
            Selected: {selectedTopics.length} topic{selectedTopics.length > 1 ? 's' : ''}
          </p>
        </div>
      )}
    </div>
  );
};

export default PaperTopics;
