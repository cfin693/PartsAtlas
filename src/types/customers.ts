export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  createdAt?: string;
  communicationPreferences: {
    email: boolean;
    sms: boolean;
    phone: boolean;
  };
  marketingConsent: boolean;
  equipment?: Equipment[];
  serviceHistory?: ServiceRecord[];
}

export interface Equipment {
  id: string;
  type: string;
  make: string;
  model: string;
  serialNumber: string;
  purchaseDate?: string;
}

export interface ServiceRecord {
  id: string;
  date: string;
  description: string;
  technician: string;
  parts?: ServicePart[];
  cost?: number;
  status: 'completed' | 'in-progress' | 'scheduled';
}

export interface ServicePart {
  id: string;
  name: string;
  partNumber: string;
  quantity: number;
  cost: number;
}

export interface CheckIn {
  id: string;
  date: string;
  equipmentId: string;
  issueDescription: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
}

export interface Communication {
  id: string;
  date: string;
  type: 'email' | 'sms' | 'phone';
  subject: string;
  content: string;
  status: 'sent' | 'failed' | 'pending';
}