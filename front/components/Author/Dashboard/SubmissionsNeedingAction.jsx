import { Upload } from 'lucide-react';
import Link from 'next/link';

const STATUS_BADGE = {
  awaiting_final: { bg: 'bg-orange-100', text: 'text-orange-700', label: 'Awaiting Final' },
};

const SubmissionsNeedingAction = ({ submissions }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Action Required</h2>
        <Link
          href="/author/submissions"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all →
        </Link>
      </div>
      <p className="mt-1 text-sm text-gray-500">Papers awaiting your final version upload</p>
    </div>
    <div className="divide-y divide-gray-100">
      {submissions?.length > 0 ? (
        submissions.map((submission) => (
          <Link
            key={submission.id}
            href={`/author/conferences/${submission.conference_id}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900">{submission.title}</p>
              <p className="mt-1 text-sm text-gray-500">{submission.conference_acronym}</p>
            </div>
            <span
              className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${STATUS_BADGE.awaiting_final.bg} ${STATUS_BADGE.awaiting_final.text}`}
            >
              {STATUS_BADGE.awaiting_final.label}
            </span>
          </Link>
        ))
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <Upload className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No action needed</p>
          <p className="text-sm">All your submissions are up to date.</p>
        </div>
      )}
    </div>
  </div>
);

export default SubmissionsNeedingAction;
