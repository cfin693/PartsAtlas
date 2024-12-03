import { useState, useCallback } from 'react';
import { Job } from '../types/jobs';
import { CheckInData } from '../components/CustomerCheckIn/types';
import { validateCheckInData } from '../components/CustomerCheckIn/validation';

export const useCustomerService = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const createServiceJob = useCallback(async (formData: CheckInData): Promise<Job> => {
    const { isValid, errors } = validateCheckInData(formData);
    
    if (!isValid) {
      throw new Error('Invalid form data');
    }

    const jobId = `job-${Date.now()}`;
    const now = new Date().toISOString();

    const newJob: Job = {
      id: jobId,
      customerName: `${formData.firstName} ${formData.lastName}`,
      contactInfo: `${formData.email} | ${formData.phone}`,
      equipmentType: `${formData.make} ${formData.model}`,
      make: formData.make,
      model: formData.model,
      serviceType: formData.serviceType as 'Repair' | 'Maintenance' | 'Warranty',
      status: 'Assigned',
      priority: formData.serviceType === 'Repair' ? 'high' : 'medium',
      estimatedCompletion: 'TBD',
      description: formData.issueDescription,
      history: [`${now}: Customer check-in completed`],
      createdAt: now,
      updatedAt: now,
      notes: [],
      parts: []
    };

    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        try {
          if (!newJob.id || !newJob.customerName) {
            throw new Error('Failed to create service job');
          }
          resolve(newJob);
        } catch (error) {
          reject(error);
        }
      }, 1000);
    });
  }, []);

  const handleCheckIn = useCallback(async (
    formData: CheckInData,
    onSuccess: (job: Job) => void
  ): Promise<void> => {
    setIsSubmitting(true);
    setError(null);

    try {
      const newJob = await createServiceJob(formData);
      onSuccess(newJob);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to submit check-in';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [createServiceJob]);

  return {
    isSubmitting,
    error,
    handleCheckIn
  };
};