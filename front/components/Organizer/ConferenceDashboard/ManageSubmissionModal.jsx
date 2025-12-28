import AbstractSection from './ManageSubmissionModal/AbstractSection';
import AssignedReviewersSection from './ManageSubmissionModal/AssignedReviewersSection';
import FinalDecisionSection from './ManageSubmissionModal/FinalDecisionSection';
import ModalHeader from './ManageSubmissionModal/ModalHeader';
import SubmittedReviewsSection from './ManageSubmissionModal/SubmittedReviewsSection';

const ManageSubmissionModal = ({
  open,
  onClose,
  paper,
  conferenceId,
  submissionDeadline,
  reviewDeadline,
}) => {
  if (!open || !paper) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative z-10 my-8 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <ModalHeader paper={paper} onClose={onClose} />
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="space-y-4 md:space-y-6">
            <AbstractSection abstract={paper.abstract} fileUrl={paper.fileUrl} />
            <AssignedReviewersSection
              conferenceId={conferenceId}
              paperId={paper.id}
              submissionDeadline={submissionDeadline}
            />
            <SubmittedReviewsSection conferenceId={conferenceId} paperId={paper.id} />
            <FinalDecisionSection
              conferenceId={conferenceId}
              paperId={paper.id}
              paperStatus={paper.status}
              reviewDeadline={reviewDeadline}
              onClose={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageSubmissionModal;
