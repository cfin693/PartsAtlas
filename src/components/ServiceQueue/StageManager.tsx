import React, { useState, useCallback } from 'react';
import { ServiceStage, SERVICE_STAGES, StageData } from './types';
import { Job } from '../../types/jobs';
import { useServiceQueueContext } from '../../contexts/ServiceQueueContext';
import useNotifications from '../../hooks/useNotifications';
import StageProgress from './StageProgress';
import CheckInStage from './stages/CheckInStage';
import DiagnosticsStage from './stages/DiagnosticsStage';
import PartsStage from './stages/PartsStage';
import RepairStage from './stages/RepairStage';
import TestingStage from './stages/TestingStage';
import PickupStage from './stages/PickupStage';

interface StageManagerProps {
  job: Job;
  onStageComplete: (stage: ServiceStage, data: StageData) => void;
}

const StageManager: React.FC<StageManagerProps> = ({ job, onStageComplete }) => {
  const { updateJobStage } = useServiceQueueContext();
  const { addNotification } = useNotifications();
  const [currentStage, setCurrentStage] = useState<ServiceStage>(job.stage);
  const [stageData, setStageData] = useState<Record<ServiceStage, StageData>>({
    'check-in': job.stageData?.['check-in'] || {},
    'diagnostics': job.stageData?.['diagnostics'] || {},
    'parts': job.stageData?.['parts'] || {},
    'repair': job.stageData?.['repair'] || {},
    'testing': job.stageData?.['testing'] || {},
    'pickup': job.stageData?.['pickup'] || {},
  });

  const handleStageChange = useCallback((newStage: ServiceStage) => {
    setCurrentStage(newStage);
    updateJobStage(job.id, newStage);
    
    addNotification({
      type: 'SERVICE_UPDATE',
      title: 'Stage Updated',
      message: `Job #${job.id} moved to ${SERVICE_STAGES.find(s => s.id === newStage)?.label}`,
      priority: 'low',
      read: false
    });
  }, [job.id, updateJobStage, addNotification]);

  const handleDataUpdate = useCallback((stage: ServiceStage, data: StageData) => {
    setStageData(prev => ({
      ...prev,
      [stage]: { ...prev[stage], ...data }
    }));
    onStageComplete(stage, data);
  }, [onStageComplete]);

  const renderStageComponent = () => {
    switch (currentStage) {
      case 'check-in':
        return (
          <CheckInStage
            job={job}
            data={stageData['check-in']}
            onUpdate={(data) => handleDataUpdate('check-in', data)}
            onComplete={() => handleStageChange('diagnostics')}
          />
        );
      case 'diagnostics':
        return (
          <DiagnosticsStage
            job={job}
            data={stageData['diagnostics']}
            onUpdate={(data) => handleDataUpdate('diagnostics', data)}
            onComplete={() => handleStageChange('parts')}
          />
        );
      case 'parts':
        return (
          <PartsStage
            job={job}
            data={stageData['parts']}
            onUpdate={(data) => handleDataUpdate('parts', data)}
            onComplete={() => handleStageChange('repair')}
          />
        );
      case 'repair':
        return (
          <RepairStage
            job={job}
            data={stageData['repair']}
            onUpdate={(data) => handleDataUpdate('repair', data)}
            onComplete={() => handleStageChange('testing')}
          />
        );
      case 'testing':
        return (
          <TestingStage
            job={job}
            data={stageData['testing']}
            onUpdate={(data) => handleDataUpdate('testing', data)}
            onComplete={() => handleStageChange('pickup')}
          />
        );
      case 'pickup':
        return (
          <PickupStage
            job={job}
            data={stageData['pickup']}
            onUpdate={(data) => handleDataUpdate('pickup', data)}
            onComplete={() => handleStageChange('pickup')}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <StageProgress
        currentStage={currentStage}
        completedStages={job.completedStages}
        onStageSelect={handleStageChange}
      />
      <div className="bg-white rounded-lg shadow-lg p-6">
        {renderStageComponent()}
      </div>
    </div>
  );
};

export default StageManager;