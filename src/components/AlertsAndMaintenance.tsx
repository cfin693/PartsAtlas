import React from 'react';
import { AlertCircle, Wrench } from 'lucide-react';

const AlertsAndMaintenance: React.FC = () => {
  const alerts = [
    { id: 1, message: 'Air filter needs replacement soon' },
    { id: 2, message: 'Scheduled maintenance due in 500 miles' },
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Alerts & Maintenance</h2>
      <ul className="space-y-2">
        {alerts.map((alert) => (
          <li key={alert.id} className="flex items-center">
            <AlertCircle className="w-5 h-5 mr-2 text-[#004aad]" />
            <span>{alert.message}</span>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <h3 className="font-semibold mb-2">Recommended Parts:</h3>
        <ul className="list-disc list-inside">
          <li>Air Filter (Part #AF1234)</li>
          <li>Oil Filter (Part #OF5678)</li>
        </ul>
      </div>
    </div>
  );
};

export default AlertsAndMaintenance;