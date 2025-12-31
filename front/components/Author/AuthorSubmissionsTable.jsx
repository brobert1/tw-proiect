import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { authorSubmissionsColumns } from '@data';

const AuthorSubmissionsTable = ({ data, status }) => {
  return (
    <>
      {status === 'error' && (
        <TableError name="author-submissions" columns={authorSubmissionsColumns} />
      )}
      {status === 'pending' && (
        <TableLoading name="author-submissions" columns={authorSubmissionsColumns} />
      )}
      {status === 'success' && (
        <TableSuccess columns={authorSubmissionsColumns} data={data} name="author-submissions" />
      )}
    </>
  );
};

export default AuthorSubmissionsTable;
