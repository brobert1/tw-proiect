import { classnames } from '@lib';
import { ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import { useState } from 'react';

const ReviewsCarousel = ({ reviews }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!reviews || reviews.length === 0) return null;

  const currentReview = reviews[currentIndex];

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev === 0 ? reviews.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev === reviews.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <h4 className="mb-3 flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
        <MessageSquare className="h-4 w-4" />
        Reviews ({reviews.length})
      </h4>
      <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
        {reviews.length > 1 && (
          <p className="mb-3 text-right text-xs text-gray-500">
            {currentIndex + 1} of {reviews.length}
          </p>
        )}
        {currentReview.feedback_for_author ? (
          <p className="text-sm text-gray-700 whitespace-pre-wrap leading-relaxed">
            {currentReview.feedback_for_author}
          </p>
        ) : (
          <p className="text-sm text-gray-500 italic">No feedback provided.</p>
        )}
        {reviews.length > 1 && (
          <div className="mt-4 flex items-center justify-between">
            <button
              onClick={goToPrevious}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              <ChevronLeft className="h-3.5 w-3.5" />
              Previous
            </button>
            <div className="flex items-center gap-1.5">
              {reviews.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={classnames(
                    'h-1.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'w-3 bg-blue-600'
                      : 'w-1.5 bg-gray-300 hover:bg-gray-400'
                  )}
                />
              ))}
            </div>
            <button
              onClick={goToNext}
              className="flex items-center gap-1 rounded-lg px-2 py-1 text-xs font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Next
              <ChevronRight className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsCarousel;
