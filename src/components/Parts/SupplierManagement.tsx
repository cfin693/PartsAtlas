import React, { useState } from 'react';
import { X, Plus } from 'lucide-react';
import { Supplier } from '../../types/parts';

interface SupplierManagementProps {
  onClose: () => void;
}

const SupplierManagement: React.FC<SupplierManagementProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    terms: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle supplier submission
    console.log('Supplier added:', formData);
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Add Supplier</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier Name
          </label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Contact Person
          </label>
          <input
            type="text"
            value={formData.contactPerson}
            onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Address
          </label>
          <textarea
            value={formData.address}
            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Terms
          </label>
          <input
            type="text"
            value={formData.terms}
            onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
            placeholder="e.g., Net 30"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f] flex items-center justify-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Supplier
        </button>
      </form>
    </div>
  );
};

export default SupplierManagement;