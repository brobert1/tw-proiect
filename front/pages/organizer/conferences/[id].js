import { useRouter } from 'next/router';
import { Layout } from '@components';
import {
  DashboardLayout,
  OverviewTab,
  ReviewersTab,
  SettingsTab,
  SubmissionsTab,
} from '@components/Organizer/ConferenceDashboard';
import { checkAuth, withAuth } from '@auth';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <Layout title="Conference Dashboard">
      <DashboardLayout>
        {({ activeTab }) => {
          switch (activeTab) {
            case 'settings':
              return <SettingsTab conferenceId={id} />;
            case 'reviewers':
              return <ReviewersTab conferenceId={id} />;
            case 'submissions':
              return <SubmissionsTab />;
            default:
              return <OverviewTab conferenceId={id} />;
          }
        }}
      </DashboardLayout>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
