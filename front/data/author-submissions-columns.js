import { AuthorSubmissionActionsCell, PaperStatusCell, Time } from '@components/TableCells';

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
    id: 'status',
    header: 'Status',
    accessorKey: 'status',
    cell: ({ getValue }) => <PaperStatusCell status={getValue()} />,
    size: 150,
  },
  {
    id: 'submittedAt',
    header: 'Submitted',
    accessorKey: 'created_at',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 130,
  },
  {
    id: 'reviewDeadline',
    header: 'Review Deadline',
    accessorKey: 'review_deadline',
    cell: ({ getValue }) => <Time value={getValue()} />,
    size: 130,
  },
  {
    id: 'actions',
    header: 'Actions',
    cell: ({ row }) => <AuthorSubmissionActionsCell row={row} />,
    size: 100,
    enableSorting: false,
  },
];
