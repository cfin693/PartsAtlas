import React from 'react';
import { Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { Job } from '../../types/jobs';
import { SERVICE_STAGES } from './types';
import { CheckCircle, Wrench, Package, Settings, TestTube, UserCheck } from 'lucide-react';
import JobCard from './JobCard';

interface KanbanBoardProps {
  jobs: Job[];
  onDragEnd: (result: DropResult) => void;
  onJobClick: (job: Job) => void;
}

const KanbanBoard: React.FC<KanbanBoardProps> = ({ jobs, onJobClick }) => {
  const getJobsByStage = (stageId: string) => {
    return jobs.filter(job => job.stage === stageId);
  };

  const getStageIcon = (stageId: string) => {
    switch (stageId) {
      case 'check-in':
        return <CheckCircle className="w-5 h-5" />;
      case 'diagnostics':
        return <Wrench className="w-5 h-5" />;
      case 'parts':
        return <Package className="w-5 h-5" />;
      case 'repair':
        return <Settings className="w-5 h-5" />;
      case 'testing':
        return <TestTube className="w-5 h-5" />;
      case 'pickup':
        return <UserCheck className="w-5 h-5" />;
      default:
        return <CheckCircle className="w-5 h-5" />;
    }
  };

  return (
    <div className="flex overflow-x-auto gap-4 pb-4">
      {SERVICE_STAGES.map(stage => (
        <div key={stage.id} className="flex-shrink-0 w-80">
          <div className="bg-gray-100 rounded-lg p-4">
            <div className="flex items-center space-x-2 mb-4">
              {getStageIcon(stage.id)}
              <h3 className="font-semibold text-gray-700">
                {stage.label}
                <span className="ml-2 text-sm text-gray-500">
                  ({getJobsByStage(stage.id).length})
                </span>
              </h3>
            </div>

            <Droppable droppableId={stage.id}>
              {(provided, snapshot) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={`min-h-[200px] transition-colors rounded-lg space-y-3 ${
                    snapshot.isDraggingOver ? 'bg-blue-50' : ''
                  }`}
                >
                  {getJobsByStage(stage.id).map((job, index) => (
                    <Draggable key={job.id} draggableId={job.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <JobCard
                            job={job}
                            onClick={() => onJobClick(job)}
                            isDragging={snapshot.isDragging}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanBoard;