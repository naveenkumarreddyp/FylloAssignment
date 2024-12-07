import React from 'react';
import { useCustomTable } from '../../hooks/useCustomTable';
import { ColumnHeadings } from '../../utils/TableColHeadings';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import Pagination from './Pagination';

const ProductTable = ({ data }) => {
  const {
    data: paginatedData,
    requestSort,
    sortConfig,
    requestFilter,
    filters,
    resetFilters,
    pageCount,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalItems,
  } = useCustomTable(data, ColumnHeadings);

  const handleFilterChange = (columnId, value) => {
    requestFilter(columnId, value);
  };

  const isAnyFilterActive = Object.values(filters).some(Boolean) || sortConfig.key !== null;

  return (
    <div className="w-full bg-white rounded-lg shadow-sm">
      <div className="px-6 py-4 flex justify-between items-center">
        <h2 className="text-2xl font-semibold text-gray-800">Products</h2>
        <button
          onClick={resetFilters}
          disabled={!isAnyFilterActive}
          className={`px-4 py-2 rounded-md text-white ${
            isAnyFilterActive ? 'bg-green-700 hover:bg-green-900' : 'bg-gray-300 cursor-not-allowed'
          }`}
        >
          Reset
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <TableHeader
            columns={ColumnHeadings}
            sortConfig={sortConfig}
            requestSort={requestSort}
            filters={filters}
            handleFilterChange={handleFilterChange}
          />
          <TableBody columns={ColumnHeadings} data={paginatedData} />
        </table>
      </div>
      <Pagination
        currentPage={currentPage}
        pageCount={pageCount}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        totalItems={totalItems}
      />
    </div>
  );
};

export default ProductTable;

