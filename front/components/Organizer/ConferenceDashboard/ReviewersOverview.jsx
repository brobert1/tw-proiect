import { InviteReviewer } from '.';
import AcceptedReviewersTable from './AcceptedReviewersTable';
import PendingReviewersTable from './PendingReviewersTable';

const ReviewersOverview = ({ data, conferenceId, status, refetch }) => {
  return (
    <div className="space-y-6">
      <InviteReviewer conferenceId={conferenceId} refetch={refetch} />
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Pending & Declined Invitations
        </h3>
        <PendingReviewersTable data={data?.pendingOrRejected} status={status} refetch={refetch} />
      </div>
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <h3 className="mb-4 text-base font-semibold text-text-primary md:mb-6">
          Accepted Reviewers (Program Committee)
        </h3>
        <AcceptedReviewersTable data={data?.accepted} status={status} />
      </div>
    </div>
  );
};

export default ReviewersOverview;
