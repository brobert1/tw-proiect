import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { ReviewerConferencesTable } from '@components/Reviewer';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, status } = useQuery('reviewer/conferences');

  return (
    <Layout title="My Conferences">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">My Conferences</h2>
          <p className="mt-1 text-sm text-gray-500">
            Conferences where you are registered as a reviewer.
          </p>
        </div>
        <div className="overflow-x-auto">
          <ReviewerConferencesTable data={data} status={status} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
