import { X, Check } from 'lucide-react';

const FinalDecisionSection = ({ reviewDeadline }) => {
  const isBeforeDeadline = reviewDeadline ? new Date() < new Date(reviewDeadline) : false;

  return (
    <div className="rounded-lg border border-border-primary bg-white p-4 md:p-6">
      <h3 className="mb-4 text-base font-semibold text-text-primary">Final Decision</h3>
      {isBeforeDeadline && (
        <p className="mb-3 text-sm text-yellow-600">
          Final decision will be available after the review deadline passes.
        </p>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:flex-wrap">
        <button
          type="button"
          disabled={isBeforeDeadline}
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-medium text-white hover:bg-green-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <Check className="h-4 w-4" />
          Accept Paper
        </button>
        <button
          type="button"
          disabled={isBeforeDeadline}
          className="inline-flex items-center gap-2 rounded-md bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          <X className="h-4 w-4" />
          Reject Paper
        </button>
      </div>
    </div>
  );
};

export default FinalDecisionSection;
