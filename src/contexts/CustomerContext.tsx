import React, { createContext, useContext, useState, useCallback } from 'react';
import { Customer, Equipment, ServiceRecord } from '../types/customers';
import { Job } from '../types/jobs';

interface CustomerContextType {
  customers: Customer[];
  activeCustomers: Customer[];
  recentCustomers: Customer[];
  addCustomer: (customer: Customer) => void;
  updateCustomer: (customerId: string, updates: Partial<Customer>) => void;
  addEquipment: (customerId: string, equipment: Equipment) => void;
  addServiceRecord: (customerId: string, equipmentId: string, record: ServiceRecord) => void;
  getCustomerById: (customerId: string) => Customer | undefined;
  getCustomerByJob: (job: Job) => Customer | undefined;
  searchCustomers: (query: string) => Customer[];
  getCustomerServiceHistory: (customerId: string) => ServiceRecord[];
}

const CustomerContext = createContext<CustomerContextType | undefined>(undefined);

export const useCustomerContext = () => {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error('useCustomerContext must be used within a CustomerProvider');
  }
  return context;
};

export const CustomerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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
        ? {
            ...customer,
            equipment: [...(customer.equipment || []), equipment]
          }
        : customer
    ));
  }, []);

  const addServiceRecord = useCallback((customerId: string, equipmentId: string, record: ServiceRecord) => {
    setCustomers(prev => prev.map(customer =>
      customer.id === customerId
        ? {
            ...customer,
            serviceHistory: [...(customer.serviceHistory || []), record]
          }
        : customer
    ));
  }, []);

  const getCustomerById = useCallback((customerId: string) => {
    return customers.find(customer => customer.id === customerId);
  }, [customers]);

  const getCustomerByJob = useCallback((job: Job) => {
    return customers.find(customer => 
      customer.name === job.customerName || 
      customer.email === job.contactInfo.split('|')[0].trim() ||
      customer.phone === job.contactInfo.split('|')[1].trim()
    );
  }, [customers]);

  const searchCustomers = useCallback((query: string) => {
    const searchTerm = query.toLowerCase();
    return customers.filter(customer => 
      customer.name.toLowerCase().includes(searchTerm) ||
      customer.email.toLowerCase().includes(searchTerm) ||
      customer.phone.includes(searchTerm) ||
      customer.equipment?.some(eq => 
        eq.make.toLowerCase().includes(searchTerm) ||
        eq.model.toLowerCase().includes(searchTerm) ||
        eq.serialNumber.toLowerCase().includes(searchTerm)
      )
    );
  }, [customers]);

  const getCustomerServiceHistory = useCallback((customerId: string) => {
    const customer = customers.find(c => c.id === customerId);
    return customer?.serviceHistory || [];
  }, [customers]);

  // Get active customers (with ongoing services)
  const activeCustomers = customers.filter(customer => 
    customer.serviceHistory?.some(record => record.status === 'in-progress')
  );

  // Get recent customers (sorted by latest service date)
  const recentCustomers = [...customers].sort((a, b) => {
    const aLatest = a.serviceHistory?.[a.serviceHistory.length - 1]?.date || '';
    const bLatest = b.serviceHistory?.[b.serviceHistory.length - 1]?.date || '';
    return bLatest.localeCompare(aLatest);
  }).slice(0, 10);

  const value = {
    customers,
    activeCustomers,
    recentCustomers,
    addCustomer,
    updateCustomer,
    addEquipment,
    addServiceRecord,
    getCustomerById,
    getCustomerByJob,
    searchCustomers,
    getCustomerServiceHistory
  };

  return (
    <CustomerContext.Provider value={value}>
      {children}
    </CustomerContext.Provider>
  );
};