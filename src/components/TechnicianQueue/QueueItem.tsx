import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Job } from '../Dashboard';
import { Clock, Wrench, AlertTriangle, User } from 'lucide-react';
import StatusBadge from '../common/StatusBadge';
import PrioritySelect from '../common/PrioritySelect';

interface QueueItemProps {
  job: Job;
  index: number;
  onSelect: () => void;
  onStatusUpdate: (jobId: string, status: Job['status']) => void;
  onPriorityUpdate: (jobId: string, priority: Job['priority']) => void;
  onTechnicianAssign: (jobId: string, technicianId: string) => void;
}

const QueueItem: React.FC<QueueItemProps> = ({
  job,
  index,
  onSelect,
  onStatusUpdate,
  onPriorityUpdate,
  onTechnicianAssign,
}) => {
  return (
    <Draggable draggableId={job.id} index={index}>
      {(provided) => (
        <div
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
          onClick={onSelect}
        >
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-lg font-medium text-gray-900">{job.customerName}</h3>
              <p className="text-sm text-gray-500">{job.equipmentType}</p>
            </div>
            <div className="flex items-center space-x-4">
              <StatusBadge status={job.status} onChange={(status) => onStatusUpdate(job.id, status)} />
              <PrioritySelect
                priority={job.priority}
                onChange={(priority) => onPriorityUpdate(job.id, priority)}
              />
            </div>
          </div>
          
          <div className="mt-2 grid grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-500">
              <Wrench className="w-4 h-4 mr-1" />
              {job.serviceType}
            </div>
            <div className="flex items-center text-sm text-gray-500">
              <Clock className="w-4 h-4 mr-1" />
              {job.estimatedCompletion}
            </div>
          </div>

          {job.status === 'Waiting on Parts' && (
            <div className="mt-2 flex items-center text-amber-600">
              <AlertTriangle className="w-4 h-4 mr-1" />
              <span className="text-sm">Waiting for parts</span>
            </div>
          )}

          <div className="mt-2 flex items-center justify-between">
            <div className="flex items-center text-sm text-gray-500">
              <User className="w-4 h-4 mr-1" />
              <select
                className="border-none bg-transparent focus:ring-0"
                onChange={(e) => onTechnicianAssign(job.id, e.target.value)}
                onClick={(e) => e.stopPropagation()}
              >
                <option value="">Assign Technician</option>
                <option value="tech1">John Doe</option>
                <option value="tech2">Jane Smith</option>
                <option value="tech3">Mike Johnson</option>
              </select>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export default QueueItem;