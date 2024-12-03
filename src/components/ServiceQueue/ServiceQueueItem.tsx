import React from 'react';
import { Clock, Tool, AlertTriangle, User } from 'lucide-react';
import { Job } from '../../types/jobs';
import { useCustomerContext } from '../../contexts/CustomerContext';
import StatusBadge from '../common/StatusBadge';
import PrioritySelect from '../common/PrioritySelect';

interface ServiceQueueItemProps {
  job: Job;
  onClick: () => void;
  onStatusChange: (status: Job['status']) => void;
  onPriorityChange: (priority: Job['priority']) => void;
}

const ServiceQueueItem: React.FC<ServiceQueueItemProps> = ({
  job,
  onClick,
  onStatusChange,
  onPriorityChange
}) => {
  const { getCustomerByJob } = useCustomerContext();
  const customer = getCustomerByJob(job);

  return (
    <div 
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer"
    >
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="text-lg font-semibold">{job.customerName}</h3>
          <p className="text-sm text-gray-600">{job.contactInfo}</p>
        </div>
        <div className="flex items-center space-x-2">
          <StatusBadge status={job.status} onChange={onStatusChange} />
          <PrioritySelect priority={job.priority} onChange={onPriorityChange} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div className="flex items-center text-sm text-gray-600">
          <Tool className="w-4 h-4 mr-2" />
          <span>{job.make} {job.model}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock className="w-4 h-4 mr-2" />
          <span>{job.estimatedCompletion}</span>
        </div>
      </div>

      {customer?.notes && customer.notes.length > 0 && (
        <div className="flex items-start text-sm text-yellow-600 bg-yellow-50 p-2 rounded">
          <AlertTriangle className="w-4 h-4 mr-2 mt-0.5" />
          <span>{customer.notes[customer.notes.length - 1]}</span>
        </div>
      )}

      {customer?.serviceHistory && customer.serviceHistory.length > 0 && (
        <div className="mt-2 text-sm text-gray-600">
          <span className="font-medium">Previous Services:</span> {customer.serviceHistory.length}
        </div>
      )}
    </div>
  );
};

export default ServiceQueueItem;