import { useState, useCallback } from 'react';
import { useCustomerContext } from '../contexts/CustomerContext';
import { useServiceQueueContext } from '../contexts/ServiceQueueContext';
import { CheckInData } from '../components/CustomerCheckIn/types';
import { Customer, Equipment, ServiceRecord } from '../types/customers';
import { Job } from '../types/jobs';

export const useServiceSync = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { addCustomer, updateCustomer, addEquipment, addServiceRecord } = useCustomerContext();
  const { addJob } = useServiceQueueContext();

  const createCustomerFromCheckIn = useCallback((checkInData: CheckInData): Customer => {
    const now = new Date().toISOString();
    return {
      id: `customer-${Date.now()}`,
      name: `${checkInData.firstName} ${checkInData.lastName}`,
      email: checkInData.email,
      phone: checkInData.phone,
      address: '',
      createdAt: now,
      communicationPreferences: {
        email: checkInData.emailUpdates,
        sms: checkInData.smsUpdates,
        phone: true
      },
      marketingConsent: checkInData.marketingConsent,
      equipment: [],
      serviceHistory: []
    };
  }, []);

  const createEquipmentFromCheckIn = useCallback((checkInData: CheckInData): Equipment => {
    return {
      id: `equipment-${Date.now()}`,
      type: checkInData.make,
      make: checkInData.make,
      model: checkInData.model,
      serialNumber: checkInData.serialNumber,
      purchaseDate: checkInData.purchaseDate
    };
  }, []);

  const createServiceJob = useCallback((
    customer: Customer,
    equipment: Equipment,
    checkInData: CheckInData
  ): Job => {
    const now = new Date().toISOString();
    return {
      id: `job-${Date.now()}`,
      customerName: customer.name,
      contactInfo: `${customer.email} | ${customer.phone}`,
      equipmentType: `${equipment.make} ${equipment.model}`,
      make: equipment.make,
      model: equipment.model,
      serviceType: checkInData.serviceType as 'Repair' | 'Maintenance' | 'Warranty',
      status: 'Assigned',
      priority: checkInData.serviceType === 'Repair' ? 'high' : 'medium',
      estimatedCompletion: 'TBD',
      description: checkInData.issueDescription,
      history: [`${now}: Customer check-in completed`],
      serialNumber: equipment.serialNumber,
      purchaseDate: equipment.purchaseDate,
      condition: checkInData.condition as Job['condition']
    };
  }, []);

  const createServiceRecord = useCallback((
    checkInData: CheckInData,
    jobId: string
  ): ServiceRecord => {
    return {
      id: `service-${Date.now()}`,
      date: new Date().toISOString(),
      description: checkInData.issueDescription,
      technician: 'Unassigned',
      status: 'in-progress',
      parts: [],
      cost: 0
    };
  }, []);

  const syncCheckInWithServices = useCallback(async (checkInData: CheckInData) => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Create all necessary records
      const customer = createCustomerFromCheckIn(checkInData);
      const equipment = createEquipmentFromCheckIn(checkInData);
      const job = createServiceJob(customer, equipment, checkInData);
      const serviceRecord = createServiceRecord(checkInData, job.id);

      // Add everything to the system
      addCustomer(customer);
      addEquipment(customer.id, equipment);
      addServiceRecord(customer.id, equipment.id, serviceRecord);
      addJob(job);

      return {
        customer,
        equipment,
        job,
        serviceRecord
      };
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Failed to sync check-in data';
      setError(errorMessage);
      throw new Error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  }, [
    addCustomer,
    addEquipment,
    addJob,
    addServiceRecord,
    createCustomerFromCheckIn,
    createEquipmentFromCheckIn,
    createServiceJob,
    createServiceRecord
  ]);

  return {
    isSubmitting,
    error,
    syncCheckInWithServices
  };
};