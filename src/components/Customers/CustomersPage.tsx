import React, { useState } from 'react';
import { Users, MessageSquare, Bell, Settings } from 'lucide-react';
import CustomerList from './CustomerList';
import CustomerProfile from './CustomerProfile';
import CheckInRequests from './CheckInRequests';
import CommunicationCenter from './CommunicationCenter';
import PreferencesPanel from './PreferencesPanel';
import { Customer } from '../../types/customers';

const CustomersPage: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [activeTab, setActiveTab] = useState<'profile' | 'check-ins' | 'communication' | 'preferences'>('profile');

  const handleCustomerSelect = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  const renderTabContent = () => {
    if (!selectedCustomer) return null;

    switch (activeTab) {
      case 'profile':
        return <CustomerProfile customer={selectedCustomer} />;
      case 'check-ins':
        return <CheckInRequests customerId={selectedCustomer.id} />;
      case 'communication':
        return <CommunicationCenter customer={selectedCustomer} />;
      case 'preferences':
        return <PreferencesPanel customer={selectedCustomer} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Customers</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Customers</p>
              <p className="text-2xl font-bold">1,234</p>
            </div>
            <Users className="w-8 h-8 text-[#004aad]" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Active Services</p>
              <p className="text-2xl font-bold text-green-600">45</p>
            </div>
            <Bell className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Pending Follow-ups</p>
              <p className="text-2xl font-bold text-yellow-600">12</p>
            </div>
            <MessageSquare className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Marketing Opt-ins</p>
              <p className="text-2xl font-bold text-blue-600">856</p>
            </div>
            <Settings className="w-8 h-8 text-blue-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Customer List */}
        <div className="lg:col-span-1">
          <CustomerList onCustomerSelect={handleCustomerSelect} selectedCustomer={selectedCustomer} />
        </div>

        {/* Customer Details */}
        <div className="lg:col-span-2">
          {selectedCustomer ? (
            <div className="bg-white rounded-lg shadow-md">
              {/* Tabs */}
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('profile')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'profile'
                        ? 'border-b-2 border-[#004aad] text-[#004aad]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Profile
                  </button>
                  <button
                    onClick={() => setActiveTab('check-ins')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'check-ins'
                        ? 'border-b-2 border-[#004aad] text-[#004aad]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Check-ins
                  </button>
                  <button
                    onClick={() => setActiveTab('communication')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'communication'
                        ? 'border-b-2 border-[#004aad] text-[#004aad]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Communication
                  </button>
                  <button
                    onClick={() => setActiveTab('preferences')}
                    className={`py-4 px-6 text-sm font-medium ${
                      activeTab === 'preferences'
                        ? 'border-b-2 border-[#004aad] text-[#004aad]'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    Preferences
                  </button>
                </nav>
              </div>

              {/* Tab Content */}
              <div className="p-6">
                {renderTabContent()}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-lg shadow-md p-6 text-center text-gray-500">
              Select a customer to view details
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CustomersPage;