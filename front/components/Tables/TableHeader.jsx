import { classnames } from '@lib';
import { flexRender } from '@tanstack/react-table';
import { ArrowDown, ArrowUp, ArrowUpDown } from 'lucide-react';
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
              column.columnDef.enableSorting !== false && 'cursor-pointer select-none',
              column?.extraClass
            )}
            style={{ width: column.columnDef.size ? `${column.columnDef.size}px` : 'auto' }}
            onClick={column.getToggleSortingHandler()}
          >
            <div className="flex items-center gap-2">
              {flexRender(column.columnDef.header, column.getContext?.())}
              {column.getCanSort() && (
                <span className="text-gray-400">
                  {{
                    asc: <ArrowUp className="h-4 w-4" />,
                    desc: <ArrowDown className="h-4 w-4" />,
                  }[column.getIsSorted()] ?? <ArrowUpDown className="h-4 w-4" />}
                </span>
              )}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default memo(TableHeader);
