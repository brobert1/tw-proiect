import { PendingActionsCell, StatusCell, Time } from '@components/TableCells';

export default [
  {
    id: 'email',
    header: 'E-mail',
    accessorKey: 'email',
    size: 200,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <StatusCell status={getValue()} />,
    size: 200,
  },
  {
    id: 'createdAt',
    header: 'Invited on',
    accessorKey: 'created_at',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 200,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => <PendingActionsCell row={row} table={table} />,
    size: 150,
  },
];
