import React from 'react';
import { Clock, AlertTriangle } from 'lucide-react';
import { CheckIn } from '../../types/customers';

interface CheckInRequestsProps {
  customerId: string;
}

const CheckInRequests: React.FC<CheckInRequestsProps> = ({ customerId }) => {
  // Mock data - replace with actual API call
  const checkIns: CheckIn[] = [
    {
      id: '1',
      date: '2024-03-15',
      equipmentId: 'equip-1',
      issueDescription: 'Engine not starting properly',
      status: 'pending',
      priority: 'high'
    },
    // Add more mock check-ins as needed
  ];

  const getPriorityColor = (priority: CheckIn['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: CheckIn['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in-progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold mb-4">Check-in Requests</h2>
      {checkIns.map(checkIn => (
        <div key={checkIn.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-2">
            <div className="flex items-center space-x-2">
              <Clock className="w-5 h-5 text-gray-400" />
              <span className="text-sm text-gray-600">
                {new Date(checkIn.date).toLocaleDateString()}
              </span>
            </div>
            <div className="flex space-x-2">
              <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(checkIn.priority)}`}>
                {checkIn.priority}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(checkIn.status)}`}>
                {checkIn.status}
              </span>
            </div>
          </div>
          <p className="text-gray-800 mb-2">{checkIn.issueDescription}</p>
          {checkIn.priority === 'high' && (
            <div className="flex items-center text-red-600 text-sm">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span>Requires immediate attention</span>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CheckInRequests;