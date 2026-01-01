import { Calendar } from 'lucide-react';
import Link from 'next/link';

const AvailableConferences = ({ conferences }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-900">Submit Your Research</h2>
        <Link
          href="/author/conferences"
          className="text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          Browse all →
        </Link>
      </div>
      <p className="mt-1 text-sm text-gray-500">Conferences accepting submissions</p>
    </div>
    <div className="divide-y divide-gray-100">
      {conferences?.length > 0 ? (
        conferences.map((conf) => (
          <Link
            key={conf.id}
            href={`/author/conferences/${conf.id}`}
            className="flex items-center justify-between px-6 py-4 hover:bg-gray-50"
          >
            <div>
              <p className="font-medium text-gray-900">{conf.name}</p>
              <p className="mt-1 text-sm text-gray-500">{conf.acronym}</p>
            </div>
            {conf.submission_deadline && (
              <span className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-1 text-xs font-medium text-blue-700">
                <Calendar className="h-3.5 w-3.5" />
                {new Date(conf.submission_deadline).toLocaleDateString()}
              </span>
            )}
          </Link>
        ))
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <Calendar className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No conferences available</p>
          <p className="text-sm">Check back later for new opportunities.</p>
        </div>
      )}
    </div>
  </div>
);

export default AvailableConferences;
