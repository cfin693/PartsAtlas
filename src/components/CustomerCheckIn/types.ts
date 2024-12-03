export interface CheckInData {
  // Customer Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  serviceUpdates: boolean;
  marketingConsent: boolean;
  preferredContact: 'email' | 'phone' | 'sms' | '';

  // Equipment Information
  serviceType: 'Repair' | 'Maintenance' | 'Tune-Up' | 'Warranty' | '';
  urgencyLevel: 'low' | 'medium' | 'high' | '';
  make: string;
  model: string;
  serialNumber: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Non-Functional-End-Of-Life' | '';

  // Issue Details
  issueDescription: string;
  specialRequests?: string;
}