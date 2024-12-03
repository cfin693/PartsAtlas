import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const InteractiveGraph: React.FC = () => {
  const data = [
    { name: 'Jan', temperature: 65, pressure: 75 },
    { name: 'Feb', temperature: 59, pressure: 70 },
    { name: 'Mar', temperature: 80, pressure: 90 },
    { name: 'Apr', temperature: 81, pressure: 85 },
    { name: 'May', temperature: 56, pressure: 65 },
    { name: 'Jun', temperature: 55, pressure: 60 },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Performance Over Time</h2>
      <LineChart width={600} height={300} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="temperature" stroke="#8884d8" />
        <Line type="monotone" dataKey="pressure" stroke="#82ca9d" />
      </LineChart>
    </div>
  );
};

export default InteractiveGraph;