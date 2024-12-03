import React from 'react';
import { ServiceStage, SERVICE_STAGES } from './types';
import { CheckCircle, Circle } from 'lucide-react';

interface StageProgressProps {
  currentStage: ServiceStage;
  completedStages: string[];
  onStageSelect: (stage: ServiceStage) => void;
}

const StageProgress: React.FC<StageProgressProps> = ({
  currentStage,
  completedStages,
  onStageSelect
}) => {
  return (
    <div className="relative">
      {/* Progress Bar Background */}
      <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 transform -translate-y-1/2" />
      
      {/* Active Progress Bar */}
      <div 
        className="absolute top-1/2 left-0 h-1 bg-[#004aad] transform -translate-y-1/2 transition-all duration-500"
        style={{ 
          width: `${((SERVICE_STAGES.findIndex(s => s.id === currentStage) + 1) / SERVICE_STAGES.length) * 100}%` 
        }}
      />

      {/* Stage Markers */}
      <div className="relative flex justify-between">
        {SERVICE_STAGES.map((stage) => {
          const isCompleted = completedStages.includes(stage.id);
          const isCurrent = currentStage === stage.id;
          const isClickable = isCompleted || isCurrent;

          return (
            <button
              key={stage.id}
              onClick={() => isClickable && onStageSelect(stage.id)}
              disabled={!isClickable}
              className={`flex flex-col items-center ${
                isClickable ? 'cursor-pointer' : 'cursor-not-allowed opacity-50'
              }`}
            >
              <div className={`
                w-10 h-10 rounded-full flex items-center justify-center relative z-10
                ${isCompleted ? 'bg-[#004aad] text-white' : 
                  isCurrent ? 'bg-white border-2 border-[#004aad] text-[#004aad]' : 
                  'bg-gray-200 text-gray-400'}
              `}>
                {isCompleted ? (
                  <CheckCircle className="w-6 h-6" />
                ) : (
                  <Circle className="w-6 h-6" />
                )}
              </div>
              <span className={`
                mt-2 text-sm font-medium
                ${isCompleted || isCurrent ? 'text-[#004aad]' : 'text-gray-400'}
              `}>
                {stage.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default StageProgress;