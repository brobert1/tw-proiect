import { AlertCircle } from 'lucide-react';

const QueryError = ({ error, message, title = 'Error' }) => {
  const errorMessage = message || error?.message || 'Something went wrong. Please try again.';

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4 md:p-6">
      <div className="flex items-start gap-3">
        <AlertCircle className="h-5 w-5 flex-shrink-0 text-red-600" />
        <div className="flex-1">
          <h3 className="text-base font-semibold text-red-800">{title}</h3>
          <p className="mt-1 text-sm text-red-600">{errorMessage}</p>
        </div>
      </div>
    </div>
  );
};

export default QueryError;
