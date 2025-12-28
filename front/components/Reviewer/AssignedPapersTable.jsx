import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { assignedPapersColumns } from '@data';

const AssignedPapersTable = ({ data, status, onReviewClick }) => {
  const meta = { onReviewClick };

  return (
    <>
      {status === 'error' && <TableError name="assigned-papers" columns={assignedPapersColumns} />}
      {status === 'pending' && (
        <TableLoading name="assigned-papers" columns={assignedPapersColumns} />
      )}
      {status === 'success' && (
        <TableSuccess
          columns={assignedPapersColumns}
          data={data}
          name="assigned-papers"
          meta={meta}
        />
      )}
    </>
  );
};

export default AssignedPapersTable;
