import { X } from 'lucide-react';
import { Button } from '@components';
import { AddConferenceForm } from '@components/Forms';

const AddConferenceModal = ({ open, onClose, refetch }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative z-10 w-full max-w-xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-text-primary">Add New Conference</h2>
          <Button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <AddConferenceForm refetch={refetch} hide={onClose} />
      </div>
    </div>
  );
};

export default AddConferenceModal;
