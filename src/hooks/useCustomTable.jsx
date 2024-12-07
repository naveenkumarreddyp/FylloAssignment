import { useState, useMemo } from 'react';

const monthOrder = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const compareMonths = (a, b) => {
  return monthOrder?.indexOf(a) - monthOrder?.indexOf(b);
};

const parseFilterValue = (value) => {
  const operators = ['>', '<', '>=', '<=', '=', '!='];
  for (const op of operators) {
    if (value?.startsWith(op)) {
      return { operator: op, value: parseFloat(value?.slice(op?.length)) };
    }
  }
  return { operator: '=', value: parseFloat(value) };
};

const compareValues = (itemValue, filterValue, operator) => {
  switch (operator) {
    case '>': return itemValue > filterValue;
    case '<': return itemValue < filterValue;
    case '>=': return itemValue >= filterValue;
    case '<=': return itemValue <= filterValue;
    case '=': return itemValue === filterValue;
    case '!=': return itemValue !== filterValue;
    default: return true;
  }
};

export function useCustomTable(data, columns, initialPageSize = 10) {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [filters, setFilters] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const filteredData = useMemo(() => {
    return data?.filter(item =>
      Object.entries(filters).every(([key, value]) => {
        // console.log("----", key, " ------ ", value)
        if (!value) return true;
        if (key === 'requirement_in_mt_' || key === 'availability_in_mt_') {
          const { operator, value: filterValue } = parseFilterValue(value);
          const itemValue = parseFloat(item[key]);
          return compareValues(itemValue, filterValue, operator);
        }
        const itemValue = item[key]?.toString().toLowerCase();
        return itemValue?.includes(value.toLowerCase());
      })
    );
  }, [data, filters]);

  const sortedData = useMemo(() => {
    let sortableItems = [...filteredData];
    if (sortConfig?.key !== null && sortConfig?.direction !== null) {
      sortableItems?.sort((a, b) => {
        if (sortConfig?.key === 'month') {
          return sortConfig?.direction === 'asc'
            ? compareMonths(a[sortConfig?.key], b[sortConfig?.key])
            : compareMonths(b[sortConfig?.key], a[sortConfig?.key]);
        }
        if (a[sortConfig?.key] < b[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? -1 : 1;
        }
        if (a[sortConfig?.key] > b[sortConfig?.key]) {
          return sortConfig?.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [filteredData, sortConfig]);

  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData?.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const pageCount = Math.ceil(sortedData?.length / pageSize);

  const requestSort = (key, direction) => {
    setSortConfig(prevConfig => {
      if (prevConfig?.key === key && prevConfig?.direction === direction) {
        return { key: null, direction: null };
      }
      return { key, direction };
    });
  };

  const requestFilter = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({});
    setSortConfig({ key: null, direction: 'asc' });
    setCurrentPage(1);
  };

  return {
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
    totalItems: sortedData.length,
  };
}

