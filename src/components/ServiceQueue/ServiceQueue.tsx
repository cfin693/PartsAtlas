import React from 'react';
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd';
import { Job } from '../../types/jobs';
import ServiceQueueItem from './ServiceQueueItem';
import { useCustomerContext } from '../../contexts/CustomerContext';

interface ServiceQueueProps {
  jobs: Job[];
  onJobSelect: (job: Job) => void;
  onJobStatusChange: (jobId: string, status: Job['status']) => void;
  onJobPriorityChange: (jobId: string, priority: Job['priority']) => void;
  onReorder: (startIndex: number, endIndex: number) => void;
}

const ServiceQueue: React.FC<ServiceQueueProps> = ({
  jobs,
  onJobSelect,
  onJobStatusChange,
  onJobPriorityChange,
  onReorder
}) => {
  const { getCustomerByJob } = useCustomerContext();

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    onReorder(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="service-queue">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="space-y-4"
          >
            {jobs.map((job, index) => {
              const customer = getCustomerByJob(job);
              return (
                <ServiceQueueItem
                  key={job.id}
                  job={job}
                  index={index}
                  customer={customer}
                  onClick={() => onJobSelect(job)}
                  onStatusChange={(status) => onJobStatusChange(job.id, status)}
                  onPriorityChange={(priority) => onJobPriorityChange(job.id, priority)}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ServiceQueue;