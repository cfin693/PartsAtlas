import React from 'react';
import { Thermometer, Battery, AlertTriangle } from 'lucide-react';

const EquipmentStatus: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Equipment Status</h2>
      <div className="space-y-4">
        <div className="flex items-center">
          <Thermometer className="w-6 h-6 mr-2 text-[#004aad]" />
          <span>Engine Temperature: 92°C</span>
        </div>
        <div className="flex items-center">
          <Battery className="w-6 h-6 mr-2 text-[#004aad]" />
          <span>Battery Level: 78%</span>
        </div>
        <div className="flex items-center">
          <AlertTriangle className="w-6 h-6 mr-2 text-[#004aad]" />
          <span>Oil Pressure: Normal</span>
        </div>
      </div>
    </div>
  );
};

export default EquipmentStatus;