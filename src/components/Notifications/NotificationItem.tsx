import React from 'react';
import { CheckCircle, AlertTriangle, Clock, Wrench, Package, UserPlus } from 'lucide-react';
import { Notification, NotificationType } from '../../types/notifications';
import { formatDistanceToNow } from 'date-fns';

interface NotificationItemProps {
  notification: Notification;
  onMarkAsRead: (id: string) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({
  notification,
  onMarkAsRead,
}) => {
  const getIcon = (type: NotificationType) => {
    switch (type) {
      case 'NEW_CHECKIN':
        return <UserPlus className="w-5 h-5 text-green-500" />;
      case 'PARTS_UPDATE':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'SERVICE_COMPLETED':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'PARTS_BACKORDER':
        return <AlertTriangle className="w-5 h-5 text-yellow-500" />;
      case 'TECH_REASSIGNMENT':
        return <Wrench className="w-5 h-5 text-orange-500" />;
      case 'SERVICE_DUE':
        return <Clock className="w-5 h-5 text-purple-500" />;
      default:
        return <AlertTriangle className="w-5 h-5 text-gray-500" />;
    }
  };

  return (
    <div
      className={`p-4 hover:bg-gray-50 ${
        !notification.read ? 'bg-blue-50' : ''
      }`}
      onClick={() => onMarkAsRead(notification.id)}
    >
      <div className="flex items-start">
        <div className="flex-shrink-0">
          {getIcon(notification.type)}
        </div>
        <div className="ml-3 flex-1">
          <p className="text-sm font-medium text-gray-900">
            {notification.title}
          </p>
          <p className="mt-1 text-sm text-gray-500">
            {notification.message}
          </p>
          <p className="mt-1 text-xs text-gray-400">
            {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;