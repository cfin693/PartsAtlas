import React from 'react';
import TechnicianProfile from './TechnicianProfile';
import DailyChallenges from './DailyChallenges';
import Leaderboard from './Leaderboard';
import PerformanceMetrics from './PerformanceMetrics';

const TechniciansPage: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold mb-6">Technician Management</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="space-y-6">
          <TechnicianProfile />
          <DailyChallenges />
        </div>
        <div className="space-y-6">
          <Leaderboard />
          <PerformanceMetrics />
        </div>
      </div>
    </div>
  );
};

export default TechniciansPage;