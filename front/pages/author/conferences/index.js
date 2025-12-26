import { useState } from 'react';
import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { ConferenceFilters, ConferencesGallery } from '@components/Author/Conferences';
import { useDebounce, useQuery } from '@hooks';

// Hardcoded list of topics for the filter dropdown
// In a production app, you might fetch this from the API
const ALL_TOPICS = [
  'Artificial Intelligence',
  'Machine Learning',
  'Deep Learning',
  'Web Development',
  'React',
  'JavaScript',
  'Frontend',
  'Cloud Computing',
  'DevOps',
  'Infrastructure',
  'AWS',
  'Cybersecurity',
  'Network Security',
  'Cryptography',
  'Data Science',
  'Big Data',
  'Analytics',
  'Visualization',
];

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTopic, setSelectedTopic] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, status } = useQuery('/author/conferences', {
    name: debouncedSearch,
    topic: selectedTopic,
  });

  return (
    <Layout title="Discover Conferences">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Discover Conferences</h1>
        <p className="mt-2 text-sm text-gray-600">
          Browse and find upcoming conferences to submit your research papers.
        </p>
      </div>
      <ConferenceFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTopic={selectedTopic}
        setSelectedTopic={setSelectedTopic}
        topics={ALL_TOPICS}
      />
      <ConferencesGallery data={data} status={status} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
