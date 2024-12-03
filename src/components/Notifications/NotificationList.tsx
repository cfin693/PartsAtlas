import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Wrench, Package, UserPlus } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notifications';
import NotificationItem from './NotificationItem';

interface NotificationListProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationList: React.FC<NotificationListProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  if (notifications.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500">
        No notifications
      </div>
    );
  }

  return (
    <div className="max-h-96 overflow-y-auto">
      <div className="p-2">
        <button
          onClick={onClearAll}
          className="text-sm text-gray-600 hover:text-gray-800"
        >
          Clear all
        </button>
      </div>
      <div className="divide-y divide-gray-200">
        {notifications.map((notification) => (
          <NotificationItem
            key={notification.id}
            notification={notification}
            onMarkAsRead={onMarkAsRead}
          />
        ))}
      </div>
    </div>
  );
};

export default NotificationList;