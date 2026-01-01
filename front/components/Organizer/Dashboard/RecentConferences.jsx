import { Calendar } from 'lucide-react';
import Link from 'next/link';
import ConferenceStatusBadge from './ConferenceStatusBadge';

const RecentConferences = ({ conferences }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Recent Conferences</h2>
        <Link
          href="/organizer/conferences"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          View all →
        </Link>
      </div>
    </div>
    <div className="divide-y divide-gray-100">
      {conferences?.length > 0 ? (
        conferences.map((conf) => (
          <Link
            key={conf.id}
            href={`/organizer/conferences/${conf.id}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-900">{conf.name}</p>
              <div className="mt-1 flex items-center gap-3 text-sm text-gray-500">
                <span>{conf.acronym}</span>
                <span>•</span>
                <span>{conf.paper_count} papers</span>
                <span>•</span>
                <span>{conf.reviewer_count} reviewers</span>
              </div>
            </div>
            <ConferenceStatusBadge status={conf.status} />
          </Link>
        ))
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <Calendar className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No conferences yet</p>
          <Link
            href="/organizer/conferences"
            className="mt-2 inline-block text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            Create your first conference
          </Link>
        </div>
      )}
    </div>
  </div>
);

export default RecentConferences;
