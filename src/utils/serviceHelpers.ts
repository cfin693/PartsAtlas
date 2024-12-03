import { Job, ServiceMetrics } from '../types/jobs';

export const calculateServiceMetrics = (jobs: Job[]): ServiceMetrics => {
  const completedJobs = jobs.filter(job => job.status === 'Completed');
  
  return {
    totalJobs: jobs.length,
    completedJobs: completedJobs.length,
    averageCompletionTime: calculateAverageCompletionTime(completedJobs),
    customerSatisfactionRate: calculateSatisfactionRate(completedJobs),
    revenueGenerated: calculateRevenue(completedJobs)
  };
};

export const filterJobs = (jobs: Job[], filters: Partial<Job>): Job[] => {
  return jobs.filter(job => {
    return Object.entries(filters).every(([key, value]) => {
      if (!value) return true;
      return job[key as keyof Job] === value;
    });
  });
};

export const sortJobs = (jobs: Job[], sortBy: keyof Job, order: 'asc' | 'desc'): Job[] => {
  return [...jobs].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (order === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    }
    return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  });
};

const calculateAverageCompletionTime = (jobs: Job[]): number => {
  if (jobs.length === 0) return 0;
  // Implementation would calculate average time between creation and completion
  return 0;
};

const calculateSatisfactionRate = (jobs: Job[]): number => {
  if (jobs.length === 0) return 0;
  // Implementation would calculate satisfaction based on feedback
  return 0;
};

const calculateRevenue = (jobs: Job[]): number => {
  if (jobs.length === 0) return 0;
  // Implementation would calculate total revenue from completed jobs
  return 0;
};