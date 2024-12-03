import React from 'react';
import { Job } from '../Dashboard';

interface StatusBadgeProps {
  status: Job['status'];
  onChange: (status: Job['status']) => void;
}

const StatusBadge: React.FC<StatusBadgeProps> = ({ status, onChange }) => {
  const getStatusColor = (status: Job['status']) => {
    switch (status) {
      case 'Assigned':
        return 'bg-blue-100 text-blue-800';
      case 'In Progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'Waiting on Parts':
        return 'bg-purple-100 text-purple-800';
      case 'Pending Approval':
        return 'bg-orange-100 text-orange-800';
      case 'Completed':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <select
      value={status}
      onChange={(e) => onChange(e.target.value as Job['status'])}
      className={`${getStatusColor(status)} text-sm font-medium px-2.5 py-0.5 rounded-full border-none focus:ring-0`}
      onClick={(e) => e.stopPropagation()}
    >
      <option value="Assigned">Assigned</option>
      <option value="In Progress">In Progress</option>
      <option value="Waiting on Parts">Waiting on Parts</option>
      <option value="Pending Approval">Pending Approval</option>
      <option value="Completed">Completed</option>
    </select>
  );
};

export default StatusBadge;