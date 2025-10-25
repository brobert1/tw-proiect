import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';

const Page = () => {
  return (
    <Layout title="Reviewer Dashboard">
      <div className="prose max-w-full">
        <h2 className="mb-4 font-semibold">Reviewer Dashboard</h2>
        <p>Welcome to the Reviewer dashboard.</p>
        <p>Here you can view your assigned papers, accept or decline review requests, and submit your reviews.</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
