import React, { createContext, useContext, useState, useCallback } from 'react';
import { Job, ServiceStageNote } from '../types/jobs';
import { ServiceStage } from '../components/ServiceQueue/types';

interface ServiceQueueContextType {
  jobs: Job[];
  addJob: (job: Job) => void;
  updateJobStage: (jobId: string, stage: ServiceStage) => void;
  updateJobNotes: (jobId: string, notes: Record<ServiceStage, ServiceStageNote[]>) => void;
}

const ServiceQueueContext = createContext<ServiceQueueContextType | undefined>(undefined);

export const useServiceQueueContext = () => {
  const context = useContext(ServiceQueueContext);
  if (!context) {
    throw new Error('useServiceQueueContext must be used within a ServiceQueueProvider');
  }
  return context;
};

export const ServiceQueueProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [jobs, setJobs] = useState<Job[]>([
    // Test customer
    {
      id: 'job-test-1',
      customerName: 'John Smith',
      contactInfo: 'john.smith@email.com | 555-0123',
      equipmentType: 'Chainsaw',
      make: 'STIHL',
      model: 'MS 170',
      serviceType: 'Repair',
      status: 'Assigned',
      priority: 'high',
      estimatedCompletion: 'TBD',
      description: 'Chain keeps coming loose and engine stalls frequently',
      history: ['2024-03-15: Initial check-in completed'],
      serialNumber: 'MS170-123456',
      condition: 'Fair',
      stage: 'check-in',
      stageNotes: {
        'check-in': [
          {
            id: 'note-1',
            content: 'Initial inspection shows worn chain tensioner',
            technicianId: 'tech-1',
            technicianName: 'Mike Wilson',
            timestamp: new Date().toISOString(),
            isInternal: false
          }
        ]
      },
      completedStages: []
    }
  ]);

  const addJob = useCallback((job: Job) => {
    setJobs(prev => [...prev, job]);
  }, []);

  const updateJobStage = useCallback((jobId: string, stage: ServiceStage) => {
    setJobs(prev => prev.map(job => {
      if (job.id !== jobId) return job;

      const completedStages = job.stage !== stage 
        ? [...new Set([...job.completedStages, job.stage])]
        : job.completedStages;

      return { ...job, stage, completedStages };
    }));
  }, []);

  const updateJobNotes = useCallback((jobId: string, notes: Record<ServiceStage, ServiceStageNote[]>) => {
    setJobs(prev => prev.map(job =>
      job.id === jobId ? { ...job, stageNotes: notes } : job
    ));
  }, []);

  const value = {
    jobs,
    addJob,
    updateJobStage,
    updateJobNotes
  };

  return (
    <ServiceQueueContext.Provider value={value}>
      {children}
    </ServiceQueueContext.Provider>
  );
};