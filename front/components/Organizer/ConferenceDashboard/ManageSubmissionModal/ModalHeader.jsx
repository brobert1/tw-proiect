import { X } from 'lucide-react';
import { Button } from '@components';
import classNames from '@lib/classnames';

const getStatusConfig = (status) => {
  const configs = {
    submitted: {
      className: 'bg-gray-50 text-gray-700 border-gray-200',
      text: 'SUBMITTED',
    },
    under_review: {
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      text: 'UNDER REVIEW',
    },
    revisions_required: {
      className: 'bg-orange-50 text-orange-700 border-orange-200',
      text: 'REVISIONS REQUIRED',
    },
    accepted: {
      className: 'bg-green-50 text-green-700 border-green-200',
      text: 'ACCEPTED',
    },
    rejected: {
      className: 'bg-red-50 text-red-700 border-red-200',
      text: 'REJECTED',
    },
    withdrawn: {
      className: 'bg-slate-50 text-slate-700 border-slate-200',
      text: 'WITHDRAWN',
    },
  };

  return configs[status] || configs.submitted;
};

const ModalHeader = ({ paper, onClose }) => {
  const statusConfig = getStatusConfig(paper.status);

  return (
    <div className="flex items-start justify-between border-b border-gray-200 px-4 py-4 md:px-6">
      <div className="flex-1 pr-2 md:pr-4">
        <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
          <h2 className="text-lg font-semibold text-text-primary md:text-xl">{paper.title}</h2>
          <span
            className={classNames(
              'inline-flex w-fit items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
              statusConfig.className
            )}
          >
            {statusConfig.text}
          </span>
        </div>
        <p className="text-sm text-text-secondary">
          {paper.mainAuthor}
          {paper.coAuthors && paper.coAuthors.length > 0 && (
            <span> • {paper.coAuthors.map((author) => author.name).join(', ')}</span>
          )}
        </p>
      </div>
      <Button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
        <X className="h-5 w-5 text-gray-500" />
      </Button>
    </div>
  );
};

export default ModalHeader;
