import { Link } from '@components';

const ReviewerConferenceActionsCell = ({ row }) => {
  const conferenceId = row.original.id;

  return (
    <Link
      href={`/reviewer/conferences/${conferenceId}`}
      className="inline-flex items-center rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-blue-600 hover:bg-blue-50 hover:text-blue-700"
    >
      Manage
    </Link>
  );
};

export default ReviewerConferenceActionsCell;
