import React, { useState, useEffect } from 'react';
import { Search, User, Phone, Mail } from 'lucide-react';
import { Customer } from '../../types/customers';
import { useCustomerContext } from '../../contexts/CustomerContext';

interface CustomerListProps {
  onSelectCustomer: (customer: Customer) => void;
}

const CustomerList: React.FC<CustomerListProps> = ({ onSelectCustomer }) => {
  const { customers, searchCustomers } = useCustomerContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>(customers);

  useEffect(() => {
    if (searchTerm) {
      setFilteredCustomers(searchCustomers(searchTerm));
    } else {
      setFilteredCustomers(customers);
    }
  }, [searchTerm, customers, searchCustomers]);

  return (
    <div className="bg-white rounded-lg shadow">
      <div className="p-4 border-b">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Search customers..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004aad]"
          />
        </div>
      </div>

      <div className="divide-y">
        {filteredCustomers.length > 0 ? (
          filteredCustomers.map(customer => (
            <div
              key={customer.id}
              onClick={() => onSelectCustomer(customer)}
              className="p-4 hover:bg-gray-50 cursor-pointer transition-colors"
            >
              <div className="flex items-center space-x-4">
                <div className="bg-gray-100 p-2 rounded-full">
                  <User className="w-6 h-6 text-gray-600" />
                </div>
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">{customer.name}</h3>
                  <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Mail className="w-4 h-4 mr-1" />
                      {customer.email}
                    </span>
                    <span className="flex items-center">
                      <Phone className="w-4 h-4 mr-1" />
                      {customer.phone}
                    </span>
                  </div>
                  {customer.equipment && customer.equipment.length > 0 && (
                    <div className="mt-1 text-sm text-gray-500">
                      Equipment: {customer.equipment.length} registered
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="p-4 text-center text-gray-500">
            No customers found
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerList;