import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ProductCard = ({ title, products, dataKey }) => {
  const chartData = products?.map(([product, value]) => ({
    product,
    value: parseFloat(value.toFixed(2)),
  }));

  const totalValue = products.reduce((sum, [key, value]) => sum + value, 0);
  const otherValue = totalValue - chartData.reduce((sum, { value }) => sum + value, 0);

  if (otherValue > 0) {
    chartData.push({ product: 'Others', value: parseFloat(otherValue.toFixed(2)) });
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <div className="space-y-2 mb-4">
        {products.map(([product, value], index) => (
          <div key={index} className="flex justify-between">
            <span>{product}</span>
            <span>{value?.toFixed(2)} MT</span>
          </div>
        ))}
        {otherValue > 0 && (
          <div className="flex justify-between">
            <span>Others</span>
            <span>{otherValue?.toFixed(2)} MT</span>
          </div>
        )}
      </div>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="product" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill={dataKey === 'requirement_in_mt_' ? '#8884d8' : '#82ca9d'} name={dataKey === 'requirement_in_mt_' ? 'Requirement' : 'Availability'} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ProductCard;

