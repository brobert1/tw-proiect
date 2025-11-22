import { useQuery } from '@hooks';
import { QueryError } from '@components';
import ConferenceOverview from './ConferenceOverview';
import OverviewSkeleton from './OverviewSkeleton';

const OverviewTab = ({ conferenceId }) => {
  const { data: conference, status } = useQuery(`organizer/conferences/${conferenceId}/overview`);

  return (
    <>
      {status === 'error' && <QueryError error={status.error} title="Error Loading Overview" />}
      {status === 'pending' && <OverviewSkeleton message="Loading overview..." />}
      {status === 'success' && <ConferenceOverview conference={conference} />}
    </>
  );
};

export default OverviewTab;
