import { getCoreRowModel, getSortedRowModel, useReactTable } from '@tanstack/react-table';

/**
 * Custom hook that wraps useReactTable with sensible defaults
 *
 * @param {Object} options - Table configuration options
 * @param {Array} options.columns - Table columns configuration
 * @param {Array} [options.data=[]] - Table data (defaults to empty array)
 * @param {Function} [options.getCoreRowModel] - Core row model (defaults to getCoreRowModel())
 * @returns {Object} Table instance from useReactTable
 */
const useTable = (options = {}) => {
  const {
    columns,
    data = [],
    getCoreRowModel: coreRowModel = getCoreRowModel(),
    getSortedRowModel: sortedRowModel = getSortedRowModel(),
    ...restOptions
  } = options;

  return useReactTable({
    columns,
    data,
    getCoreRowModel: coreRowModel,
    getSortedRowModel: sortedRowModel,
    enableSortingRemoval: false,
    sortDescFirst: true,
    ...restOptions,
  });
};

export default useTable;
