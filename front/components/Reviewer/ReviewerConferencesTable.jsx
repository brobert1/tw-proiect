import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { reviewerConferencesColumns } from '@data';

const ReviewerConferencesTable = ({ data, status, ...props }) => {
  return (
    <>
      {status === 'error' && (
        <TableError name="reviewer-conferences" columns={reviewerConferencesColumns} />
      )}
      {status === 'pending' && (
        <TableLoading name="reviewer-conferences" columns={reviewerConferencesColumns} />
      )}
      {status === 'success' && (
        <>
          <TableSuccess
            columns={reviewerConferencesColumns}
            data={data}
            name="reviewer-conferences"
            {...props}
          />
        </>
      )}
    </>
  );
};

export default ReviewerConferencesTable;
