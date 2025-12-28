import { Button } from '@components';
import { classnames } from '@lib';
import { format } from 'date-fns';
import { CheckCircle, Clock, FileText, X } from 'lucide-react';

const ModalHeader = ({ paper, isDeadlinePassed, hasSubmitted, onClose }) => {
  return (
    <div className="flex items-center justify-between border-b border-gray-200 bg-gray-50 px-6 py-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Review Paper</h2>
          <p className="text-sm text-gray-500 line-clamp-1">{paper.title}</p>
        </div>
      </div>
      <div className="flex items-center gap-3">
        {paper.review_deadline && (
          <span
            className={classnames(
              'inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium',
              isDeadlinePassed ? 'bg-red-100 text-red-700' : 'bg-gray-100 text-gray-600'
            )}
          >
            <Clock className="h-3.5 w-3.5" />
            {isDeadlinePassed
              ? 'Deadline Passed'
              : `Due ${format(new Date(paper.review_deadline), 'MMM d, yyyy')}`}
          </span>
        )}
        {hasSubmitted && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
            <CheckCircle className="h-3.5 w-3.5" />
            Submitted
          </span>
        )}
        <Button onClick={onClose} className="rounded-lg p-2 hover:bg-gray-200 transition-colors">
          <X className="h-5 w-5 text-gray-500" />
        </Button>
      </div>
    </div>
  );
};

export default ModalHeader;
