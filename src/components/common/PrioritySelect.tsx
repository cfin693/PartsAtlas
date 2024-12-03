import React from 'react';
import { Job } from '../Dashboard';
import { Flag } from 'lucide-react';

interface PrioritySelectProps {
  priority: Job['priority'];
  onChange: (priority: Job['priority']) => void;
}

const PrioritySelect: React.FC<PrioritySelectProps> = ({ priority, onChange }) => {
  const getPriorityColor = (priority: Job['priority']) => {
    switch (priority) {
      case 'high':
        return 'text-red-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-green-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="flex items-center">
      <Flag className={`w-4 h-4 mr-1 ${getPriorityColor(priority)}`} />
      <select
        value={priority}
        onChange={(e) => onChange(e.target.value as Job['priority'])}
        className="border-none bg-transparent focus:ring-0 text-sm"
        onClick={(e) => e.stopPropagation()}
      >
        <option value="low">Low Priority</option>
        <option value="medium">Medium Priority</option>
        <option value="high">High Priority</option>
      </select>
    </div>
  );
};

export default PrioritySelect;