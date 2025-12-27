import { PaperStatusCell, SubmissionsActionsCell, Time } from '@components/TableCells';

export default [
  {
    id: 'title',
    header: 'Title',
    accessorKey: 'title',
    size: 300,
  },
  {
    id: 'author',
    header: 'Main Author',
    accessorKey: 'author_name',
    size: 180,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <PaperStatusCell status={getValue()} />,
    size: 150,
  },
  {
    id: 'submittedAt',
    header: 'Submitted At',
    accessorKey: 'created_at',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 150,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => <SubmissionsActionsCell row={row} table={table} />,
    size: 120,
    enableSorting: false,
  },
];
