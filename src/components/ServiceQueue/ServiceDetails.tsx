import React from 'react';
import { Job } from '../../types/jobs';
import { Clock, Wrench, User, Phone, Mail } from 'lucide-react';
import ServiceNotes from './ServiceNotes';
import CheckInDetails from './StageDetails/CheckInDetails';
import DiagnosticsDetails from './StageDetails/DiagnosticsDetails';
import { useServiceQueueContext } from '../../contexts/ServiceQueueContext';

interface ServiceDetailsProps {
  job: Job;
}

const ServiceDetails: React.FC<ServiceDetailsProps> = ({ job }) => {
  const { updateJobStage } = useServiceQueueContext();

  const handleJobUpdate = (updates: Partial<Job>) => {
    // Update job with new details
    updateJobStage(job.id, job.stage, updates);
  };

  const renderStageDetails = () => {
    switch (job.stage) {
      case 'check-in':
        return <CheckInDetails job={job} onUpdate={handleJobUpdate} />;
      case 'diagnostics':
        return <DiagnosticsDetails job={job} onUpdate={handleJobUpdate} />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="space-y-6">
        {/* Customer Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.customerName}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.contactInfo.split('|')[1]}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.contactInfo.split('|')[0]}</span>
            </div>
          </div>
        </div>

        {/* Equipment Information */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Equipment Details</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Wrench className="w-4 h-4 mr-2 text-gray-400" />
              <span>{job.make} {job.model}</span>
            </div>
            <div className="flex items-center">
              <Clock className="w-4 h-4 mr-2 text-gray-400" />
              <span>Serial: {job.serialNumber}</span>
            </div>
          </div>
          <div className="mt-2">
            <p className="text-sm text-gray-600">{job.description}</p>
          </div>
        </div>

        {/* Stage-specific Details */}
        {renderStageDetails()}

        {/* Service Notes */}
        <ServiceNotes job={job} />
      </div>
    </div>
  );
};

export default ServiceDetails;