import React from 'react';
import ExplodedView from './ExplodedView';
import AssemblyGuidance from './AssemblyGuidance';
import PartOrdering from './PartOrdering';

const ARParts: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">AR Parts Viewer</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ExplodedView />
        <div className="space-y-6">
          <AssemblyGuidance />
          <PartOrdering />
        </div>
      </div>
    </div>
  );
};

export default ARParts;