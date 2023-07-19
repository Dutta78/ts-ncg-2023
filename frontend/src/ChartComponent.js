import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const ChartComponent = ({ data, type }) => {
  // Simple placeholder chart
  if (!data || data.length === 0) {
    return <div>No data available for the selected date range.</div>;
  }

  return (
    <LineChart width={600} height={300} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="x" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="y" stroke="#8884d8" />
    </LineChart>
  );
};




export default ChartComponent;
