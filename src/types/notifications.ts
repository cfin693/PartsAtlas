export type NotificationType = 
  | 'NEW_CHECKIN'
  | 'PARTS_UPDATE'
  | 'SERVICE_COMPLETED'
  | 'PARTS_BACKORDER'
  | 'TECH_REASSIGNMENT'
  | 'SERVICE_DUE'
  | 'SERVICE_UPDATE'
  | 'CUSTOM';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  priority?: 'low' | 'medium' | 'high';
  metadata?: Record<string, any>;
}

export interface NotificationSettings {
  [key in NotificationType]: boolean;
}