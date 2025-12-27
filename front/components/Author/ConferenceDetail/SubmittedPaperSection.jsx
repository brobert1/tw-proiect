import { FileText, Clock, CheckCircle, AlertCircle, Eye } from 'lucide-react';
import { Button } from '@components';
import { formatDate } from '@functions';

const statusConfig = {
  submitted: {
    label: 'Submitted',
    icon: Clock,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
    border: 'border-blue-200',
  },
  under_review: {
    label: 'Under Review',
    icon: Clock,
    color: 'text-yellow-600',
    bg: 'bg-yellow-50',
    border: 'border-yellow-200',
  },
  accepted: {
    label: 'Accepted',
    icon: CheckCircle,
    color: 'text-green-600',
    bg: 'bg-green-50',
    border: 'border-green-200',
  },
  rejected: {
    label: 'Rejected',
    icon: AlertCircle,
    color: 'text-red-600',
    bg: 'bg-red-50',
    border: 'border-red-200',
  },
  revisions_required: {
    label: 'Revisions Required',
    icon: AlertCircle,
    color: 'text-orange-600',
    bg: 'bg-orange-50',
    border: 'border-orange-200',
  },
};

const SubmittedPaperSection = ({ paper, onViewDetails }) => {
  const config = statusConfig[paper.status] || statusConfig.submitted;
  const StatusIcon = config.icon;

  return (
    <div className={`rounded-lg border ${config.border} ${config.bg} p-6`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-4">
          <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${config.bg}`}>
            <FileText className={`h-6 w-6 ${config.color}`} />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{paper.title}</h3>
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${config.bg} ${config.color}`}
              >
                <StatusIcon className="h-3 w-3" />
                {config.label}
              </span>
            </div>
            <p className="mt-1 text-sm text-gray-600">
              Submitted on {formatDate(paper.created_at)}
            </p>
          </div>
        </div>
        <Button
          onClick={onViewDetails}
          className="inline-flex items-center gap-2 rounded-md bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <Eye className="h-4 w-4" />
          View Details
        </Button>
      </div>
    </div>
  );
};

export default SubmittedPaperSection;
