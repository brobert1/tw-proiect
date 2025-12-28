import { Button } from '@components';
import { FileText, X } from 'lucide-react';

const STATUS_CONFIG = {
  submitted: { label: 'Submitted', color: 'text-blue-600', bg: 'bg-blue-50' },
  under_review: { label: 'Under Review', color: 'text-yellow-600', bg: 'bg-yellow-50' },
  awaiting_final: { label: 'Awaiting Final Version', color: 'text-orange-600', bg: 'bg-orange-50' },
  final_submitted: { label: 'Final Submitted', color: 'text-purple-600', bg: 'bg-purple-50' },
  accepted: { label: 'Accepted', color: 'text-green-600', bg: 'bg-green-50' },
  rejected: { label: 'Rejected', color: 'text-red-600', bg: 'bg-red-50' },
  revisions_required: { label: 'Revisions Required', color: 'text-orange-600', bg: 'bg-orange-50' },
};

const ModalHeader = ({ paper, onClose }) => {
  const config = STATUS_CONFIG[paper.status] || STATUS_CONFIG.submitted;

  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
          <FileText className="h-5 w-5 text-blue-600" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Paper Details</h2>
          <p className="text-sm text-gray-500">Version {paper.version || 1}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        <span
          className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-sm font-medium ${config.bg} ${config.color}`}
        >
          {config.label}
        </span>
        <Button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-200 transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default ModalHeader;
