export interface Job {
  id: string;
  customerName: string;
  contactInfo: string;
  equipmentType: string;
  make: string;
  model: string;
  serviceType: 'Repair' | 'Maintenance' | 'Warranty';
  status: 'Assigned' | 'In Progress' | 'Waiting on Parts' | 'Pending Approval' | 'Completed';
  priority: 'low' | 'medium' | 'high';
  estimatedCompletion: string;
  description: string;
  history: string[];
  purchaseDate?: string;
  serialNumber?: string;
  assignedTechnicianId?: string;
  condition?: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Non-Functional-End-Of-Life';
  stage: 'check-in' | 'diagnostics' | 'parts' | 'repair' | 'testing' | 'pickup';
  stageNotes: {
    'check-in'?: ServiceStageNote[];
    'diagnostics'?: ServiceStageNote[];
    'parts'?: ServiceStageNote[];
    'repair'?: ServiceStageNote[];
    'testing'?: ServiceStageNote[];
    'pickup'?: ServiceStageNote[];
  };
  completedStages: string[];
}

export interface ServiceStageNote {
  id: string;
  content: string;
  technicianId: string;
  technicianName: string;
  timestamp: string;
  isInternal: boolean;
}