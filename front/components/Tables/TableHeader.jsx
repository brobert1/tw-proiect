import { classnames } from '@lib';
import { flexRender } from '@tanstack/react-table';
import { memo } from 'react';

const TableHeader = ({ headers }) => {
  return (
    <thead className="bg-white">
      <tr className="border-b border-gray-100 text-xs text-gray-500">
        {headers.map((column) => (
          <th
            key={column.id}
            className={classnames(
              'whitespace-nowrap px-6 py-4 text-left font-medium uppercase tracking-wider',
              column?.extraClass
            )}
            style={{ width: column.columnDef.size ? `${column.columnDef.size}px` : 'auto' }}
          >
            {flexRender(column.columnDef.header, column.getContext?.())}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
