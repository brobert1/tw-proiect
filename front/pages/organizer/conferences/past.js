import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { ConferencesGallery } from '@components/Organizer/Conferences';
import { ArrowLeft, Search } from 'lucide-react';
import { useState } from 'react';
import { useDebounce, useQuery } from '@hooks';
import { Input } from '@components/Fields';
import Link from 'next/link';

const Page = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);

  const { data, status } = useQuery('/organizer/conferences', {
    name: debouncedSearch,
    status: 'completed',
  });

  return (
    <Layout title="Past Conferences">
      <div className="flex items-start justify-between">
        <div>
          <div className="mb-2">
            <Link
              href="/organizer/conferences"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Active Conferences
            </Link>
          </div>
          <h1 className="text-3xl font-bold text-text-primary">Past Conferences</h1>
          <p className="mt-1 text-sm text-text-secondary">
            View your completed conferences and their archives
          </p>
        </div>
      </div>
      <div className="mt-6 w-full max-w-md">
        <div className="flex items-center gap-2 rounded-md border border-gray-200 bg-white px-3 py-2">
          <Search className="h-4 w-4 text-text-secondary" />
          <Input
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search past conferences..."
            className="w-full bg-transparent text-sm text-text-primary placeholder:text-text-secondary focus:outline-none"
          />
        </div>
      </div>
      <ConferencesGallery data={data} status={status} emptyMessage="No past conferences found." />
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
