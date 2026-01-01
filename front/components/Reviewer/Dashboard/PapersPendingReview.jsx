import { Clock } from 'lucide-react';
import Link from 'next/link';

const PapersPendingReview = ({ papers }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Papers Pending Review</h2>
        <Link
          href="/reviewer/assigned-papers"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all →
        </Link>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {papers?.length > 0 ? (
        papers.map((paper) => (
          <div key={paper.assignment_id} className="px-6 py-4 hover:bg-gray-50">
            <p className="font-medium text-gray-900">{paper.title}</p>
            <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
              <span>{paper.conference_acronym}</span>
              {paper.review_deadline && (
                <>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3.5 w-3.5" />
                    Due: {new Date(paper.review_deadline).toLocaleDateString()}
                  </span>
                </>
              )}
            </div>
          </div>
        ))
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <Clock className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No pending reviews</p>
          <p className="text-sm">You&apos;re all caught up!</p>
        </div>
      )}
    </div>
  </div>
);

export default PapersPendingReview;
