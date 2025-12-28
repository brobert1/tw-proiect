import { AlertTriangle, MessageSquare } from 'lucide-react';

const StatusAlerts = ({ isDeadlinePassed, hasSubmitted }) => {
  return (
    <>
      {isDeadlinePassed && (
        <div className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 text-red-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Review Deadline Passed</p>
            <p className="text-sm text-red-700">You can no longer submit or modify your review.</p>
          </div>
        </div>
      )}
      {hasSubmitted && !isDeadlinePassed && (
        <div className="flex items-start gap-3 rounded-lg border border-blue-200 bg-blue-50 p-4">
          <MessageSquare className="h-5 w-5 text-blue-500 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-blue-800">Review Already Submitted</p>
            <p className="text-sm text-blue-700">
              Submitting again will update your existing review.
            </p>
          </div>
        </div>
      )}
    </>
  );
};

export default StatusAlerts;
