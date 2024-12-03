import React from 'react';
import { CheckCircle, Wrench, Package, Settings, TestTube, UserCheck } from 'lucide-react';
import { ServiceStage, SERVICE_STAGES } from './types';

interface ServiceStagesProps {
  currentStage: ServiceStage;
  completedStages: string[];
  onStageChange: (stage: ServiceStage) => void;
}

const ServiceStages: React.FC<ServiceStagesProps> = ({
  currentStage,
  completedStages,
  onStageChange
}) => {
  const getStageIcon = (stageId: ServiceStage) => {
    switch (stageId) {
      case 'check-in':
        return <CheckCircle className="w-5 h-5" />;
      case 'diagnostics':
        return <Wrench className="w-5 h-5" />;
      case 'parts':
        return <Package className="w-5 h-5" />;
      case 'repair':
        return <Settings className="w-5 h-5" />;
      case 'testing':
        return <TestTube className="w-5 h-5" />;
      case 'pickup':
        return <UserCheck className="w-5 h-5" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="absolute top-1/2 left-0 right-0 h-1 bg-gray-200 -translate-y-1/2" />
        
        {/* Active Progress Bar */}
        <div 
          className="absolute top-1/2 left-0 h-1 bg-[#004aad] -translate-y-1/2 transition-all duration-500"
          style={{ 
            width: `${((completedStages.length + (currentStage ? 1 : 0)) / SERVICE_STAGES.length) * 100}%`
          }} 
        />

        {/* Stages */}
        <div className="relative flex justify-between">
          {SERVICE_STAGES.map(({ id, label }) => {
            const isCompleted = completedStages.includes(id);
            const isCurrent = id === currentStage;
            
            return (
              <button
                key={id}
                onClick={() => onStageChange(id)}
                className="flex flex-col items-center"
              >
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-colors duration-200 ${
                    isCompleted ? 'bg-[#004aad] text-white' :
                    isCurrent ? 'bg-blue-100 text-[#004aad] ring-2 ring-[#004aad]' :
                    'bg-gray-100 text-gray-400'
                  }`}
                >
                  {getStageIcon(id)}
                </div>
                <span className={`mt-2 text-sm font-medium ${
                  isCompleted ? 'text-[#004aad]' :
                  isCurrent ? 'text-[#004aad]' :
                  'text-gray-400'
                }`}>
                  {label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ServiceStages;