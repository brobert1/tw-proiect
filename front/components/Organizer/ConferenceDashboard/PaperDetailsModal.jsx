import { X, Download, Star, UserPlus } from 'lucide-react';
import { Button } from '@components';
import classNames from '@lib/classnames';

const PaperDetailsModal = ({ open, onClose, paper }) => {
  if (!open || !paper) return null;

  const getStatusConfig = (status) => {
    const configs = {
      submitted: {
        className: 'bg-gray-50 text-gray-700 border-gray-200',
        text: 'SUBMITTED',
      },
      under_review: {
        className: 'bg-blue-50 text-blue-700 border-blue-200',
        text: 'UNDER_REVIEW',
      },
      accepted: {
        className: 'bg-green-50 text-green-700 border-green-200',
        text: 'ACCEPTED',
      },
      rejected: {
        className: 'bg-red-50 text-red-700 border-red-200',
        text: 'REJECTED',
      },
    };

    return configs[status] || configs.submitted;
  };

  const getReviewerStatusConfig = (status) => {
    const configs = {
      accepted: {
        className: 'bg-green-50 text-green-700 border-green-200',
        text: 'ACCEPTED',
      },
      pending: {
        className: 'bg-yellow-50 text-yellow-700 border-yellow-200',
        text: 'PENDING',
      },
      declined: {
        className: 'bg-red-50 text-red-700 border-red-200',
        text: 'DECLINED',
      },
    };

    return configs[status] || configs.pending;
  };

  const statusConfig = getStatusConfig(paper.status);

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center overflow-y-auto p-4">
      <div className="fixed inset-0 bg-gray-900/40" onClick={onClose} />
      <div className="relative z-10 my-8 w-full max-w-3xl overflow-hidden rounded-lg bg-white shadow-2xl">
        <div className="flex items-start justify-between border-b border-gray-200 px-4 py-4 md:px-6">
          <div className="flex-1 pr-2 md:pr-4">
            <div className="mb-2 flex flex-col gap-2 md:flex-row md:items-center md:gap-3">
              <h2 className="text-lg font-semibold text-text-primary md:text-xl">{paper.title}</h2>
              <span
                className={classNames(
                  'inline-flex w-fit items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
                  statusConfig.className
                )}
              >
                {statusConfig.text}
              </span>
            </div>
            <p className="text-sm text-text-secondary">
              {paper.mainAuthor}
              {paper.coAuthors && paper.coAuthors.length > 0 && (
                <span> • {paper.coAuthors.map((author) => author.name).join(', ')}</span>
              )}
            </p>
          </div>
          <Button onClick={onClose} className="rounded-md p-1 hover:bg-gray-100">
            <X className="h-5 w-5 text-gray-500" />
          </Button>
        </div>
        <div className="max-h-[calc(100vh-200px)] overflow-y-auto px-4 py-4 md:px-6 md:py-6">
          <div className="space-y-4 md:space-y-6">
            <div className="rounded-lg border border-border-primary bg-gray-50 p-4 md:p-6">
              <h3 className="mb-3 text-base font-semibold text-text-primary">Abstract</h3>
              <p className="text-sm leading-relaxed text-text-secondary">{paper.abstract}</p>
              <button
                type="button"
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-md border border-border-primary bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-50 md:w-auto"
              >
                <Download className="h-4 w-4" />
                Download Paper PDF
              </button>
            </div>
            <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-text-primary">Assigned Reviewers</h3>
                <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
                  {paper.assignedReviewers?.length || 0} Total
                </span>
              </div>
              <div className="space-y-3">
                {paper.assignedReviewers?.map((reviewer, index) => {
                  const reviewerStatus = getReviewerStatusConfig(reviewer.status);
                  return (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border border-border-primary bg-gray-50 p-4"
                    >
                      <div>
                        <p className="font-medium text-text-primary">{reviewer.name}</p>
                        <p className="text-sm text-text-secondary">{reviewer.email}</p>
                        <p className="mt-1 text-xs text-text-tertiary">
                          Assigned: {reviewer.assignedDate}
                        </p>
                      </div>
                      <span
                        className={classNames(
                          'inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-medium uppercase',
                          reviewerStatus.className
                        )}
                      >
                        {reviewerStatus.text}
                      </span>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4 border-t border-border-primary pt-4">
                <h4 className="mb-3 text-sm font-semibold text-text-primary">
                  Assign New Reviewer
                </h4>
                <div className="flex flex-col gap-3 md:flex-row">
                  <select className="form-select flex-1 rounded-md border border-border-primary px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900">
                    <option>Select a reviewer from pool...</option>
                    <option>Dr. Ada Lovelace</option>
                    <option>Dr. Alan Turing</option>
                  </select>
                  <button
                    type="button"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 md:w-auto"
                  >
                    <UserPlus className="h-4 w-4" />
                    Assign
                  </button>
                </div>
              </div>
            </div>
            {paper.submittedReviews && paper.submittedReviews.length > 0 && (
              <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="text-base font-semibold text-text-primary">Submitted Reviews</h3>
                  <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
                    {paper.submittedReviews.length} of{' '}
                    {paper.assignedReviewers?.filter((r) => r.status === 'accepted').length || 0}{' '}
                    Submitted
                  </span>
                </div>

                <div className="space-y-4">
                  {paper.submittedReviews.map((review, index) => (
                    <div
                      key={index}
                      className="rounded-lg border border-border-primary bg-gray-50 p-4"
                    >
                      <div className="mb-3 flex items-start justify-between">
                        <div>
                          <p className="font-medium text-text-primary">{review.reviewerName}</p>
                          <p className="text-xs text-text-tertiary">
                            Submitted: {review.submittedDate}
                          </p>
                        </div>
                        <div className="flex items-center gap-1">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span className="font-semibold text-text-primary">{review.score}/10</span>
                        </div>
                      </div>

                      <div className="space-y-3 text-sm">
                        <div>
                          <p className="font-medium text-text-primary">Strengths:</p>
                          <p className="mt-1 text-text-secondary">{review.strengths}</p>
                        </div>

                        <div>
                          <p className="font-medium text-text-primary">Weaknesses:</p>
                          <p className="mt-1 text-text-secondary">{review.weaknesses}</p>
                        </div>

                        <div>
                          <p className="font-medium text-text-primary">Comments:</p>
                          <p className="mt-1 text-text-secondary">{review.comments}</p>
                        </div>

                        <div className="pt-2">
                          <p className="font-medium text-text-primary">
                            Recommendation:{' '}
                            <span
                              className={classNames(
                                'ml-2',
                                review.recommendation === 'ACCEPT'
                                  ? 'text-green-600'
                                  : review.recommendation === 'REJECT'
                                    ? 'text-red-600'
                                    : 'text-yellow-600'
                              )}
                            >
                              {review.recommendation}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
              <h3 className="mb-4 text-base font-semibold text-text-primary">Final Decision</h3>
              <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700"
                >
                  <X className="h-4 w-4" style={{ transform: 'rotate(45deg)' }} />
                  Accept Paper
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
                >
                  <X className="h-4 w-4" />
                  Reject Paper
                </button>
                <button
                  type="button"
                  className="inline-flex items-center gap-2 rounded-md border border-border-primary bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-50"
                >
                  Request Revisions
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex items-center gap-2 rounded-md border border-border-primary bg-white px-4 py-2 text-sm font-medium text-text-primary hover:bg-gray-50"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaperDetailsModal;
