import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import AuthorSubmissionsTable from '@components/Author/AuthorSubmissionsTable';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, status } = useQuery('/author/submissions');

  return (
    <Layout title="My Submissions">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">My Submissions</h2>
          <p className="mt-1 text-sm text-gray-500">
            View all your paper submissions across conferences. Click &quot;View&quot; to see
            details and track the status of each submission.
          </p>
        </div>
        <div className="overflow-x-auto">
          <AuthorSubmissionsTable data={data} status={status} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
