import classNames from '@lib/classnames';

const ReviewStatusCell = ({ hasSubmitted }) => {
  return (
    <span
      className={classNames(
        'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
        hasSubmitted
          ? 'border-green-200 bg-green-50 text-green-700'
          : 'border-yellow-200 bg-yellow-50 text-yellow-700'
      )}
    >
      {hasSubmitted ? 'Submitted' : 'Pending'}
    </span>
  );
};

export default ReviewStatusCell;
