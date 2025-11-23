import { flexRender } from '@tanstack/react-table';
import { memo } from 'react';

const TableRow = ({ row }) => {
  const cells = row.getVisibleCells();
  return (
    <tr className="border-b border-gray-50 hover:bg-gray-50/50">
      {cells.map((cell) => {
        return (
          <td key={cell.id} className="group whitespace-nowrap px-6 py-4 text-sm text-gray-700">
            {flexRender(cell.column.columnDef.cell, cell.getContext())}
          </td>
        );
      })}
    </tr>
  );
};

export default memo(TableRow);
