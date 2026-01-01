import { CheckCircle } from 'lucide-react';

const RECOMMENDATION_LABELS = {
  strong_accept: { label: 'Strong Accept', color: 'text-green-700 bg-green-100' },
  accept: { label: 'Accept', color: 'text-green-600 bg-green-50' },
  weak_accept: { label: 'Weak Accept', color: 'text-teal-600 bg-teal-50' },
  weak_reject: { label: 'Weak Reject', color: 'text-yellow-600 bg-yellow-50' },
  reject: { label: 'Reject', color: 'text-red-600 bg-red-50' },
};

const RecentReviews = ({ reviews }) => (
  <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
    <div className="border-b border-gray-200 px-6 py-4">
      <h2 className="text-lg font-semibold text-gray-900">Recent Reviews</h2>
    </div>
    <div className="divide-y divide-gray-100">
      {reviews?.length > 0 ? (
        reviews.map((review) => {
          const recConfig =
            RECOMMENDATION_LABELS[review.recommendation] || RECOMMENDATION_LABELS.accept;
          return (
            <div key={review.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium text-gray-900">{review.paper_title}</p>
                  <p className="mt-1 text-sm text-gray-500">{review.conference_acronym}</p>
                </div>
                <span
                  className={`ml-3 rounded-full px-2.5 py-0.5 text-xs font-medium ${recConfig.color}`}
                >
                  {recConfig.label}
                </span>
              </div>
              <p className="mt-2 text-xs text-gray-400">
                Submitted: {new Date(review.submitted_at).toLocaleDateString()}
              </p>
            </div>
          );
        })
      ) : (
        <div className="px-6 py-8 text-center text-gray-500">
          <CheckCircle className="mx-auto h-12 w-12 text-gray-300" />
          <p className="mt-2">No reviews submitted yet</p>
        </div>
      )}
    </div>
  </div>
);

export default RecentReviews;
