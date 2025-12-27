import { useState } from 'react';
import { Loading, QueryError } from '@components';
import { SubmitPaperModal, PaperDetailsModal } from '@components/Modals';
import {
  ConferenceHeader,
  ConferenceInfo,
  ConferenceSidebar,
  SubmitPaperSection,
  SubmittedPaperSection,
} from '.';

const ConferenceDashboard = ({ data, status, onSubmitPaper, isSubmitting }) => {
  const [isSubmitModalOpen, setIsSubmitModalOpen] = useState(false);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);

  const handleSubmit = async (formData) => {
    if (onSubmitPaper) {
      await onSubmitPaper(formData);
      setIsSubmitModalOpen(false);
    }
  };

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
            {data.paper ? (
              <SubmittedPaperSection
                paper={data.paper}
                onViewDetails={() => setIsDetailsModalOpen(true)}
              />
            ) : (
              <SubmitPaperSection onOpenModal={() => setIsSubmitModalOpen(true)} />
            )}
          </div>
          <div>
            <ConferenceSidebar conference={data} />
          </div>
        </div>
      )}
      <SubmitPaperModal
        open={isSubmitModalOpen}
        onClose={() => setIsSubmitModalOpen(false)}
        conferenceTopics={data?.topics || []}
        onSubmit={handleSubmit}
        isSubmitting={isSubmitting}
      />
      <PaperDetailsModal
        open={isDetailsModalOpen}
        onClose={() => setIsDetailsModalOpen(false)}
        paper={data?.paper}
      />
    </>
  );
};

export default ConferenceDashboard;
