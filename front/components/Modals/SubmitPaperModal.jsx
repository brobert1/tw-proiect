import { X } from 'lucide-react';
import { Button } from '@components';
import SubmitPaperForm from '@components/Forms/SubmitPaperForm';

const SubmitPaperModal = ({ open, onClose, conferenceTopics = [], onSubmit, isSubmitting }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-2xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">Submit Your Paper</h2>
          <Button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <SubmitPaperForm
          conferenceTopics={conferenceTopics}
          onSubmit={onSubmit}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default SubmitPaperModal;
