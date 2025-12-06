import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';
import { useRouter } from 'next/router';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Conference Details">
      <div className="rounded-lg border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Conference Details</h2>
          <p className="mt-1 text-sm text-gray-500">
            View conference information and manage your expertise topics.
          </p>
        </div>
        <div className="p-6">
          <p className="text-sm text-gray-600">
            Conference ID: <span className="font-mono text-gray-900">{id}</span>
          </p>
          <p className="mt-4 text-sm text-gray-500">
            This page is under construction. You will be able to view conference details and set your expertise topics here.
          </p>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
