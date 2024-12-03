import { useState, useEffect } from 'react';
import { NotificationType, NotificationSettings } from '../types/notifications';

const defaultSettings: NotificationSettings = {
  NEW_CHECKIN: true,
  PARTS_UPDATE: true,
  SERVICE_COMPLETED: true,
  PARTS_BACKORDER: true,
  TECH_REASSIGNMENT: true,
  SERVICE_DUE: true,
  CUSTOM: true,
};

export const useNotificationSettings = () => {
  const [settings, setSettings] = useState<NotificationSettings>(() => {
    const savedSettings = localStorage.getItem('notificationSettings');
    return savedSettings ? JSON.parse(savedSettings) : defaultSettings;
  });

  useEffect(() => {
    localStorage.setItem('notificationSettings', JSON.stringify(settings));
  }, [settings]);

  const updateSettings = (type: NotificationType, enabled: boolean) => {
    setSettings(prev => ({
      ...prev,
      [type]: enabled,
    }));
  };

  return {
    settings,
    updateSettings,
  };
};

export default useNotificationSettings;