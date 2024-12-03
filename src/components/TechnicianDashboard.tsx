import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import ServiceQueue from './ServiceQueue';
import JobSummaryPanel from './JobSummaryPanel';
import JobDetailsView from './JobDetailsView';

export interface Job {
  id: string;
  customerName: string;
  contactInfo: string;
  equipmentType: string;
  make: string;
  model: string;
  serviceType: 'Repair' | 'Maintenance' | 'Warranty';
  status: 'Assigned' | 'In Progress' | 'Waiting on Parts' | 'Pending Approval' | 'Completed';
  priority: 'low' | 'medium' | 'high';
  estimatedCompletion: string;
  description: string;
  history: string[];
}

const TechnicianDashboard: React.FC = () => {
  const [jobs, setJobs] = useState<Job[]>([
    {
      id: 'job1',
      customerName: 'Alice Johnson',
      contactInfo: 'alice@example.com | 555-0101',
      equipmentType: 'Chainsaw',
      make: 'STIHL',
      model: 'MS 170',
      serviceType: 'Repair',
      status: 'Assigned',
      priority: 'high',
      estimatedCompletion: '2023-04-15',
      description: 'Chain keeps coming loose during operation',
      history: ['2022-10-01: Regular maintenance performed'],
    },
    {
      id: 'job2',
      customerName: 'Bob Smith',
      contactInfo: 'bob@example.com | 555-0102',
      equipmentType: 'Lawn Mower',
      make: 'Honda',
      model: 'HRX217K6VKA',
      serviceType: 'Maintenance',
      status: 'In Progress',
      priority: 'medium',
      estimatedCompletion: '2023-04-14',
      description: 'Annual tune-up and blade sharpening',
      history: ['2022-05-15: Replaced air filter'],
    },
    {
      id: 'job3',
      customerName: 'Carol Davis',
      contactInfo: 'carol@example.com | 555-0103',
      equipmentType: 'Leaf Blower',
      make: 'ECHO',
      model: 'PB-2520',
      serviceType: 'Warranty',
      status: 'Waiting on Parts',
      priority: 'low',
      estimatedCompletion: '2023-04-18',
      description: 'Engine stalls after a few minutes of use',
      history: [],
    },
  ]);

  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const newJobs = Array.from(jobs);
    const [reorderedJob] = newJobs.splice(source.index, 1);
    newJobs.splice(destination.index, 0, reorderedJob);

    setJobs(newJobs);
  };

  const handleJobSelect = (job: Job) => {
    setSelectedJob(job);
  };

  const handleJobUpdate = (updatedJob: Job) => {
    const updatedJobs = jobs.map(job => job.id === updatedJob.id ? updatedJob : job);
    setJobs(updatedJobs);
    setSelectedJob(updatedJob);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Technician Dashboard</h1>
      <JobSummaryPanel jobs={jobs} />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <DragDropContext onDragEnd={onDragEnd}>
          <ServiceQueue jobs={jobs} onJobSelect={handleJobSelect} />
        </DragDropContext>
        {selectedJob && (
          <JobDetailsView job={selectedJob} onJobUpdate={handleJobUpdate} />
        )}
      </div>
    </div>
  );
};

export default TechnicianDashboard;