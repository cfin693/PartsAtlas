import React from 'react';
import { Bell } from 'lucide-react';

const NotificationsPanel: React.FC = () => {
  const notifications = [
    { id: 1, message: 'New parts arrived for Job #1234' },
    { id: 2, message: 'Urgent: Job #5678 due in 2 hours' },
    { id: 3, message: 'Equipment maintenance alert for Asset #9012' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4 flex items-center">
        <Bell className="w-6 h-6 mr-2 text-[#004aad]" /> Notifications
      </h2>
      <ul className="space-y-2">
        {notifications.map((notification) => (
          <li key={notification.id} className="p-2 bg-gray-100 rounded">
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationsPanel;