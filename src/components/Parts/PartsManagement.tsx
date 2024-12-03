import React, { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';

interface Part {
  id: string;
  partNumber: string;
  description: string;
  quantity: number;
  price: number;
}

interface PartsManagementProps {
  jobId: string;
  onPartsUpdate: (parts: Part[]) => void;
}

const PartsManagement: React.FC<PartsManagementProps> = ({ jobId, onPartsUpdate }) => {
  const [parts, setParts] = useState<Part[]>([]);
  const [newPart, setNewPart] = useState<Partial<Part>>({});

  const handleAddPart = () => {
    if (newPart.partNumber && newPart.description && newPart.quantity && newPart.price) {
      const part: Part = {
        id: `part-${Date.now()}`,
        partNumber: newPart.partNumber,
        description: newPart.description,
        quantity: newPart.quantity,
        price: newPart.price,
      };
      const updatedParts = [...parts, part];
      setParts(updatedParts);
      onPartsUpdate(updatedParts);
      setNewPart({});
    }
  };

  const handleRemovePart = (partId: string) => {
    const updatedParts = parts.filter((part) => part.id !== partId);
    setParts(updatedParts);
    onPartsUpdate(updatedParts);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Parts Required</h3>
      
      <div className="space-y-4">
        {parts.map((part) => (
          <div key={part.id} className="flex items-center justify-between p-2 bg-gray-50 rounded">
            <div className="flex-1 grid grid-cols-4 gap-4">
              <span>{part.partNumber}</span>
              <span>{part.description}</span>
              <span>{part.quantity}</span>
              <span>${part.price.toFixed(2)}</span>
            </div>
            <button
              onClick={() => handleRemovePart(part.id)}
              className="text-red-600 hover:text-red-800"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-4 grid grid-cols-4 gap-4">
        <input
          type="text"
          placeholder="Part Number"
          value={newPart.partNumber || ''}
          onChange={(e) => setNewPart({ ...newPart, partNumber: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="text"
          placeholder="Description"
          value={newPart.description || ''}
          onChange={(e) => setNewPart({ ...newPart, description: e.target.value })}
          className="border rounded p-2"
        />
        <input
          type="number"
          placeholder="Quantity"
          value={newPart.quantity || ''}
          onChange={(e) => setNewPart({ ...newPart, quantity: parseInt(e.target.value) })}
          className="border rounded p-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newPart.price || ''}
          onChange={(e) => setNewPart({ ...newPart, price: parseFloat(e.target.value) })}
          className="border rounded p-2"
        />
      </div>

      <button
        onClick={handleAddPart}
        className="mt-4 flex items-center bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f]"
      >
        <Plus className="w-4 h-4 mr-2" />
        Add Part
      </button>
    </div>
  );
};

export default PartsManagement;