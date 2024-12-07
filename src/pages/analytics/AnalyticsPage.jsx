import React, { useState } from 'react';
import ProductCard from './ProductCard';
import FilterDropdowns from './FilterDropdowns';
import RequirementVsAvailabilityChart from './RequirementVsAvailabilityChart';
import {productsData} from "../../Data/Data"

const AnalyticsPage = () => {
  const [selectedYear, setSelectedYear] = useState('All');
  const [selectedMonth, setSelectedMonth] = useState('All');
  const [selectedState, setSelectedState] = useState('All');

  const filteredData = productsData?.filter(item => 
    (selectedYear === 'All' || item._year === selectedYear) &&
    (selectedMonth === 'All' || item.month === selectedMonth) &&
    (selectedState === 'All' || item.state === selectedState)
  );

  const getTopProducts = (data, key, order) => {
    const productMap = data.reduce((acc, item) => {
      if (!acc[item?.product]) {
        acc[item?.product] = 0;
      }
      acc[item?.product] += parseFloat(item[key]) || 0;
      return acc;
    }, {});
// console.log("--prodMap--", productMap)
    return Object.entries(productMap)
      .sort((a, b) => order === 'desc' ? b[1] - a[1] : a[1] - b[1])
      .slice(0, 5);
  };

  const topRequiredProducts = getTopProducts(filteredData, 'requirement_in_mt_', 'desc');
  const leastAvailableProducts = getTopProducts(filteredData, 'availability_in_mt_', 'asc');

  // console.log("--top5reqprod---",topRequiredProducts)
  // console.log("--top5leastavalprod---",topRequiredProducts)

  return (
    <div className="container mx-auto">
      <div className="fixed left-64 right-16 ml-2 z-10 bg-white flex justify-between shadow-lg rounded-lg">
        <h1 className="text-3xl font-semibold p-6">Analytics</h1>
        <FilterDropdowns
          selectedYear={selectedYear}
          selectedMonth={selectedMonth}
          selectedState={selectedState}
          setSelectedYear={setSelectedYear}
          setSelectedMonth={setSelectedMonth}
          setSelectedState={setSelectedState}
          data={productsData}
        />
      </div>
      <div className="pt-32 px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ProductCard
            title="Top 5 Products with Highest Requirement"
            products={topRequiredProducts}
            dataKey="requirement_in_mt_"
          />
          <ProductCard
            title="Top 5 Products with Least Availability"
            products={leastAvailableProducts}
            dataKey="availability_in_mt_"
          />
        </div>
        <RequirementVsAvailabilityChart data={filteredData} />
      </div>
    </div>
  );
};

export default AnalyticsPage;

