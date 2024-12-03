export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  level: {
    current: number;
    title: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
    points: number;
    nextLevelPoints: number;
  };
  badges: Badge[];
  skills: Skill[];
  performance: {
    completedJobs: number;
    averageRating: number;
    customerSatisfaction: number;
    efficiency: number;
  };
  challenges: Challenge[];
  achievements: Achievement[];
  kudos: Kudos[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  dateEarned: string;
}

export interface Skill {
  id: string;
  name: string;
  level: number;
  certifications: string[];
}

export interface Challenge {
  id: string;
  title: string;
  description: string;
  type: 'daily' | 'weekly' | 'monthly';
  progress: number;
  target: number;
  reward: {
    points: number;
    badges?: string[];
  };
  expiresAt: string;
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  dateEarned: string;
  icon: string;
}

export interface Kudos {
  id: string;
  fromTechnician: string;
  message: string;
  date: string;
}