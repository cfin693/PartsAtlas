import { CheckInData } from './types';

export const validateCheckInData = (data: CheckInData) => {
  const errors: Partial<Record<keyof CheckInData, string>> = {};
  
  // Customer Information
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  
  // Email validation
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Invalid email format';
  }
  
  // Phone validation
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\+?[\d\s-()]+$/.test(data.phone)) {
    errors.phone = 'Invalid phone number format';
  }

  // Preferred contact method
  if (!data.preferredContact) {
    errors.preferredContact = 'Please select a preferred contact method';
  }
  
  // Equipment Information
  if (!data.serviceType) errors.serviceType = 'Service type is required';
  if (!data.urgencyLevel) errors.urgencyLevel = 'Urgency level is required';
  if (!data.make.trim()) errors.make = 'Equipment make is required';
  if (!data.model.trim()) errors.model = 'Equipment model is required';
  if (!data.serialNumber.trim()) errors.serialNumber = 'Serial number is required';
  if (!data.condition) errors.condition = 'Equipment condition is required';
  
  // Issue Details
  if (!data.issueDescription.trim()) {
    errors.issueDescription = 'Issue description is required';
  } else if (data.issueDescription.length < 10) {
    errors.issueDescription = 'Please provide a more detailed description (minimum 10 characters)';
  }

  // File validation
  if (data.attachments) {
    const maxSize = 10 * 1024 * 1024; // 10MB
    const invalidFiles = data.attachments.filter(file => file.size > maxSize);
    if (invalidFiles.length > 0) {
      errors.attachments = 'One or more files exceed the maximum size of 10MB';
    }
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};