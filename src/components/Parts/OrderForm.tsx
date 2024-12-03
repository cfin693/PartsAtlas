import React, { useState } from 'react';
import { X, ShoppingCart } from 'lucide-react';
import { Part } from '../../types/parts';

interface OrderFormProps {
  part: Part | null;
  onClose: () => void;
}

const OrderForm: React.FC<OrderFormProps> = ({ part, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [supplier, setSupplier] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log('Order submitted:', { part, quantity, supplier, notes });
    onClose();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Place Order</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {part && (
          <div>
            <p className="text-sm text-gray-600">Part Number</p>
            <p className="font-medium">{part.partNumber}</p>
            <p className="text-sm text-gray-600 mt-2">Description</p>
            <p className="font-medium">{part.description}</p>
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity
          </label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Supplier
          </label>
          <select
            value={supplier}
            onChange={(e) => setSupplier(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          >
            <option value="">Select Supplier</option>
            <option value="supplier1">ABC Supplies</option>
            <option value="supplier2">XYZ Parts</option>
            <option value="supplier3">123 Equipment</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            Notes
          </label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f] flex items-center justify-center"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Place Order
        </button>
      </form>
    </div>
  );
};

export default OrderForm;