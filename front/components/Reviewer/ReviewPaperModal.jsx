import { submitReview } from '@api/reviewer';
import { useMutation } from '@hooks';
import { useState } from 'react';
import ModalHeader from './ReviewPaperModal/ModalHeader';
import PaperInfoSection from './ReviewPaperModal/PaperInfoSection';
import PdfPreviewSection from './ReviewPaperModal/PdfPreviewSection';
import ReviewFormSection from './ReviewPaperModal/ReviewFormSection';
import StatusAlerts from './ReviewPaperModal/StatusAlerts';

const ReviewPaperModal = ({ open, onClose, paper }) => {
  const [error, setError] = useState(null);

  const mutation = useMutation((data) => submitReview(paper?.assignment_id, data), {
    invalidateQueries: ['/reviewer/assigned-papers'],
    successCallback: () => {
      onClose();
    },
    errorCallback: (err) => {
      setError(err.response?.data?.message || 'Failed to submit review');
    },
  });

  const handleSubmit = async (data) => {
    setError(null);
    await mutation.mutateAsync(data);
  };

  if (!open || !paper) return null;

  const isDeadlinePassed = paper.review_deadline && new Date(paper.review_deadline) < new Date();
  const hasSubmitted = paper.has_submitted_review;
  const topics = typeof paper.topics === 'string' ? JSON.parse(paper.topics) : paper.topics || [];
  const pdfUrl = paper.file_url;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative z-10 flex max-h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-xl bg-white shadow-2xl">
        <ModalHeader
          paper={paper}
          isDeadlinePassed={isDeadlinePassed}
          hasSubmitted={hasSubmitted}
          onClose={onClose}
        />
        <div className="flex flex-1 min-h-0">
          <div className="grid flex-1 gap-6 p-6 lg:grid-cols-5">
            <div className="scrollbar-hide space-y-6 overflow-y-auto lg:col-span-2 max-h-[calc(90vh-120px)] pr-2">
              <PaperInfoSection paper={paper} topics={topics} />
              <StatusAlerts isDeadlinePassed={isDeadlinePassed} hasSubmitted={hasSubmitted} />
              {!isDeadlinePassed && (
                <ReviewFormSection
                  hasSubmitted={hasSubmitted}
                  isLoading={mutation.isPending}
                  error={error}
                  onSubmit={handleSubmit}
                  onClose={onClose}
                />
              )}
            </div>
            <PdfPreviewSection pdfUrl={pdfUrl} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewPaperModal;
