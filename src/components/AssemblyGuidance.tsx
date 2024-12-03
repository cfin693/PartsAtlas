import React from 'react';
import { CheckCircle, Wrench } from 'lucide-react';

const AssemblyGuidance: React.FC = () => {
  const steps = [
    'Remove the old part carefully',
    'Clean the surrounding area',
    'Insert the new part',
    'Secure all connections',
    'Test the assembly',
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Assembly Guidance</h2>
      <ul className="space-y-2">
        {steps.map((step, index) => (
          <li key={index} className="flex items-center">
            <CheckCircle className="w-5 h-5 mr-2 text-[#004aad]" />
            <span>{step}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AssemblyGuidance;