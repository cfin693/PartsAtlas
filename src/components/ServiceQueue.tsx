import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { DroppableWrapper } from '../utils/droppableWrapper';
import { AlertTriangle, Clock, User, Wrench } from 'lucide-react';
import { Job } from '../types/jobs';

interface ServiceQueueProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
}

export const ServiceQueue: React.FC<ServiceQueueProps> = ({ jobs, onJobSelect }) => {
  if (!jobs?.length) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Service Queue</h2>
        <p className="text-gray-500 text-center">No jobs in queue</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Service Queue</h2>
      <DroppableWrapper droppableId="service-queue">
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef}>
            {jobs.map((job, index) => (
              <Draggable key={job.id} draggableId={job.id} index={index}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-gray-100 p-4 mb-2 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => onJobSelect(job)}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{job.customerName}</h3>
                      <span className={`px-2 py-1 rounded text-sm ${
                        job.priority === 'high' ? 'bg-red-200 text-red-800' :
                        job.priority === 'medium' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {job.priority.charAt(0).toUpperCase() + job.priority.slice(1)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{job.equipmentType} - {job.make} {job.model}</p>
                    <div className="flex justify-between items-center text-sm">
                      <span className="flex items-center">
                        <Wrench className="w-4 h-4 mr-1" />
                        {job.serviceType}
                      </span>
                      <span className="flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        {job.estimatedCompletion}
                      </span>
                    </div>
                    <div className="mt-2 text-sm">
                      <span className={`px-2 py-1 rounded ${
                        job.status === 'Assigned' ? 'bg-blue-200 text-blue-800' :
                        job.status === 'In Progress' ? 'bg-yellow-200 text-yellow-800' :
                        job.status === 'Waiting on Parts' ? 'bg-purple-200 text-purple-800' :
                        job.status === 'Pending Approval' ? 'bg-orange-200 text-orange-800' :
                        'bg-green-200 text-green-800'
                      }`}>
                        {job.status}
                      </span>
                    </div>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </DroppableWrapper>
    </div>
  );
};