import { Button } from '@components';
import { MoreHorizontal } from 'lucide-react';

const ReviewerConferenceActionsCell = () => {
  return (
    <Button className="rounded-md border border-gray-200 bg-white px-3 py-1.5 text-sm font-medium text-gray-600 hover:bg-gray-50">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  );
};

export default ReviewerConferenceActionsCell;
