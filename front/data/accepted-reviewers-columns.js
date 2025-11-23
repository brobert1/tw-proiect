import { ExpertiseCell, StatusCell, Time } from '@components/TableCells';

export default [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'reviewer_name',
    size: 200,
  },
  {
    id: 'email',
    header: 'E-mail',
    accessorKey: 'email',
    size: 200,
  },
  {
    id: 'expertise_topics',
    header: 'Expertise Topics',
    accessorKey: 'expertise_topics',
    cell: ({ getValue }) => <ExpertiseCell topics={getValue()} />,
    size: 400,
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
];
