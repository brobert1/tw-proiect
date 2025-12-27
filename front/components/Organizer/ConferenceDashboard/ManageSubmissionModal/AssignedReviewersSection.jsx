import { useState } from 'react';
import { UserPlus } from 'lucide-react';
import classNames from '@lib/classnames';
import { useQuery, useMutation } from '@hooks';
import { assignPaperReviewer } from '@api/organizer';
import { Loading, QueryError } from '@components';
import { format } from 'date-fns';

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
    submitted: {
      className: 'bg-blue-50 text-blue-700 border-blue-200',
      text: 'SUBMITTED',
    },
  };

  return configs[status] || configs.pending;
};

const AssignedReviewersSection = ({ conferenceId, paperId, submissionDeadline }) => {
  const [selectedReviewer, setSelectedReviewer] = useState('');

  const isBeforeDeadline = submissionDeadline ? new Date() < new Date(submissionDeadline) : false;

  const { data, status, refetch } = useQuery(
    `organizer/conferences/${conferenceId}/papers/${paperId}/reviewers`
  );

  const assignMutation = useMutation(
    (reviewerId) => assignPaperReviewer(conferenceId, paperId, reviewerId),
    {
      successCallback: () => {
        setSelectedReviewer('');
        refetch();
      },
    }
  );

  const handleAssign = () => {
    if (selectedReviewer) {
      assignMutation.mutate(selectedReviewer);
    }
  };

  if (status === 'pending') {
    return (
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <Loading message="Loading reviewers..." />
      </div>
    );
  }

  if (status === 'error') {
    return (
      <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
        <QueryError title="Error loading reviewers" />
      </div>
    );
  }

  const { assignedReviewers = [], availableReviewers = [] } = data || {};

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-text-primary">Assigned Reviewers</h3>
        <span className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-text-secondary">
          {assignedReviewers.length} Total
        </span>
      </div>
      <div className="space-y-3">
        {assignedReviewers.length === 0 ? (
          <p className="text-sm text-text-secondary">No reviewers assigned yet.</p>
        ) : (
          assignedReviewers.map((reviewer) => {
            const reviewerStatus = getReviewerStatusConfig(reviewer.status);
            return (
              <div
                key={reviewer.id}
                className="flex items-center justify-between rounded-lg border border-border-primary bg-gray-50 p-4"
              >
                <div>
                  <p className="font-medium text-text-primary">{reviewer.name}</p>
                  <p className="text-sm text-text-secondary">{reviewer.email}</p>
                  <p className="mt-1 text-xs text-text-tertiary">
                    Assigned: {format(new Date(reviewer.created_at), 'MMM d, yyyy')}
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
          })
        )}
      </div>
      <div className="mt-4 border-t border-border-primary pt-4">
        <h4 className="mb-3 text-sm font-semibold text-text-primary">Assign New Reviewer</h4>
        {isBeforeDeadline && (
          <p className="mb-3 text-sm text-yellow-600">
            Reviewer assignment will be available after the submission deadline passes.
          </p>
        )}
        <div className="flex flex-col gap-3 md:flex-row">
          <select
            value={selectedReviewer}
            onChange={(e) => setSelectedReviewer(e.target.value)}
            disabled={isBeforeDeadline || availableReviewers.length === 0}
            className="form-select flex-1 rounded-md border border-border-primary px-3 py-2 text-sm focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <option value="">
              {isBeforeDeadline
                ? 'Awaiting submission deadline...'
                : availableReviewers.length === 0
                  ? 'No reviewers available'
                  : 'Select a reviewer from pool...'}
            </option>
            {availableReviewers.map((reviewer) => (
              <option key={reviewer.user_id} value={reviewer.user_id}>
                {reviewer.name} ({reviewer.email})
              </option>
            ))}
          </select>
          <button
            type="button"
            onClick={handleAssign}
            disabled={isBeforeDeadline || !selectedReviewer || assignMutation.isPending}
            className="inline-flex w-full items-center justify-center gap-2 rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:cursor-not-allowed disabled:opacity-50 md:w-auto"
          >
            <UserPlus className="h-4 w-4" />
            {assignMutation.isPending ? 'Assigning...' : 'Assign'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AssignedReviewersSection;
