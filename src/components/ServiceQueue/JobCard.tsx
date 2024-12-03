import React from 'react';
import { Clock, Wrench, AlertTriangle } from 'lucide-react';
import { Job } from '../../types/jobs';

interface JobCardProps {
  job: Job;
  onClick: () => void;
  isDragging?: boolean;
}

const JobCard: React.FC<JobCardProps> = ({ job, onClick, isDragging }) => {
  const getPriorityColor = (priority: Job['priority']) => {
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

  return (
    <div
      onClick={onClick}
      className={`bg-white p-4 rounded-lg shadow hover:shadow-lg cursor-pointer ${
        isDragging ? 'shadow-lg rotate-2' : ''
      }`}
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-medium text-gray-900">{job.customerName}</h3>
        <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
          {job.priority}
        </span>
      </div>
      
      <p className="text-sm text-gray-600 mb-2">
        {job.make} {job.model}
      </p>
      
      <div className="grid grid-cols-2 gap-2 text-sm text-gray-500">
        <div className="flex items-center">
          <Wrench className="w-4 h-4 mr-1" />
          {job.serviceType}
        </div>
        <div className="flex items-center">
          <Clock className="w-4 h-4 mr-1" />
          {job.estimatedCompletion}
        </div>
      </div>

      {job.priority === 'high' && (
        <div className="mt-2 flex items-center text-red-600 text-xs">
          <AlertTriangle className="w-4 h-4 mr-1" />
          Urgent Service Required
        </div>
      )}
    </div>
  );
};

export default JobCard;