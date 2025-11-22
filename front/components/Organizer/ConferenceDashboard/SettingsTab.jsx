import { useQuery } from '@hooks';
import { Loading, QueryError } from '@components';
import EditConferenceForm from '@components/Forms/EditConferenceForm';

const SettingsTab = ({ conferenceId }) => {
  const { data: conference, status, refetch } = useQuery(`organizer/conferences/${conferenceId}`);

  return (
    <>
      {status === 'error' && <QueryError error={status.error} title="Error Loading Overview" />}
      {status === 'pending' && <Loading />}
      {status === 'success' && <EditConferenceForm conference={conference} refetch={refetch} />}
    </>
  );
};

export default SettingsTab;
