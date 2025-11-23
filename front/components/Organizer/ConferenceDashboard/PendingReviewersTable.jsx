import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { pendingReviewersColumns } from '@data';

const PendingReviewersTable = ({ data, status, refetch, ...props }) => {
  return (
    <>
      {status === 'error' && (
        <TableError name="pending-reviewers" columns={pendingReviewersColumns} />
      )}
      {status === 'loading' && (
        <TableLoading name="pending-reviewers" columns={pendingReviewersColumns} />
      )}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={pendingReviewersColumns}
            data={data}
            name="pending-reviewers"
            meta={{ refetch }}
            {...props}
          />
        </>
      )}
    </>
  );
};

export default PendingReviewersTable;
