import React, { useState } from 'react';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RequirementVsAvailabilityChart = ({ data }) => {
  const [chartType, setChartType] = useState('bar');

  const chartData = data.reduce((acc, item) => {
    const existingProduct = acc.find(p => p?.product === item?.product);
    if (existingProduct) {
      existingProduct.requirement += parseFloat(item?.requirement_in_mt_) || 0;
      existingProduct.availability += parseFloat(item?.availability_in_mt_) || 0;
    } else {
      acc.push({
        product: item?.product,
        requirement: parseFloat(item?.requirement_in_mt_) || 0,
        availability: parseFloat(item?.availability_in_mt_) || 0,
      });
    }
    return acc;
  }, []);

  const Chart = chartType === 'bar' ? BarChart : LineChart;
  const DataComponent = chartType === 'bar' ? Bar : Line;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Requirement vs Availability</h2>
        <div className="flex items-center space-x-2">
          <span>Chart Type:</span>
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            className="border rounded-md p-1"
          >
            <option value="bar">Bar</option>
            <option value="line">Line</option>
          </select>
        </div>
      </div>
      <div className="h-96">
        <ResponsiveContainer width="100%" height="100%">
          <Chart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <DataComponent dataKey="requirement" fill="#8884d8" stroke="#8884d8" name="Requirement" />
            <DataComponent dataKey="availability" fill="#82ca9d" stroke="#82ca9d" name="Availability" />
          </Chart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RequirementVsAvailabilityChart;

