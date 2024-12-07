import React from 'react';

const TableBody = ({ columns, data }) => {
  const formatValue = (value, columnId) => {
    if (columnId === 'requirement_in_mt_' || columnId === 'availability_in_mt_') {
      return parseFloat(value).toFixed(2);
    }
    return value;
  };

  return (
    <tbody>
      {data?.map((row, rowIndex) => (
        <tr key={rowIndex} className="border-b hover:bg-gray-50">
          {columns?.map((column) => (
            <td
              key={column?.id}
              className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 relative group"
            >
              <span className="relative">
                {formatValue(row[column?.accessor], column?.id)}
                {(column?.id === 'requirement_in_mt_' || column?.id === 'availability_in_mt_') && (
                  <span className="absolute left-0 -top-8 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    {parseFloat(row[column?.accessor]).toFixed(2)} Metric Tons
                  </span>
                )}
              </span>
            </td>
          ))}
        </tr>
      ))}
    </tbody>
  );
};

export default TableBody;

