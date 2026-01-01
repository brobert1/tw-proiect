import { checkAuth, withAuth } from '@auth';
import { Layout, Loading, QueryError } from '@components';
import { StatCard } from '@components/Organizer/Dashboard';
import { PapersPendingReview, RecentReviews } from '@components/Reviewer/Dashboard';
import { useQuery } from '@hooks';
import { BookOpen, CheckCircle, Clock, FileText } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const { data, status } = useQuery('/reviewer/dashboard');

  if (status === 'pending') {
    return (
      <Layout title="Reviewer Dashboard">
        <Loading message="Loading dashboard..." />
      </Layout>
    );
  }
  if (status === 'error') {
    return (
      <Layout title="Reviewer Dashboard">
        <QueryError title="Failed to load dashboard" message="Please try again later." />
      </Layout>
    );
  }

  const { stats, papersPendingReview, recentReviews } = data || {};

  return (
    <Layout title="Reviewer Dashboard">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here&apos;s an overview of your review activities.
          </p>
        </div>
        <Link
          href="/reviewer/assigned-papers"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <FileText className="h-4 w-4" />
          View All Papers
        </Link>
      </div>
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Conferences"
          value={stats?.totalConferences || 0}
          icon={BookOpen}
          color="bg-blue-500"
          subtext={`${stats?.activeConferences || 0} active`}
        />
        <StatCard
          title="Assigned Papers"
          value={stats?.totalAssignedPapers || 0}
          icon={FileText}
          color="bg-purple-500"
        />
        <StatCard
          title="Pending Reviews"
          value={stats?.pendingReviews || 0}
          icon={Clock}
          color="bg-orange-500"
        />
        <StatCard
          title="Completed Reviews"
          value={stats?.completedReviews || 0}
          icon={CheckCircle}
          color="bg-green-500"
        />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <PapersPendingReview papers={papersPendingReview} />
        <RecentReviews reviews={recentReviews} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
