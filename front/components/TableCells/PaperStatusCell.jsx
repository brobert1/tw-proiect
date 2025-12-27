import { classnames } from '@lib';

const PaperStatusCell = ({ status }) => {
  const styles = {
    submitted: 'bg-gray-50 text-gray-700 border-gray-200',
    under_review: 'bg-blue-50 text-blue-700 border-blue-200',
    revisions_required: 'bg-orange-50 text-orange-700 border-orange-200',
    accepted: 'bg-green-50 text-green-700 border-green-200',
    rejected: 'bg-red-50 text-red-700 border-red-200',
    withdrawn: 'bg-slate-50 text-slate-700 border-slate-200',
  };

  const displayText = {
    submitted: 'Submitted',
    under_review: 'Under Review',
    revisions_required: 'Revisions Required',
    accepted: 'Accepted',
    rejected: 'Rejected',
    withdrawn: 'Withdrawn',
  };

  const statusStyle = styles[status] || styles.submitted;
  const text = displayText[status] || status;

  return (
    <span
      className={classnames(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
        statusStyle
      )}
    >
      {text}
    </span>
  );
};

export default PaperStatusCell;
