import { Loading, QueryError } from '@components';
import { useQuery } from '@hooks';
import { ReviewersOverview } from '.';

const ReviewersTab = ({ conferenceId }) => {
  const { data, status, refetch } = useQuery(`organizer/conferences/${conferenceId}/reviewers`);

  return (
    <>
      {status === 'error' && <QueryError error={status.error} title="Error Loading Reviewers" />}
      {status === 'pending' && <Loading message="Loading reviewers..." />}
      {status === 'success' && (
        <ReviewersOverview
          data={data}
          conferenceId={conferenceId}
          status={status}
          refetch={refetch}
        />
      )}
    </>
  );
};

export default ReviewersTab;
