import { Eye } from 'lucide-react';

const AssignedPaperActionsCell = ({ row }) => {
  const paper = row.original;

  const handleReview = () => {
    // TODO: Implement review modal or navigation
    console.log('Review paper:', paper);
  };

  return (
    <button
      type="button"
      onClick={handleReview}
      className="inline-flex items-center gap-1.5 rounded-md bg-gray-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-gray-800"
    >
      <Eye className="h-4 w-4" />
      Review
    </button>
  );
};

export default AssignedPaperActionsCell;
