export type ServiceStage = 'check-in' | 'diagnostics' | 'parts' | 'repair' | 'testing' | 'pickup';

export interface ServiceStageConfig {
  id: ServiceStage;
  label: string;
  description: string;
  icon: string;
  requiredFields: string[];
}

export const SERVICE_STAGES: ServiceStageConfig[] = [
  {
    id: 'check-in',
    label: 'Check-In',
    description: 'Initial equipment inspection and documentation',
    icon: 'clipboard-list',
    requiredFields: ['condition', 'estimatedHours', 'severity']
  },
  {
    id: 'diagnostics',
    label: 'Diagnostics',
    description: 'Thorough evaluation of issues',
    icon: 'search',
    requiredFields: ['diagnosticFindings', 'testsCompleted']
  },
  {
    id: 'parts',
    label: 'Parts',
    description: 'Required parts identification and ordering',
    icon: 'package',
    requiredFields: ['partsRequired', 'partsOrdered']
  },
  {
    id: 'repair',
    label: 'Repair',
    description: 'Service and repair work',
    icon: 'wrench',
    requiredFields: ['repairTasks', 'timeSpent']
  },
  {
    id: 'testing',
    label: 'Testing',
    description: 'Quality assurance and testing',
    icon: 'check-circle',
    requiredFields: ['testResults', 'qualityChecks']
  },
  {
    id: 'pickup',
    label: 'Ready',
    description: 'Ready for customer pickup',
    icon: 'user-check',
    requiredFields: ['finalInspection', 'customerNotified']
  }
];

export interface StageValidation {
  isValid: boolean;
  errors: string[];
}

export interface StageData {
  [key: string]: any;
}

export interface StageNote {
  id: string;
  content: string;
  timestamp: string;
  technicianId: string;
  technicianName: string;
  isInternal: boolean;
  attachments?: string[];
}

export interface CheckInData extends StageData {
  condition: string;
  visibleDamage: boolean;
  missingParts: boolean;
  severity: 'minor' | 'moderate' | 'critical';
  estimatedHours: number;
  notes: string;
  photos: string[];
}

export interface DiagnosticData extends StageData {
  findings: string;
  testsCompleted: string[];
  issues: string[];
  recommendations: string;
  timeSpent: number;
}

export interface PartsData extends StageData {
  requiredParts: {
    partId: string;
    quantity: number;
    status: 'allocated' | 'ordered' | 'unavailable';
  }[];
  notes: string;
  totalCost: number;
}

export interface RepairData extends StageData {
  tasks: {
    id: string;
    description: string;
    completed: boolean;
    timeSpent: number;
  }[];
  notes: string;
  complications: string[];
}

export interface TestingData extends StageData {
  procedures: {
    id: string;
    description: string;
    result: 'pass' | 'fail';
    notes: string;
  }[];
  finalNotes: string;
  qualityChecks: string[];
}

export interface PickupData extends StageData {
  finalInspection: boolean;
  customerNotified: boolean;
  pickupInstructions: string;
  additionalNotes: string;
}