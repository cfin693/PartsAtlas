import React from 'react';
import { Briefcase, Clock, CheckCircle, Calendar } from 'lucide-react';
import { Job } from '../types/jobs';

interface JobSummaryPanelProps {
  jobs: Job[];
}

const JobSummaryPanel: React.FC<JobSummaryPanelProps> = ({ jobs }) => {
  const inProgress = jobs?.filter(job => job.status === 'In Progress').length || 0;
  const pendingApproval = jobs?.filter(job => job.status === 'Pending Approval').length || 0;
  const completed = jobs?.filter(job => job.status === 'Completed').length || 0;
  const scheduled = jobs?.filter(job => job.status === 'Assigned').length || 0;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Job Summary</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center">
          <Briefcase className="w-8 h-8 text-[#004aad] mr-2" />
          <div>
            <p className="text-sm text-gray-600">In Progress</p>
            <p className="text-2xl font-bold">{inProgress}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Clock className="w-8 h-8 text-[#004aad] mr-2" />
          <div>
            <p className="text-sm text-gray-600">Pending Approval</p>
            <p className="text-2xl font-bold">{pendingApproval}</p>
          </div>
        </div>
        <div className="flex items-center">
          <CheckCircle className="w-8 h-8 text-[#004aad] mr-2" />
          <div>
            <p className="text-sm text-gray-600">Completed</p>
            <p className="text-2xl font-bold">{completed}</p>
          </div>
        </div>
        <div className="flex items-center">
          <Calendar className="w-8 h-8 text-[#004aad] mr-2" />
          <div>
            <p className="text-sm text-gray-600">Scheduled</p>
            <p className="text-2xl font-bold">{scheduled}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobSummaryPanel;