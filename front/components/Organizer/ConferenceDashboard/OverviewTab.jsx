import StatusCard from './StatusCard';
import DateCard from './DateCard';
import StatCard from './StatCard';

const OverviewTab = ({ conference }) => {
  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <StatusCard
          title="Conference Status"
          badge="OPEN FOR SUBMISSION"
          badgeColor="green"
          subtitle="Submission deadline in 10 days"
        />
        <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
          <h3 className="text-sm font-medium text-text-secondary">Key Dates</h3>
          <div className="mt-4 space-y-3 md:space-y-4">
            <DateCard title="Submission Deadline" date={conference.submissionDeadline} />
            <DateCard title="Review Deadline" date={conference.reviewDeadline} />
            <DateCard title="Notification Deadline" date={conference.notificationDeadline} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold text-text-primary md:mb-4">At a Glance</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <StatCard title="Total Submissions" value={conference.totalSubmissions} />
          <StatCard title="Reviewers Accepted" value={conference.reviewersAccepted} />
          <StatCard title="Reviews Completed" value={conference.reviewsCompleted} />
        </div>
      </div>
    </div>
  );
};

export default OverviewTab;
