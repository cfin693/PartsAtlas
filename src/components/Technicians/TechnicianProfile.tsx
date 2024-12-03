import React from 'react';
import { Award, Star, Badge, Trophy, Wrench } from 'lucide-react';

const TechnicianProfile: React.FC = () => {
  const technicianData = {
    name: 'John Smith',
    level: 'Gold',
    experience: 2500,
    nextLevel: 3000,
    badges: [
      { id: 1, name: 'Engine Expert', icon: '🔧' },
      { id: 2, name: 'Customer Service Pro', icon: '⭐' },
      { id: 3, name: 'Quick Resolver', icon: '⚡' },
    ],
    certifications: [
      'Master Technician Level 3',
      'Electric Engine Specialist',
      'Safety Protocol Expert',
    ],
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Technician Profile</h2>
        <div className="flex items-center">
          <Trophy className="w-6 h-6 text-yellow-500 mr-2" />
          <span className="text-lg font-semibold text-yellow-500">{technicianData.level}</span>
        </div>
      </div>

      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-2xl text-white">{technicianData.name.charAt(0)}</span>
          </div>
          <div>
            <h3 className="text-xl font-semibold">{technicianData.name}</h3>
            <div className="flex items-center mt-1">
              <Star className="w-4 h-4 text-yellow-500 mr-1" />
              <span className="text-gray-600">Level {technicianData.level}</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2">Experience Progress</h4>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div 
              className="bg-blue-500 h-2.5 rounded-full"
              style={{ width: `${(technicianData.experience / technicianData.nextLevel) * 100}%` }}
            ></div>
          </div>
          <div className="text-sm text-gray-600 mt-1">
            {technicianData.experience} / {technicianData.nextLevel} XP
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Badge className="w-5 h-5 mr-2" />
            Earned Badges
          </h4>
          <div className="grid grid-cols-3 gap-4">
            {technicianData.badges.map((badge) => (
              <div key={badge.id} className="text-center p-2 bg-gray-50 rounded-lg">
                <div className="text-2xl mb-1">{badge.icon}</div>
                <div className="text-sm font-medium">{badge.name}</div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h4 className="font-semibold mb-2 flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Certifications
          </h4>
          <ul className="space-y-2">
            {technicianData.certifications.map((cert, index) => (
              <li key={index} className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                {cert}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TechnicianProfile;