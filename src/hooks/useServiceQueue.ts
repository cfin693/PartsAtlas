import { useState, useCallback } from 'react';
import { Job } from '../types/jobs';

export const useServiceQueue = () => {
  const [jobs, setJobs] = useState<Job[]>([]);

  const addJob = useCallback((job: Job) => {
    setJobs(prev => [...prev, job]);
  }, []);

  const updateJobStatus = useCallback((jobId: string, status: Job['status']) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, status } : job
    ));
  }, []);

  const updateJobPriority = useCallback((jobId: string, priority: Job['priority']) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, priority } : job
    ));
  }, []);

  const assignTechnician = useCallback((jobId: string, technicianId: string) => {
    setJobs(prev => prev.map(job => 
      job.id === jobId ? { ...job, assignedTechnicianId: technicianId } : job
    ));
  }, []);

  const removeJob = useCallback((jobId: string) => {
    setJobs(prev => prev.filter(job => job.id !== jobId));
  }, []);

  const reorderJobs = useCallback((startIndex: number, endIndex: number) => {
    setJobs(prev => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result;
    });
  }, []);

  return {
    jobs,
    addJob,
    updateJobStatus,
    updateJobPriority,
    assignTechnician,
    removeJob,
    reorderJobs
  };
};