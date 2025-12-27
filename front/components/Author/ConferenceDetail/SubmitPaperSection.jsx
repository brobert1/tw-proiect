import { FileText, Send } from 'lucide-react';
import { Button } from '@components';

const SubmitPaperSection = ({ onOpenModal }) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-6">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-blue-50">
            <FileText className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Are you interested ?</h3>
            <p className="mt-1 text-sm text-gray-600">
              Upload your research paper and become a part of it.
            </p>
          </div>
        </div>
        <Button
          onClick={onOpenModal}
          className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
        >
          <Send className="h-4 w-4" />
          Participate
        </Button>
      </div>
    </div>
  );
};

export default SubmitPaperSection;
