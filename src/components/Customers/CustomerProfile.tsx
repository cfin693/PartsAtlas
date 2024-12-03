import React from 'react';
import { User, MapPin, Wrench, Calendar, Mail, Phone } from 'lucide-react';
import { Customer } from '../../types/customers';
import { format } from 'date-fns';

interface CustomerProfileProps {
  customer: Customer;
}

const CustomerProfile: React.FC<CustomerProfileProps> = ({ customer }) => {
  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    try {
      return format(new Date(dateString), 'MMM dd, yyyy');
    } catch (error) {
      return 'Invalid Date';
    }
  };

  const customerSince = customer.createdAt ? formatDate(customer.createdAt) : 'N/A';

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="bg-gray-100 p-3 rounded-full">
            <User className="w-8 h-8 text-gray-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{customer.name}</h2>
            <p className="text-gray-500">Customer since {customerSince}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Information</h3>
            <div className="space-y-3">
              <p className="flex items-center text-gray-600">
                <Mail className="w-5 h-5 mr-2" />
                {customer.email}
              </p>
              <p className="flex items-center text-gray-600">
                <Phone className="w-5 h-5 mr-2" />
                {customer.phone}
              </p>
              <p className="flex items-center text-gray-600">
                <MapPin className="w-5 h-5 mr-2" />
                {customer.address}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Equipment</h3>
            <div className="space-y-4">
              {customer.equipment?.map(item => (
                <div key={item.id} className="border rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wrench className="w-5 h-5 text-gray-500" />
                    <span className="font-medium">{item.type}</span>
                  </div>
                  <p className="text-sm text-gray-600">Make: {item.make}</p>
                  <p className="text-sm text-gray-600">Model: {item.model}</p>
                  <p className="text-sm text-gray-600">Serial: {item.serialNumber}</p>
                </div>
              ))}
              {(!customer.equipment || customer.equipment.length === 0) && (
                <p className="text-gray-500 italic">No equipment registered</p>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Service History</h3>
        <div className="space-y-4">
          {customer.serviceHistory?.map((service, index) => (
            <div key={index} className="border-l-2 border-gray-200 pl-4">
              <div className="flex items-center space-x-2">
                <Calendar className="w-5 h-5 text-gray-500" />
                <span className="text-sm text-gray-500">
                  {formatDate(service.date)}
                </span>
              </div>
              <p className="mt-2 text-gray-600">{service.description}</p>
              <p className="text-sm text-gray-500">Technician: {service.technician}</p>
            </div>
          ))}
          {(!customer.serviceHistory || customer.serviceHistory.length === 0) && (
            <p className="text-gray-500 italic">No service history available</p>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Communication Preferences</h3>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span>Email Updates</span>
            <span className={`px-2 py-1 rounded ${
              customer.communicationPreferences?.email 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.communicationPreferences?.email ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>SMS Updates</span>
            <span className={`px-2 py-1 rounded ${
              customer.communicationPreferences?.sms 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.communicationPreferences?.sms ? 'Enabled' : 'Disabled'}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Phone Calls</span>
            <span className={`px-2 py-1 rounded ${
              customer.communicationPreferences?.phone 
                ? 'bg-green-100 text-green-800' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {customer.communicationPreferences?.phone ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerProfile;