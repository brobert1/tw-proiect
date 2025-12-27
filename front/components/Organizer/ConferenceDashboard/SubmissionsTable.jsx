import { TableError, TableLoading, TableSuccess } from '@components/Tables';
import { submissionsColumns } from '@data';

const SubmissionsTable = ({ data, status, onManageClick }) => {
  return (
    <div className="rounded-lg border border-border-primary bg-white">
      <div className="-mx-4 overflow-x-auto md:mx-0 md:overflow-x-visible">
        {status === 'error' && <TableError name="submissions" columns={submissionsColumns} />}
        {status === 'pending' && <TableLoading name="submissions" columns={submissionsColumns} />}
        {status === 'success' && (
          <TableSuccess
            columns={submissionsColumns}
            data={data}
            name="submissions"
            meta={{ onManageClick }}
          />
        )}
      </div>
    </div>
  );
};

export default SubmissionsTable;
