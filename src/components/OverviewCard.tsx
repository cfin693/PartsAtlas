import React from 'react';

interface OverviewCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
}

const OverviewCard: React.FC<OverviewCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white rounded-lg shadow p-6 flex items-center">
      <div className="mr-4">{icon}</div>
      <div>
        <h3 className="text-lg font-semibold">{title}</h3>
        <p className="text-2xl font-bold">{value}</p>
      </div>
    </div>
  );
};

export default OverviewCard;