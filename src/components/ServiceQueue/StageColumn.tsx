import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Job } from '../../types/jobs';
import { ServiceStageConfig } from './types';
import { AlertTriangle, Clock, Wrench } from 'lucide-react';

interface StageColumnProps {
  stage: ServiceStageConfig;
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

const StageColumn: React.FC<StageColumnProps> = ({ stage, jobs, onJobSelect }) => {
  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="space-y-2">
      {jobs.map((job, index) => (
        <Draggable key={job.id} draggableId={job.id} index={index}>
          {(provided, snapshot) => (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              className={`bg-white p-4 rounded-lg shadow mb-2 cursor-pointer transform transition-all ${
                snapshot.isDragging ? 'rotate-2 scale-105' : ''
              }`}
              onClick={() => onJobSelect(job)}
            >
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-medium">{job.customerName}</h4>
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
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default StageColumn;