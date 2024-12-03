import React, { useState } from 'react';
import { useServiceQueueContext } from '../contexts/ServiceQueueContext';
import { Job } from '../types/jobs';
import { ServiceStage } from './ServiceQueue/types';
import ServiceDetails from './ServiceQueue/ServiceDetails';
import ServiceStages from './ServiceQueue/ServiceStages';
import ServiceQueueList from './ServiceQueue/ServiceQueueList';
import useNotifications from '../hooks/useNotifications';

const ServiceQueuePage: React.FC = () => {
  const { jobs, updateJobStage } = useServiceQueueContext();
  const { addNotification } = useNotifications();
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleStageChange = (stage: ServiceStage) => {
    if (selectedJob) {
      updateJobStage(selectedJob.id, stage);
      
      addNotification({
        type: 'SERVICE_UPDATE',
        title: 'Service Stage Updated',
        message: `${selectedJob.customerName}'s ${selectedJob.make} ${selectedJob.model} moved to ${stage}`,
        read: false,
        priority: 'low'
      });
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Service Queue</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Service Queue List */}
        <div className="lg:col-span-1">
          <ServiceQueueList
            jobs={jobs}
            selectedJob={selectedJob}
            onJobSelect={handleJobSelect}
          />
        </div>

        {/* Right Column - Job Details */}
        <div className="lg:col-span-2">
          {selectedJob ? (
            <div className="space-y-6">
              <ServiceStages
                currentStage={selectedJob.stage}
                completedStages={selectedJob.completedStages}
                onStageChange={handleStageChange}
              />
              <ServiceDetails job={selectedJob} />
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select a job to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ServiceQueuePage;