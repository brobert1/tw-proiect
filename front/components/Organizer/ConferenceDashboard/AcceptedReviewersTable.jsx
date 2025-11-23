import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { acceptedReviewersColumns } from '@data';

const AcceptedReviewersTable = ({ data, status, ...props }) => {
  return (
    <>
      {status === 'error' && (
        <TableError name="accepted-reviewers" columns={acceptedReviewersColumns} />
      )}
      {status === 'loading' && (
        <TableLoading name="accepted-reviewers" columns={acceptedReviewersColumns} />
      )}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={acceptedReviewersColumns}
            data={data}
            name="accepted-reviewers"
            {...props}
          />
        </>
      )}
    </>
  );
};

export default AcceptedReviewersTable;
