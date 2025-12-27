import classNames from '@lib/classnames';
import { useQuery } from '@hooks';
import { Loading, QueryError } from '@components';
import { format } from 'date-fns';

const getRecommendationConfig = (recommendation) => {
  const configs = {
    strong_accept: { text: 'STRONG ACCEPT', className: 'text-green-700' },
    accept: { text: 'ACCEPT', className: 'text-green-600' },
    weak_accept: { text: 'WEAK ACCEPT', className: 'text-green-500' },
    weak_reject: { text: 'WEAK REJECT', className: 'text-yellow-600' },
    reject: { text: 'REJECT', className: 'text-red-600' },
  };

  return (
    configs[recommendation] || { text: recommendation?.toUpperCase(), className: 'text-gray-600' }
  );
};

const SubmittedReviewsSection = ({ conferenceId, paperId }) => {
  const { data, status } = useQuery(
    `organizer/conferences/${conferenceId}/papers/${paperId}/reviews`
  );

  if (status === 'pending') {
    return (
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <Loading message="Loading reviews..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <QueryError title="Error loading reviews" />
      </div>
    );
  }

  const { reviews = [], totalAcceptedReviewers = 0 } = data || {};

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">Submitted Reviews</h3>
        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
          {reviews.length} of {totalAcceptedReviewers} Submitted
        </span>
      </div>
      {reviews.length === 0 ? (
        <p className="text-sm text-text-secondary">No reviews submitted yet.</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => {
            const recommendationConfig = getRecommendationConfig(review.recommendation);
            return (
              <div
                key={review.id}
                className="rounded-lg border border-border-primary bg-gray-50 p-4"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <p className="font-medium text-text-primary">{review.reviewer_name}</p>
                    <p className="text-xs text-text-tertiary">
                      Submitted: {format(new Date(review.submitted_at), 'MMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  {review.feedback_for_author && (
                    <div>
                      <p className="font-medium text-text-primary">Feedback for Author:</p>
                      <p className="mt-1 whitespace-pre-wrap text-text-secondary">
                        {review.feedback_for_author}
                      </p>
                    </div>
                  )}
                  {review.confidential_comments && (
                    <div>
                      <p className="font-medium text-text-primary">Confidential Comments:</p>
                      <p className="mt-1 whitespace-pre-wrap text-text-secondary">
                        {review.confidential_comments}
                      </p>
                    </div>
                  )}
                  <div className="pt-2">
                    <p className="font-medium text-text-primary">
                      Recommendation:{' '}
                      <span className={classNames('ml-2', recommendationConfig.className)}>
                        {recommendationConfig.text}
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default SubmittedReviewsSection;
