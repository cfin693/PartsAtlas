import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { Users, Wrench, ShoppingCart, Clock } from 'lucide-react';

interface CustomizableWidgetProps {
  type: string;
}

const CustomizableWidget: React.FC<CustomizableWidgetProps> = ({ type }) => {
  const data = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 300 },
    { name: 'Mar', value: 600 },
    { name: 'Apr', value: 800 },
    { name: 'May', value: 500 },
    { name: 'Jun', value: 700 },
  ];

  const renderWidget = () => {
    switch (type) {
      case 'stockLevels':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Stock Levels</h3>
            <BarChart width={300} height={200} data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#004aad" />
            </BarChart>
          </div>
        );
      case 'technicianPerformance':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Technician Performance</h3>
            <div className="flex items-center">
              <Users className="w-8 h-8 mr-2 text-[#004aad]" />
              <span className="text-2xl font-bold">85%</span>
            </div>
            <p className="text-sm text-gray-600">Average efficiency</p>
          </div>
        );
      case 'assignedJobs':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Assigned Jobs</h3>
            <div className="flex items-center">
              <Wrench className="w-8 h-8 mr-2 text-[#004aad]" />
              <span className="text-2xl font-bold">12</span>
            </div>
            <p className="text-sm text-gray-600">Active assignments</p>
          </div>
        );
      case 'serviceHistory':
        return (
          <div>
            <h3 className="text-lg font-semibold mb-2">Service History</h3>
            <div className="flex items-center">
              <Clock className="w-8 h-8 mr-2 text-[#004aad]" />
              <span className="text-2xl font-bold">5</span>
            </div>
            <p className="text-sm text-gray-600">Services in the last 12 months</p>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-4">
      {renderWidget()}
    </div>
  );
};

export default CustomizableWidget;