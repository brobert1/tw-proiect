import { CheckCircle } from 'lucide-react';
import Link from 'next/link';
import PaperStatusBadge from './PaperStatusBadge';

const PapersNeedingAction = ({ papers }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-900">Papers Needing Decision</h2>
      <p className="mt-1 text-sm text-gray-500">Papers with final versions ready for review</p>
    </div>
    <div className="divide-y divide-gray-100">
      {papers?.length > 0 ? (
        papers.map((paper) => (
          <Link
            key={paper.id}
            href={`/organizer/conferences/${paper.conference_id}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900">{paper.title}</p>
              <p className="mt-1 text-sm text-gray-500">{paper.conference_acronym}</p>
            </div>
            <PaperStatusBadge status={paper.status} />
          </Link>
        ))
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <CheckCircle className="mx-auto h-12 w-12 text-green-300" />
          <p className="mt-2">All caught up!</p>
          <p className="text-sm">No papers need your decision right now.</p>
        </div>
      )}
    </div>
  </div>
);

export default PapersNeedingAction;
