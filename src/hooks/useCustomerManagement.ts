import { useState, useCallback } from 'react';
import { Customer, Equipment, ServiceRecord } from '../types/customers';

export const useCustomerManagement = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const addCustomer = useCallback((customer: Customer) => {
    setCustomers(prev => [...prev, customer]);
  }, []);

  const updateCustomer = useCallback((customerId: string, updates: Partial<Customer>) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId ? { ...customer, ...updates } : customer
    ));
  }, []);

  const addEquipment = useCallback((customerId: string, equipment: Equipment) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId
        ? { ...customer, equipment: [...customer.equipment, equipment] }
        : customer
    ));
  }, []);

  const addServiceRecord = useCallback((
    customerId: string,
    equipmentId: string,
    record: ServiceRecord
  ) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id !== customerId) return customer;

      const updatedEquipment = customer.equipment.map(eq =>
        eq.id === equipmentId
          ? {
              ...eq,
              maintenanceSchedule: eq.maintenanceSchedule.map(schedule =>
                schedule.type === record.type
                  ? { ...schedule, lastPerformed: record.date }
                  : schedule
              )
            }
          : eq
      );

      return {
        ...customer,
        equipment: updatedEquipment,
        serviceHistory: [...customer.serviceHistory, record],
        totalSpent: customer.totalSpent + record.cost,
        loyaltyPoints: customer.loyaltyPoints + Math.floor(record.cost / 10)
      };
    }));
  }, []);

  const updateMaintenanceSchedule = useCallback((
    customerId: string,
    equipmentId: string,
    scheduleUpdates: Partial<Equipment['maintenanceSchedule'][0]>[]
  ) => {
    setCustomers(prev => prev.map(customer => {
      if (customer.id !== customerId) return customer;

      const updatedEquipment = customer.equipment.map(eq =>
        eq.id === equipmentId
          ? {
              ...eq,
              maintenanceSchedule: eq.maintenanceSchedule.map((schedule, index) => ({
                ...schedule,
                ...scheduleUpdates[index]
              }))
            }
          : eq
      );

      return { ...customer, equipment: updatedEquipment };
    }));
  }, []);

  const addCustomerNote = useCallback((
    customerId: string,
    note: Customer['notes'][0]
  ) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId
        ? { ...customer, notes: [...customer.notes, note] }
        : customer
    ));
  }, []);

  const getUpcomingMaintenance = useCallback((days: number = 30) => {
    const now = new Date();
    const future = new Date(now.setDate(now.getDate() + days));

    return customers.flatMap(customer =>
      customer.equipment.flatMap(equipment =>
        equipment.maintenanceSchedule
          .filter(schedule => {
            const dueDate = new Date(schedule.nextDue);
            return dueDate <= future && schedule.status !== 'completed';
          })
          .map(schedule => ({
            customerId: customer.id,
            customerName: customer.name,
            equipmentId: equipment.id,
            equipmentInfo: `${equipment.make} ${equipment.model}`,
            schedule
          }))
      )
    );
  }, [customers]);

  return {
    customers,
    addCustomer,
    updateCustomer,
    addEquipment,
    addServiceRecord,
    updateMaintenanceSchedule,
    addCustomerNote,
    getUpcomingMaintenance
  };
};