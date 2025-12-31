import Link from 'next/link';
import { Eye } from 'lucide-react';

const AuthorSubmissionActionsCell = ({ row }) => {
  const { conference_id } = row.original;

  return (
    <Link
      href={`/author/conferences/${conference_id}`}
      className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
    >
      <Eye className="h-4 w-4" />
      View
    </Link>
  );
};

export default AuthorSubmissionActionsCell;
