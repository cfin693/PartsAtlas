import React from 'react';
import { Job } from '../Dashboard';
import QueueItem from './QueueItem';
import { DroppableWrapper } from '../../utils/droppableWrapper';

interface QueueTableProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  onStatusUpdate: (jobId: string, status: Job['status']) => void;
  onPriorityUpdate: (jobId: string, priority: Job['priority']) => void;
  onTechnicianAssign: (jobId: string, technicianId: string) => void;
}

const QueueTable: React.FC<QueueTableProps> = ({
  jobs,
  onJobSelect,
  onStatusUpdate,
  onPriorityUpdate,
  onTechnicianAssign,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold text-gray-800">Service Queue</h2>
      </div>
      <DroppableWrapper droppableId="technician-queue">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="divide-y divide-gray-200"
          >
            {jobs.map((job, index) => (
              <QueueItem
                key={job.id}
                job={job}
                index={index}
                onSelect={() => onJobSelect(job)}
                onStatusUpdate={onStatusUpdate}
                onPriorityUpdate={onPriorityUpdate}
                onTechnicianAssign={onTechnicianAssign}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableWrapper>
    </div>
  );
};

export default QueueTable;