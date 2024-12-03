import React, { useState } from 'react';
import { Save, Bell, Mail, Phone, MessageSquare } from 'lucide-react';
import { Customer } from '../../types/customers';

interface PreferencesPanelProps {
  customer: Customer;
}

const PreferencesPanel: React.FC<PreferencesPanelProps> = ({ customer }) => {
  const [preferences, setPreferences] = useState({
    email: customer.communicationPreferences.email,
    sms: customer.communicationPreferences.sms,
    phone: customer.communicationPreferences.phone,
    marketingConsent: customer.marketingConsent
  });

  const handleSave = () => {
    // Handle saving preferences
    console.log('Saving preferences:', preferences);
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Communication Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-blue-500" />
              <div>
                <p className="font-medium">Email Communications</p>
                <p className="text-sm text-gray-500">Receive updates via email</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.email}
                onChange={(e) => setPreferences({ ...preferences, email: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <MessageSquare className="w-5 h-5 text-green-500" />
              <div>
                <p className="font-medium">SMS Notifications</p>
                <p className="text-sm text-gray-500">Receive updates via text message</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.sms}
                onChange={(e) => setPreferences({ ...preferences, sms: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-purple-500" />
              <div>
                <p className="font-medium">Phone Calls</p>
                <p className="text-sm text-gray-500">Receive updates via phone</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.phone}
                onChange={(e) => setPreferences({ ...preferences, phone: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Bell className="w-5 h-5 text-orange-500" />
              <div>
                <p className="font-medium">Marketing Communications</p>
                <p className="text-sm text-gray-500">Receive promotional updates and offers</p>
              </div>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={preferences.marketingConsent}
                onChange={(e) => setPreferences({ ...preferences, marketingConsent: e.target.checked })}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        </div>

        <div className="mt-6">
          <button
            onClick={handleSave}
            className="w-full bg-[#004aad] text-white px-4 py-2 rounded-md hover:bg-[#003c8f] flex items-center justify-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Save Preferences
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreferencesPanel;