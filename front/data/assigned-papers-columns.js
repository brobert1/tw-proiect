import { AssignedPaperActionsCell, ReviewStatusCell, Time } from '@components/TableCells';

export default [
  {
    id: 'title',
    header: 'Paper Title',
    accessorKey: 'title',
    size: 300,
  },
  {
    id: 'conference',
    header: 'Conference',
    accessorKey: 'conference_acronym',
    size: 120,
  },
  {
    id: 'review_status',
    header: 'Review Status',
    accessorKey: 'has_submitted_review',
    cell: ({ getValue }) => <ReviewStatusCell hasSubmitted={getValue()} />,
    size: 120,
  },
  {
    id: 'review_deadline',
    header: 'Deadline',
    accessorKey: 'review_deadline',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 130,
  },
  {
    id: 'assigned_at',
    header: 'Assigned On',
    accessorKey: 'assigned_at',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 130,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row, table }) => <AssignedPaperActionsCell row={row} table={table} />,
    size: 100,
  },
];
