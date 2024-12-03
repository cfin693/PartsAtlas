import React, { useState, useEffect } from 'react';
import { Package, AlertTriangle, Plus } from 'lucide-react';
import PartsSearch from './PartsSearch';
import InventoryTable from './InventoryTable';
import AddPartForm from './AddPartForm';
import { Part } from '../../types/parts';
import { usePartsContext } from '../../contexts/PartsContext';

const PartsInventoryPage: React.FC = () => {
  const { parts } = usePartsContext();
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);
  const [filteredParts, setFilteredParts] = useState<Part[]>(parts);
  const [showAddPartForm, setShowAddPartForm] = useState(false);

  useEffect(() => {
    setFilteredParts(parts);
  }, [parts]);

  const handleSearch = (results: Part[]) => {
    setFilteredParts(results);
  };

  const handlePartSelect = (part: Part) => {
    setSelectedPart(part);
    setShowAddPartForm(true);
  };

  const handleAddPartSuccess = () => {
    setShowAddPartForm(false);
    setSelectedPart(null);
  };

  const lowStockCount = parts.filter(p => p.stockLevel <= p.reorderPoint).length;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Parts & Inventory</h1>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Total Parts</p>
              <p className="text-2xl font-bold">{parts.length}</p>
            </div>
            <Package className="w-8 h-8 text-[#004aad]" />
          </div>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600">Low Stock</p>
              <p className="text-2xl font-bold text-yellow-600">{lowStockCount}</p>
            </div>
            <AlertTriangle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Search and Results */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <PartsSearch onSearch={handleSearch} parts={parts} />
            <InventoryTable 
              parts={filteredParts} 
              onPartSelect={handlePartSelect}
            />
          </div>
        </div>

        {/* Right Column - Actions and Forms */}
        <div className="space-y-4">
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">Quick Actions</h2>
            <div className="space-y-2">
              <button
                onClick={() => setShowAddPartForm(true)}
                className="w-full bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f] flex items-center justify-center"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add / Edit Part
              </button>
            </div>
          </div>

          {showAddPartForm && (
            <AddPartForm
              onClose={() => {
                setShowAddPartForm(false);
                setSelectedPart(null);
              }}
              onSuccess={handleAddPartSuccess}
              editPart={selectedPart}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default PartsInventoryPage;