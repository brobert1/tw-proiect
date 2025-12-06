import { ReviewerConferenceActionsCell, StatusCell, Time } from '@components/TableCells';

export default [
  {
    id: 'name',
    header: 'Conference',
    accessorKey: 'name',
    size: 250,
  },
  {
    id: 'acronym',
    header: 'Acronym',
    accessorKey: 'acronym',
    size: 100,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <StatusCell status={getValue()} />,
    size: 120,
  },
  {
    id: 'review_deadline',
    header: 'Review Deadline',
    accessorKey: 'review_deadline',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 150,
  },
  {
    id: 'joined_at',
    header: 'Joined On',
    accessorKey: 'joined_at',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 150,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => <ReviewerConferenceActionsCell row={row} table={table} />,
    size: 80,
  },
];
