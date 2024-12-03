import React from 'react';
import { Phone, Mail, Tool, Clock, AlertTriangle } from 'lucide-react';
import { Job } from '../../types/jobs';
import { useCustomerContext } from '../../contexts/CustomerContext';
import { format } from 'date-fns';

interface CustomerInfoPanelProps {
  job: Job;
}

const CustomerInfoPanel: React.FC<CustomerInfoPanelProps> = ({ job }) => {
  const { getCustomerByJob, getCustomerServiceHistory } = useCustomerContext();
  const customer = getCustomerByJob(job);
  
  const serviceHistory = customer ? getCustomerServiceHistory(customer.id) : [];
  const hasRecentServices = serviceHistory.length > 0;
  const lastService = hasRecentServices ? serviceHistory[serviceHistory.length - 1] : null;

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
      
      <div className="space-y-4">
        {/* Contact Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Contact Details</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Phone className="w-4 h-4 text-gray-400 mr-2" />
              <span>{job.contactInfo.split('|')[1].trim()}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-4 h-4 text-gray-400 mr-2" />
              <span>{job.contactInfo.split('|')[0].trim()}</span>
            </div>
          </div>
        </div>

        {/* Equipment Information */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Equipment Details</h4>
          <div className="space-y-2">
            <div className="flex items-center">
              <Tool className="w-4 h-4 text-gray-400 mr-2" />
              <span>{job.make} {job.model}</span>
            </div>
            {job.serialNumber && (
              <div className="text-sm text-gray-600">
                Serial: {job.serialNumber}
              </div>
            )}
            {job.purchaseDate && (
              <div className="text-sm text-gray-600">
                Purchased: {format(new Date(job.purchaseDate), 'MMM dd, yyyy')}
              </div>
            )}
          </div>
        </div>

        {/* Service History */}
        <div>
          <h4 className="text-sm font-medium text-gray-500 mb-2">Service History</h4>
          {hasRecentServices ? (
            <div className="space-y-2">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-gray-400 mr-2" />
                <span>Last Service: {format(new Date(lastService.date), 'MMM dd, yyyy')}</span>
              </div>
              <div className="text-sm text-gray-600">
                Total Services: {serviceHistory.length}
              </div>
            </div>
          ) : (
            <div className="text-sm text-gray-500 italic">No previous service history</div>
          )}
        </div>

        {/* Special Notes */}
        {customer?.notes && customer.notes.length > 0 && (
          <div>
            <h4 className="text-sm font-medium text-gray-500 mb-2">Special Notes</h4>
            <div className="bg-yellow-50 p-3 rounded-md">
              <div className="flex items-start">
                <AlertTriangle className="w-4 h-4 text-yellow-400 mr-2 mt-0.5" />
                <p className="text-sm text-yellow-700">{customer.notes[customer.notes.length - 1]}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerInfoPanel;