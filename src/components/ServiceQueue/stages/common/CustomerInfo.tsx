```typescript
import React from 'react';
import { User, Phone, Mail, Tool } from 'lucide-react';
import { Job } from '../../../../types/jobs';

interface CustomerInfoProps {
  job: Job;
}

const CustomerInfo: React.FC<CustomerInfoProps> = ({ job }) => {
  const [email, phone] = job.contactInfo.split('|').map(s => s.trim());

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-2" />
              <span>{job.customerName}</span>
            </div>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-2" />
              <span>{email}</span>
            </div>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-2" />
              <span>{phone}</span>
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Equipment Details</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <Tool className="w-5 h-5 text-gray-400 mr-2" />
              <span>{job.make} {job.model}</span>
            </div>
            {job.serialNumber && (
              <div className="text-sm text-gray-600">
                Serial Number: {job.serialNumber}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfo;
```