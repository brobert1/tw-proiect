import React from 'react';
import { formatDate, getConferenceStatus } from '@functions';
import StatusCard from './StatusCard';
import DateCard from './DateCard';
import StatCard from './StatCard';

const ConferenceOverview = ({ conference }) => {
  const statusInfo = getConferenceStatus(conference);

  return (
    <div className="space-y-4 md:space-y-6">
      <div className="grid grid-cols-1 gap-4 md:gap-6 lg:grid-cols-2">
        <StatusCard
          title="Conference Status"
          badge={statusInfo.badge}
          badgeColor={statusInfo.badgeColor}
          subtitle={statusInfo.subtitle}
        />
        <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
          <h3 className="text-sm font-medium text-text-secondary">Key Dates</h3>
          <div className="mt-4 space-y-3 md:space-y-4">
            <DateCard
              title="Submission Deadline"
              date={formatDate(conference.submission_deadline)}
            />
            <DateCard title="Review Deadline" date={formatDate(conference.review_deadline)} />
            <DateCard title="Conference Date" date={formatDate(conference.conference_date)} />
          </div>
        </div>
      </div>
      <div>
        <h2 className="mb-3 text-lg font-semibold text-text-primary md:mb-4">At a Glance</h2>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-6">
          <StatCard title="Total Submissions" value={conference.stats?.totalSubmissions ?? 0} />
          <StatCard title="Reviewers Accepted" value={conference.stats?.reviewersAccepted ?? 0} />
          <StatCard title="Reviews Completed" value={conference.stats?.reviewsCompleted ?? 0} />
        </div>
      </div>
    </div>
  );
};

export default ConferenceOverview;
