import { checkAuth, withAuth } from '@auth';
import { Layout, Loading, QueryError } from '@components';
import {
  PaperStatusOverview,
  PapersNeedingAction,
  RecentConferences,
  StatCard,
} from '@components/Organizer/Dashboard';
import { useQuery } from '@hooks';
import { Calendar, FileText, TrendingUp, Users } from 'lucide-react';

const Page = () => {
  const { data, status } = useQuery('/organizer/dashboard');

  if (status === 'pending') {
    return (
      <Layout title="Organizer Dashboard">
        <Loading message="Loading dashboard..." />
      </Layout>
    );
  }
  if (status === 'error') {
    return (
      <Layout title="Organizer Dashboard">
        <QueryError title="Failed to load dashboard" message="Please try again later." />
      </Layout>
    );
  }

  const { stats, recentConferences, papersNeedingAction } = data || {};
  return (
    <Layout title="Organizer Dashboard">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here&apos;s an overview of your conferences.
          </p>
        </div>
      </div>
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Conferences"
          value={stats?.totalConferences || 0}
          icon={Calendar}
          color="bg-blue-500"
          subtext={`${stats?.activeConferences || 0} active`}
        />
        <StatCard
          title="Total Papers"
          value={stats?.totalPapers || 0}
          icon={FileText}
          color="bg-purple-500"
          subtext={`${stats?.papersByStatus?.accepted || 0} accepted`}
        />
        <StatCard
          title="Reviewers"
          value={stats?.totalReviewers || 0}
          icon={Users}
          color="bg-green-500"
          subtext={`${stats?.pendingInvitations || 0} pending invites`}
        />
        <StatCard
          title="Total Reviews"
          value={stats?.totalReviews || 0}
          icon={TrendingUp}
          color="bg-orange-500"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <RecentConferences conferences={recentConferences} />
        <PapersNeedingAction papers={papersNeedingAction} />
      </div>
      <div className="mt-8">
        <PaperStatusOverview papersByStatus={stats?.papersByStatus} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
