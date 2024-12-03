import React, { useState } from 'react';
import CustomerList from './CustomerList';
import CustomerProfile from './CustomerProfile';
import { Customer } from '../../types/customers';

const Customers: React.FC = () => {
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);

  const handleSelectCustomer = (customer: Customer) => {
    setSelectedCustomer(customer);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Customers</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <CustomerList onSelectCustomer={handleSelectCustomer} />
        </div>
        <div className="lg:col-span-2">
          {selectedCustomer ? (
            <CustomerProfile customer={selectedCustomer} />
          ) : (
            <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
              Select a customer to view their profile
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Customers;