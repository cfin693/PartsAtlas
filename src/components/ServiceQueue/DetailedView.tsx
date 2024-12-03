import React from 'react';
import { Job } from '../../types/jobs';
import { ServiceStage } from './ServiceStages';
import ProgressBar from './ProgressBar';
import StageNotes from './StageNotes';
import { useAuth } from '../Auth';
import { useServiceQueueContext } from '../../contexts/ServiceQueueContext';

interface DetailedViewProps {
  job: Job;
  onStageChange: (stage: ServiceStage) => void;
  onNotifyCustomer: (message: string) => void;
}

const DetailedView: React.FC<DetailedViewProps> = ({ job, onStageChange, onNotifyCustomer }) => {
  const { user } = useAuth();
  const { updateJobNotes } = useServiceQueueContext();

  const handleAddNote = (stage: ServiceStage, content: string, isInternal: boolean) => {
    if (!user) return;

    const newNote = {
      id: `note-${Date.now()}`,
      content,
      technicianId: user.id,
      technicianName: user.name,
      timestamp: new Date().toISOString(),
      isInternal
    };

    const updatedNotes = {
      ...job.stageNotes,
      [stage]: [...(job.stageNotes[stage] || []), newNote]
    };

    updateJobNotes(job.id, updatedNotes);

    // If the note is not internal, notify the customer
    if (!isInternal) {
      onNotifyCustomer(content);
    }
  };

  return (
    <div className="space-y-6">
      <ProgressBar currentStage={job.stage} onClick={onStageChange} />
      
      <div className="grid grid-cols-1 gap-6">
        {/* Current Stage Notes */}
        <StageNotes
          notes={job.stageNotes[job.stage] || []}
          onAddNote={(content, isInternal) => handleAddNote(job.stage, content, isInternal)}
          stage={job.stage}
        />

        {/* Previous Stage Notes */}
        {job.completedStages.map((stage) => (
          <StageNotes
            key={stage}
            notes={job.stageNotes[stage as ServiceStage] || []}
            onAddNote={(content, isInternal) => handleAddNote(stage as ServiceStage, content, isInternal)}
            stage={stage}
          />
        ))}
      </div>
    </div>
  );
};

export default DetailedView;