import { X } from 'lucide-react';
import { useState } from 'react';

const SettingsTab = ({ conference }) => {
  const [topics, setTopics] = useState(conference.topics || []);
  const [topicInput, setTopicInput] = useState('');

  const removeTopic = (indexToRemove) => {
    setTopics(topics.filter((_, index) => index !== indexToRemove));
  };

  const addTopic = (e) => {
    if (e.key === 'Enter' && topicInput.trim()) {
      e.preventDefault();
      if (!topics.includes(topicInput.trim())) {
        setTopics([...topics, topicInput.trim()]);
      }
      setTopicInput('');
    }
  };

  return (
    <div className="space-y-6 md:space-y-8">
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Edit Conference Details
        </h3>
        <div className="space-y-4 md:space-y-6">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <label htmlFor="name" className="block text-sm font-medium text-text-primary">
                Conference Name
              </label>
              <input
                type="text"
                id="name"
                defaultValue={conference.name}
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label htmlFor="acronym" className="block text-sm font-medium text-text-primary">
                Acronym
              </label>
              <input
                type="text"
                id="acronym"
                defaultValue={conference.acronym}
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-text-primary">
              Description
            </label>
            <textarea
              id="description"
              rows={4}
              defaultValue={conference.description}
              placeholder="Enter conference description..."
              className="form-textarea mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-text-primary">
              Location
            </label>
            <input
              type="text"
              id="location"
              defaultValue={conference.location}
              className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div>
            <label htmlFor="topics" className="block text-sm font-medium text-text-primary">
              Topics
            </label>
            <div className="mt-2 flex flex-wrap gap-2">
              {topics.map((topic, index) => (
                <span
                  key={index}
                  className="inline-flex items-center gap-1 rounded-md border border-border-primary bg-gray-50 px-3 py-1 text-sm text-text-primary"
                >
                  {topic}
                  <button
                    type="button"
                    onClick={() => removeTopic(index)}
                    className="ml-1 text-text-tertiary hover:text-text-primary"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <input
              type="text"
              id="topics"
              value={topicInput}
              onChange={(e) => setTopicInput(e.target.value)}
              onKeyDown={addTopic}
              placeholder="Type topic and press enter..."
              className="form-input mt-3 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
            />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="submissionDeadline"
                className="block text-sm font-medium text-text-primary"
              >
                Submission Deadline
              </label>
              <input
                type="date"
                id="submissionDeadline"
                defaultValue="2024-11-01"
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="reviewDeadline"
                className="block text-sm font-medium text-text-primary"
              >
                Review Deadline
              </label>
              <input
                type="date"
                id="reviewDeadline"
                defaultValue="2024-11-15"
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="notificationDeadline"
                className="block text-sm font-medium text-text-primary"
              >
                Notification Deadline
              </label>
              <input
                type="date"
                id="notificationDeadline"
                defaultValue="2024-12-01"
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
            <div>
              <label
                htmlFor="finalVersionDeadline"
                className="block text-sm font-medium text-text-primary"
              >
                Final Version Deadline
              </label>
              <input
                type="date"
                id="finalVersionDeadline"
                className="form-input mt-2 block w-full rounded-md border border-border-primary px-3 py-2 text-sm shadow-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900"
              />
            </div>
          </div>
          <div>
            <button
              type="button"
              className="rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <div className="rounded-lg border border-red-200 bg-white p-4 md:p-6">
        <h3 className="mb-2 text-base font-semibold text-red-600">Danger Zone</h3>
        <button
          type="button"
          className="mt-4 w-full rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2 md:w-auto"
        >
          Delete this Conference
        </button>
      </div>
    </div>
  );
};

export default SettingsTab;
