import React from 'react';
import { Medal, Award } from 'lucide-react';

const Leaderboard: React.FC = () => {
  const leaderboardData = [
    { id: 1, name: 'John Smith', points: 2500, rank: 1 },
    { id: 2, name: 'Sarah Johnson', points: 2350, rank: 2 },
    { id: 3, name: 'Mike Wilson', points: 2200, rank: 3 },
    { id: 4, name: 'Emily Brown', points: 2100, rank: 4 },
    { id: 5, name: 'David Lee', points: 2000, rank: 5 },
  ];

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1:
        return 'text-yellow-500';
      case 2:
        return 'text-gray-400';
      case 3:
        return 'text-amber-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Leaderboard</h2>
        <Award className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="space-y-4">
        {leaderboardData.map((tech) => (
          <div
            key={tech.id}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <div className="flex items-center space-x-4">
              <div className={`font-bold ${getRankColor(tech.rank)}`}>
                {tech.rank === 1 && <Medal className="w-6 h-6" />}
                {tech.rank > 1 && `#${tech.rank}`}
              </div>
              <div>
                <div className="font-semibold">{tech.name}</div>
                <div className="text-sm text-gray-600">{tech.points} XP</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;