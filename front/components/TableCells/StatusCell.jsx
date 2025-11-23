import { classnames } from '@lib';

const StatusCell = ({ status }) => {
  const normalizedStatus = status?.toLowerCase();

  const styles = {
    pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    declined: 'bg-red-50 text-red-700 border-red-200',
    accepted: 'bg-green-50 text-green-700 border-green-200',
  };

  const statusStyle = styles[normalizedStatus] || 'bg-gray-50 text-gray-700 border-gray-200';

  return (
    <span
      className={classnames(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
        statusStyle
      )}
    >
      {status}
    </span>
  );
};

export default StatusCell;
