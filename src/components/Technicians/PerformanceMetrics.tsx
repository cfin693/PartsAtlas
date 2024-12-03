import React from 'react';
import { BarChart as BarChartIcon, Clock, ThumbsUp, Wrench } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const PerformanceMetrics: React.FC = () => {
  const performanceData = [
    { day: 'Mon', jobs: 8, satisfaction: 4.5 },
    { day: 'Tue', jobs: 6, satisfaction: 4.8 },
    { day: 'Wed', jobs: 9, satisfaction: 4.2 },
    { day: 'Thu', jobs: 7, satisfaction: 4.6 },
    { day: 'Fri', jobs: 8, satisfaction: 4.7 },
  ];

  const metrics = [
    {
      title: 'Average Completion Time',
      value: '2.5 hours',
      icon: Clock,
      change: '-15%',
      positive: true,
    },
    {
      title: 'Customer Satisfaction',
      value: '4.8/5.0',
      icon: ThumbsUp,
      change: '+0.2',
      positive: true,
    },
    {
      title: 'Jobs Completed',
      value: '38',
      icon: Wrench,
      change: '+5',
      positive: true,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-6">Performance Metrics</h2>

      <div className="grid grid-cols-3 gap-4 mb-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <Icon className="w-5 h-5 text-blue-500" />
                <span className={`text-sm font-medium ${metric.positive ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change}
                </span>
              </div>
              <div className="text-2xl font-bold mb-1">{metric.value}</div>
              <div className="text-sm text-gray-600">{metric.title}</div>
            </div>
          );
        })}
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold mb-4">Weekly Performance</h3>
        <BarChart width={500} height={300} data={performanceData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          <Bar yAxisId="left" dataKey="jobs" fill="#3b82f6" name="Jobs Completed" />
          <Bar yAxisId="right" dataKey="satisfaction" fill="#10b981" name="Satisfaction Score" />
        </BarChart>
      </div>
    </div>
  );
};

export default PerformanceMetrics;