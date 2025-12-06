import { Loading, QueryError } from '@components';
import { ExpertiseForm } from '@components/Forms';
import { ConferenceHeader, ConferenceInfo, ConferenceSidebar } from '.';

const ConferenceDashboard = ({ data, status, onSubmitExpertise, isSubmitting }) => {
  return (
    <>
      {status === 'error' && (
        <QueryError
          title="Failed to load conference"
          message="Unable to load conference details. Please try again."
        />
      )}
      {status === 'pending' && <Loading message="Loading conference details..." />}
      {status === 'success' && data && (
        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ConferenceHeader name={data.name} acronym={data.acronym} status={data.status} />
            <ConferenceInfo description={data.description} topics={data.topics} />
            <ExpertiseForm
              initialTopics={data.expertise_topics}
              onSubmit={onSubmitExpertise}
              isLoading={isSubmitting}
            />
          </div>
          <div>
            <ConferenceSidebar conference={data} />
          </div>
        </div>
      )}
    </>
  );
};

export default ConferenceDashboard;
