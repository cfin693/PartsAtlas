import React from 'react';
import { Job } from '../../types/jobs';
import { Clock, Wrench, AlertTriangle } from 'lucide-react';

interface ServiceQueueListProps {
  jobs: Job[];
  selectedJob: Job | null;
  onJobSelect: (job: Job) => void;
}

const ServiceQueueList: React.FC<ServiceQueueListProps> = ({
  jobs,
  selectedJob,
  onJobSelect
}) => {
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
    <div className="bg-white rounded-lg shadow-md">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Service Jobs</h2>
      </div>
      <div className="divide-y divide-gray-200">
        {jobs.map((job) => (
          <div
            key={job.id}
            onClick={() => onJobSelect(job)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedJob?.id === job.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <h3 className="font-medium text-gray-900">{job.customerName}</h3>
                <p className="text-sm text-gray-500">{job.equipmentType}</p>
              </div>
              <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(job.priority)}`}>
                {job.priority}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-2 mt-2 text-sm text-gray-600">
              <div className="flex items-center">
                <Wrench className="w-4 h-4 mr-1" />
                {job.serviceType}
              </div>
              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-1" />
                {job.stage}
              </div>
            </div>

            {job.priority === 'high' && (
              <div className="mt-2 flex items-center text-red-600 text-sm">
                <AlertTriangle className="w-4 h-4 mr-1" />
                Urgent Service Required
              </div>
            )}
          </div>
        ))}
        {jobs.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            No service jobs in queue
          </div>
        )}
      </div>
    </div>
  );
};

export default ServiceQueueList;