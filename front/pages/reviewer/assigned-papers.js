import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { AssignedPapersTable } from '@components/Reviewer';
import { useQuery } from '@hooks';

const Page = () => {
  const { data, status } = useQuery('reviewer/assigned-papers');

  return (
    <Layout title="Assigned Papers">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">My Assigned Papers</h2>
          <p className="mt-1 text-sm text-gray-500">
            Papers assigned to you for review. Click &quot;Review&quot; to view details and submit
            your review.
          </p>
        </div>
        <div className="overflow-x-auto">
          <AssignedPapersTable data={data} status={status} />
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
