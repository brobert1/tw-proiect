import { useRouter } from 'next/router';
import { Layout } from '@components';
import {
  DashboardLayout,
  OverviewTab,
  SettingsTab,
  ReviewersTab,
  SubmissionsTab,
} from '@components/Organizer/ConferenceDashboard';
import { checkAuth, withAuth } from '@auth';

const Page = () => {
  const router = useRouter();
  const { id } = router.query;

  // Hardcoded data for now
  const conference = {
    id: id,
    name: 'Future of Web Tech Summit',
    acronym: 'FWTS',
    description: '',
    location: 'Virtual',
    topics: ['AI', 'NLP', 'Web Assembly'],
    submissionDeadline: 'Nov 01, 2024',
    reviewDeadline: 'Nov 15, 2024',
    notificationDeadline: 'Dec 01, 2024',
    totalSubmissions: 128,
    reviewersAccepted: 22,
    reviewsCompleted: 0,
    status: 'upcoming',
  };

  return (
    <Layout title={conference.name}>
      <DashboardLayout conferenceTitle={conference.name}>
        {({ activeTab }) => {
          switch (activeTab) {
            case 'overview':
              return <OverviewTab conference={conference} />;
            case 'settings':
              return <SettingsTab conference={conference} />;
            case 'reviewers':
              return <ReviewersTab conference={conference} />;
            case 'submissions':
              return <SubmissionsTab conference={conference} />;
            default:
              return <OverviewTab conference={conference} />;
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
