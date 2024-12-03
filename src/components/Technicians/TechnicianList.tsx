import React, { useState } from 'react';
import { Search, User, Star, Award } from 'lucide-react';
import { Technician } from '../../types/technicians';

interface TechnicianListProps {
  onTechnicianSelect: (technician: Technician) => void;
  selectedTechnician: Technician | null;
}

const TechnicianList: React.FC<TechnicianListProps> = ({ onTechnicianSelect, selectedTechnician }) => {
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - replace with actual API call
  const technicians: Technician[] = [
    {
      id: '1',
      name: 'John Smith',
      email: 'john@example.com',
      phone: '555-0101',
      level: {
        current: 3,
        title: 'Gold',
        points: 7500,
        nextLevelPoints: 10000
      },
      badges: [
        {
          id: 'badge1',
          name: 'Engine Expert',
          description: 'Completed 50 engine repairs',
          icon: '🔧',
          dateEarned: '2024-01-15'
        }
      ],
      skills: [
        {
          id: 'skill1',
          name: 'Engine Repair',
          level: 5,
          certifications: ['Advanced Engine Repair']
        }
      ],
      performance: {
        completedJobs: 150,
        averageRating: 4.8,
        customerSatisfaction: 95,
        efficiency: 92
      },
      challenges: [],
      achievements: [],
      kudos: []
    },
    // Add more mock technicians
  ];

  const filteredTechnicians = technicians.filter(tech =>
    tech.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    tech.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLevelColor = (title: Technician['level']['title']) => {
    switch (title) {
      case 'Bronze':
        return 'text-orange-600';
      case 'Silver':
        return 'text-gray-500';
      case 'Gold':
        return 'text-yellow-500';
      case 'Platinum':
        return 'text-blue-500';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search technicians..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004aad]"
          />
        </div>
      </div>

      <div className="divide-y">
        {filteredTechnicians.map(technician => (
          <div
            key={technician.id}
            onClick={() => onTechnicianSelect(technician)}
            className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
              selectedTechnician?.id === technician.id ? 'bg-blue-50' : ''
            }`}
          >
            <div className="flex items-center space-x-4">
              <div className="bg-gray-100 p-2 rounded-full">
                <User className="w-6 h-6 text-gray-600" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">{technician.name}</h3>
                <div className="flex items-center space-x-2 mt-1">
                  <span className={`text-sm font-medium ${getLevelColor(technician.level.title)}`}>
                    {technician.level.title}
                  </span>
                  <span className="text-sm text-gray-500">
                    Level {technician.level.current}
                  </span>
                </div>
                <div className="flex items-center mt-2 space-x-4">
                  <span className="flex items-center text-sm text-gray-500">
                    <Star className="w-4 h-4 text-yellow-400 mr-1" />
                    {technician.performance.averageRating}
                  </span>
                  <span className="flex items-center text-sm text-gray-500">
                    <Award className="w-4 h-4 text-purple-400 mr-1" />
                    {technician.badges.length} badges
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TechnicianList;