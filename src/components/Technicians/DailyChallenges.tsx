import React from 'react';
import { Trophy, Target, Clock, Star, Award } from 'lucide-react';

const DailyChallenges: React.FC = () => {
  const challenges = [
    {
      id: 1,
      title: 'Speed Demon',
      description: 'Complete 5 jobs under estimated time',
      progress: 3,
      total: 5,
      reward: '50 XP',
      icon: Clock,
    },
    {
      id: 2,
      title: 'Customer Champion',
      description: 'Receive 3 five-star ratings',
      progress: 2,
      total: 3,
      reward: '100 XP',
      icon: Star,
    },
    {
      id: 3,
      title: 'Efficiency Expert',
      description: 'Maintain 95% efficiency rate today',
      progress: 92,
      total: 95,
      reward: '75 XP',
      icon: Award,
    },
  ];

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Daily Challenges</h2>
        <Trophy className="w-6 h-6 text-yellow-500" />
      </div>

      <div className="space-y-6">
        {challenges.map((challenge) => {
          const Icon = challenge.icon;
          const progress = (challenge.progress / challenge.total) * 100;

          return (
            <div key={challenge.id} className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center">
                  <Icon className="w-5 h-5 text-blue-500 mr-2" />
                  <h3 className="font-semibold">{challenge.title}</h3>
                </div>
                <span className="text-sm font-medium text-green-500">{challenge.reward}</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">{challenge.description}</p>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {Math.round(progress)}%
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-blue-600">
                      {challenge.progress}/{challenge.total}
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-blue-100">
                  <div
                    style={{ width: `${progress}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500"
                  ></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DailyChallenges;