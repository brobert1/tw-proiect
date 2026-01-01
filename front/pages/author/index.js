import { checkAuth, withAuth } from '@auth';
import { Layout, Loading, QueryError } from '@components';
import { AvailableConferences, SubmissionsNeedingAction } from '@components/Author/Dashboard';
import { StatCard } from '@components/Organizer/Dashboard';
import { useQuery } from '@hooks';
import { CheckCircle, Clock, FileText, XCircle } from 'lucide-react';
import Link from 'next/link';

const Page = () => {
  const { data, status } = useQuery('/author/dashboard');

  if (status === 'pending') {
    return (
      <Layout title="Author Dashboard">
        <Loading message="Loading dashboard..." />
      </Layout>
    );
  }
  if (status === 'error') {
    return (
      <Layout title="Author Dashboard">
        <QueryError title="Failed to load dashboard" message="Please try again later." />
      </Layout>
    );
  }

  const { stats, submissionsNeedingAction, availableConferences } = data || {};

  return (
    <Layout title="Author Dashboard">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="mt-1 text-gray-500">
            Welcome back! Here&apos;s an overview of your submissions.
          </p>
        </div>
        <Link
          href="/author/conferences"
          className="inline-flex items-center gap-2 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white hover:bg-gray-800"
        >
          <FileText className="h-4 w-4" />
          Discover Conferences
        </Link>
      </div>
      <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total Submissions"
          value={stats?.totalSubmissions || 0}
          icon={FileText}
          color="bg-blue-500"
        />
        <StatCard
          title="Pending Review"
          value={stats?.pendingReview || 0}
          icon={Clock}
          color="bg-yellow-500"
        />
        <StatCard
          title="Accepted"
          value={stats?.accepted || 0}
          icon={CheckCircle}
          color="bg-green-500"
        />
        <StatCard title="Rejected" value={stats?.rejected || 0} icon={XCircle} color="bg-red-500" />
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <SubmissionsNeedingAction submissions={submissionsNeedingAction} />
        <AvailableConferences conferences={availableConferences} />
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  return await checkAuth(context);
}

export default withAuth(Page);
