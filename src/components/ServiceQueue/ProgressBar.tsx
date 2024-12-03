import React from 'react';

export type ServiceStage = 'check-in' | 'diagnostics' | 'parts' | 'repair' | 'testing' | 'pickup';

interface ProgressBarProps {
  currentStage: ServiceStage;
  onClick: (stage: ServiceStage) => void;
}

const stages: { key: ServiceStage; label: string }[] = [
  { key: 'check-in', label: 'Check-In' },
  { key: 'diagnostics', label: 'Diagnostics' },
  { key: 'parts', label: 'Parts' },
  { key: 'repair', label: 'Repair' },
  { key: 'testing', label: 'Testing' },
  { key: 'pickup', label: 'Ready for Pickup' }
];

const ProgressBar: React.FC<ProgressBarProps> = ({ currentStage, onClick }) => {
  const currentIndex = stages.findIndex(stage => stage.key === currentStage);

  return (
    <div className="w-full py-4">
      <div className="relative">
        {/* Progress Bar Background */}
        <div className="h-2 bg-gray-200 rounded-full" />

        {/* Filled Progress */}
        <div
          className="absolute top-0 h-2 bg-[#004aad] rounded-full transition-all duration-500"
          style={{ width: `${((currentIndex + 1) / stages.length) * 100}%` }}
        />

        {/* Stage Markers */}
        <div className="relative -mt-3">
          {stages.map((stage, index) => {
            const isCompleted = index <= currentIndex;
            const isCurrent = index === currentIndex;

            return (
              <button
                key={stage.key}
                onClick={() => onClick(stage.key)}
                className={`absolute transform -translate-x-1/2 flex flex-col items-center ${
                  index === 0 ? 'left-0' :
                  index === stages.length - 1 ? 'right-0' :
                  `left-[${(index / (stages.length - 1)) * 100}%]`
                }`}
                style={{ left: `${(index / (stages.length - 1)) * 100}%` }}
              >
                <div
                  className={`w-6 h-6 rounded-full border-2 ${
                    isCurrent
                      ? 'border-[#004aad] bg-white'
                      : isCompleted
                      ? 'border-[#004aad] bg-[#004aad]'
                      : 'border-gray-300 bg-white'
                  } transition-colors duration-300`}
                />
                <span className={`mt-2 text-xs font-medium ${
                  isCurrent ? 'text-[#004aad]' :
                  isCompleted ? 'text-gray-700' :
                  'text-gray-400'
                }`}>
                  {stage.label}
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;