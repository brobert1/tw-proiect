import { classnames } from '@lib';
import { useQuery } from '@hooks';
import { Loading, QueryError } from '@components';
import { format } from 'date-fns';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

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

const ReviewCard = ({ review }) => {
  const recommendationConfig = getRecommendationConfig(review.recommendation);

  return (
    <div className="rounded-lg border border-border-primary bg-gray-50 p-4">
      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="font-medium text-text-primary">{review.reviewer_name}</p>
          <p className="text-xs text-text-tertiary">
            Submitted: {format(new Date(review.submitted_at), 'MMM d, yyyy')}
          </p>
        </div>
        <span className={classnames('text-sm font-semibold', recommendationConfig.className)}>
          {recommendationConfig.text}
        </span>
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
      </div>
    </div>
  );
};

const SubmittedReviewsSection = ({ conferenceId, paperId }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const { reviews = [] } = data || {};

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">Submitted Reviews</h3>
      </div>
      {reviews.length === 0 ? (
        <p className="text-sm text-text-secondary">No reviews submitted yet.</p>
      ) : (
        <div className="relative">
          <ReviewCard review={reviews[currentIndex]} />
          {reviews.length > 1 && (
            <>
              <div className="mt-4 flex items-center justify-between">
                <button
                  onClick={goToPrevious}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  <ChevronLeft className="h-4 w-4" />
                  Previous
                </button>
                <div className="flex items-center gap-2">
                  {reviews.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentIndex(index)}
                      className={classnames(
                        'h-2 w-2 rounded-full transition-all',
                        index === currentIndex ? 'bg-blue-600 w-4' : 'bg-gray-300 hover:bg-gray-400'
                      )}
                    />
                  ))}
                </div>
                <button
                  onClick={goToNext}
                  className="flex items-center gap-1 rounded-lg px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-100 transition-colors"
                >
                  Next
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
              <p className="mt-2 text-center text-xs text-text-tertiary">
                Review {currentIndex + 1} of {reviews.length}
              </p>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SubmittedReviewsSection;
