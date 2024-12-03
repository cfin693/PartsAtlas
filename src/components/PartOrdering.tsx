import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';

const PartOrdering: React.FC = () => {
  const [selectedPart, setSelectedPart] = useState('');

  const handleOrder = () => {
    if (selectedPart) {
      console.log(`Ordering part: ${selectedPart}`);
      // Implement order logic here
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Part Ordering</h2>
      <select
        value={selectedPart}
        onChange={(e) => setSelectedPart(e.target.value)}
        className="w-full p-2 border rounded mb-4"
      >
        <option value="">Select a part</option>
        <option value="engine-filter">Engine Filter</option>
        <option value="spark-plug">Spark Plug</option>
        <option value="oil-filter">Oil Filter</option>
      </select>
      <button
        onClick={handleOrder}
        className="bg-blue-500 text-white px-4 py-2 rounded flex items-center"
        disabled={!selectedPart}
      >
        <ShoppingCart className="w-4 h-4 mr-2" /> Order Part
      </button>
    </div>
  );
};

export default PartOrdering;