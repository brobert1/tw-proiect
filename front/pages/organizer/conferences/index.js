import { checkAuth, withAuth } from '@auth';
import { Button, Layout } from '@components';
import { ConferencesGallery } from '@components/Organizer/Conferences';
import { AddConferenceModal } from '@components/Modals';
import { Plus, Search } from 'lucide-react';
import { useState } from 'react';
import { useDisclosure, useDebounce, useQuery } from '@hooks';
import { Input } from '@components/Fields';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { isOpen, show, hide } = useDisclosure(false);

  const { data, status, refetch } = useQuery('/organizer/conferences', {
    name: debouncedSearch,
  });

  return (
    <Layout title="Conferences">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-text-primary">Conferences</h1>
          <p className="mt-1 text-sm text-text-secondary">
            Manage and monitor all your conferences
          </p>
        </div>
        <Button
          type="button"
          onClick={show}
          className="inline-flex items-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
        >
          <Plus className="h-4 w-4" />
          Add New Conference
        </Button>
      </div>
      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-text-secondary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conferences..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
      </div>
      <ConferencesGallery data={data} status={status} />
      <AddConferenceModal open={isOpen} onClose={hide} refetch={refetch} />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
