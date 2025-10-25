import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';

const Page = () => {
  return (
    <Layout title="Author Dashboard">
      <div className="prose max-w-full">
        <h2 className="mb-4 font-semibold">Author Dashboard</h2>
        <p>Welcome to the Author dashboard.</p>
        <p>Here you can discover conferences, submit papers, track your submissions, and upload revisions.</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
