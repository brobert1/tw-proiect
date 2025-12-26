import { Search, Filter } from 'lucide-react';
import { Input } from '@components/Fields';

const ConferenceFilters = ({
  searchQuery,
  setSearchQuery,
  selectedTopic,
  setSelectedTopic,
  topics = [],
}) => {
  return (
    <div className="mb-2 space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm md:flex md:items-center md:gap-4 md:space-y-0 text-gray-900">
      <div className="flex-1">
        <label htmlFor="search" className="sr-only">
          Search conferences
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-gray-400" />
          </div>
          <Input
            id="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, acronym or location..."
            className="block w-full rounded-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm text-gray-900"
          />
        </div>
      </div>
      <div className="min-w-[200px]">
        <label htmlFor="topic-filter" className="sr-only">
          Filter by topic
        </label>
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Filter className="h-4 w-4 text-gray-400" />
          </div>
          <select
            id="topic-filter"
            value={selectedTopic}
            onChange={(e) => setSelectedTopic(e.target.value)}
            className="block w-full rounded-md border-gray-300 bg-white py-2 pl-10 pr-10 text-base focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm text-gray-900"
          >
            <option value="">All Topics</option>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ConferenceFilters;
