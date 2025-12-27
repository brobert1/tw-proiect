import { Button } from '@components';

const SubmissionsActionsCell = ({ row, table }) => {
  const handleManageClick = () => {
    if (table.options.meta?.onManageClick) {
      table.options.meta.onManageClick(row.original);
    }
  };

  return (
    <Button
      onClick={handleManageClick}
      className="rounded-md border border-border-primary bg-white px-3 py-1.5 text-sm font-medium text-text-primary hover:bg-gray-50"
    >
      Manage
    </Button>
  );
};

export default SubmissionsActionsCell;
