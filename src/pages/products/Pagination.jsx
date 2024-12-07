import React from 'react';

const Pagination = ({
  currentPage,
  pageCount,
  setCurrentPage,
  pageSize,
  setPageSize,
  totalItems,
}) => {
  return (
    <div className="px-6 py-3 flex items-center justify-between border-t">
      <div className="flex items-center">
        <select
          value={pageSize}
          onChange={(e) => setPageSize(Number(e.target.value))}
          className="border rounded-md text-sm px-2 py-1 mr-2"
        >
          {[5, 10, 20, 30, 40, 50].map((size) => (
            <option key={size} value={size}>
              {size} per page
            </option>
          ))}
        </select>
        <span className="text-sm text-gray-700">
          Showing {(currentPage - 1) * pageSize + 1} to{' '}
          {Math.min(currentPage * pageSize, totalItems)} of {totalItems} results
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          {'<<'}
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          {'<'}
        </button>
        {Array.from({ length: pageCount }, (_, i) => {
          if (
            i === 0 ||
            i === pageCount - 1 ||
            (i >= currentPage - 2 && i <= currentPage)
          ) {
            return (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md text-sm ${
                  currentPage === i + 1
                    ? 'bg-green-700 text-white'
                    : 'border hover:bg-gray-50'
                }`}
              >
                {i + 1}
              </button>
            );
          }
          if (i === currentPage - 3 || i === currentPage + 1) {
            return <span key={i}>...</span>;
          }
          return null;
        })}
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, pageCount))}
          disabled={currentPage === pageCount}
          className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          {'>'}
        </button>
        <button
          onClick={() => setCurrentPage(pageCount)}
          disabled={currentPage === pageCount}
          className="px-2 py-1 border rounded-md text-sm disabled:opacity-50"
        >
          {'>>'}
        </button>
      </div>
    </div>
  );
};

export default Pagination;

