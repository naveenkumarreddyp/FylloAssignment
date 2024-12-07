import React from 'react';

const FilterDropdowns = ({
  selectedYear,
  selectedMonth,
  selectedState,
  setSelectedYear,
  setSelectedMonth,
  setSelectedState,
  data
}) => {
  const years = ['All', ...new Set(data?.map(item => item?._year))];
  const months = ['All', ...new Set(data?.map(item => item?.month))];
  const states = ['All', ...new Set(data?.map(item => item?.state))];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      <div>
        <label htmlFor="year-select" className="block text-sm font-medium text-gray-700 mb-1">Year</label>
        <select
          id="year-select"
          value={selectedYear}
          onChange={(e) => setSelectedYear(e?.target?.value)}
          className="border rounded-md p-2"
        >
          {years?.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="month-select" className="block text-sm font-medium text-gray-700 mb-1">Month</label>
        <select
          id="month-select"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(e.target.value)}
          className="border rounded-md p-2"
        >
          {months?.map(month => (
            <option key={month} value={month}>{month}</option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="state-select" className="block text-sm font-medium text-gray-700 mb-1">State</label>
        <select
          id="state-select"
          value={selectedState}
          onChange={(e) => setSelectedState(e.target.value)}
          className="border rounded-md p-2"
        >
          {states?.map(state => (
            <option key={state} value={state}>{state}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default FilterDropdowns;

