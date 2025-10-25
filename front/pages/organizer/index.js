import { checkAuth, withAuth } from '@auth';
import { Layout } from '@components';

const Page = () => {
  return (
    <Layout title="Organizer Dashboard">
      <div className="prose max-w-full">
        <h2 className="mb-4 font-semibold">Organizer Dashboard</h2>
        <p>Welcome to the Conference Organizer dashboard.</p>
        <p>Here you can create and manage conferences, invite reviewers, and make final decisions on paper submissions.</p>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
