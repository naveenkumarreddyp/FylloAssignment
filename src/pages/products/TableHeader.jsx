import React from 'react';
import { ArrowUpCircle, ArrowDownCircle } from 'lucide-react';

const TableHeader = ({ columns, sortConfig, requestSort, filters, handleFilterChange }) => {
  return (
    <thead>
      <tr className="border-b">
        {columns?.map((column) => (
          <th
            key={column?.id}
            className="px-6 py-3 text-left text-base font-medium text-gray-500 uppercase tracking-wider"
          >
            <div className="flex items-center justify-between">
              <span className="text-base">{column?.header}</span>
              <div className="flex items-center ml-2">
                <ArrowUpCircle
                  className={`h-5 w-5 cursor-pointer ${
                    sortConfig?.key === column?.id && sortConfig?.direction === 'asc'
                      ? 'text-green-900'
                      : 'text-gray-400'
                  }`}
                  onClick={() => requestSort(column?.id, sortConfig?.key === column?.id && sortConfig?.direction === 'asc' ? null : 'asc')}
                />
                <ArrowDownCircle
                  className={`h-5 w-5 ml-1 cursor-pointer ${
                    sortConfig?.key === column?.id && sortConfig?.direction === 'desc'
                      ? 'text-green-900'
                      : 'text-gray-400'
                  }`}
                  onClick={() => requestSort(column?.id, sortConfig?.key === column?.id && sortConfig?.direction === 'desc' ? null : 'desc')}
                />
              </div>
            </div>
            <div className="mt-2">
              <input
                value={filters[column?.id] || ''}
                onChange={(e) => handleFilterChange(column?.id, e?.target?.value)}
                placeholder={column?.id === 'requirement_in_mt_' || column?.id === 'availability_in_mt_' 
                  ? 'e.g. >100, <500, =0'
                  : `Filter ${column?.header?.toLowerCase()}`}
                className="w-full px-2 py-1 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-green-900"
              />
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;

