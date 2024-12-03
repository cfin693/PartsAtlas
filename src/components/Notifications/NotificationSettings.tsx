import React, { useState } from 'react';
import { useNotificationSettings } from '../../hooks/useNotificationSettings';
import { NotificationType } from '../../types/notifications';

interface NotificationSettingsProps {
  onClose: () => void;
}

const NotificationSettings: React.FC<NotificationSettingsProps> = ({ onClose }) => {
  const { settings, updateSettings } = useNotificationSettings();

  const notificationTypes = [
    { type: 'NEW_CHECKIN' as NotificationType, label: 'New Check-ins' },
    { type: 'PARTS_UPDATE' as NotificationType, label: 'Parts Updates' },
    { type: 'SERVICE_COMPLETED' as NotificationType, label: 'Service Completed' },
    { type: 'PARTS_BACKORDER' as NotificationType, label: 'Parts Backordered' },
    { type: 'TECH_REASSIGNMENT' as NotificationType, label: 'Technician Reassignments' },
    { type: 'SERVICE_DUE' as NotificationType, label: 'Service Due Reminders' },
  ];

  return (
    <div className="p-4">
      <h4 className="text-lg font-medium mb-4">Notification Preferences</h4>
      <div className="space-y-4">
        {notificationTypes.map(({ type, label }) => (
          <div key={type} className="flex items-center justify-between">
            <span className="text-sm text-gray-700">{label}</span>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={settings[type]}
                onChange={(e) => updateSettings(type, e.target.checked)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
            </label>
          </div>
        ))}
      </div>
      <div className="mt-6">
        <button
          onClick={onClose}
          className="w-full bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f]"
        >
          Save Preferences
        </button>
      </div>
    </div>
  );
};

export default NotificationSettings;