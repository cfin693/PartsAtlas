import React from 'react';
import EquipmentStatus from './EquipmentStatus';
import AlertsAndMaintenance from './AlertsAndMaintenance';
import InteractiveGraph from './InteractiveGraph';

const IoTDetail: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">IoT Equipment Detail</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <EquipmentStatus />
        <AlertsAndMaintenance />
      </div>
      <InteractiveGraph />
    </div>
  );
};

export default IoTDetail;