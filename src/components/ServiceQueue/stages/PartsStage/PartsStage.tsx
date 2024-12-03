```typescript
import React, { useState } from 'react';
import { Save, Package, AlertTriangle } from 'lucide-react';
import { Job } from '../../../../types/jobs';
import { PartsData } from '../../types';
import { usePartsContext } from '../../../../contexts/PartsContext';
import PartsSearch from './PartsSearch';
import AllocatedPartsList from './AllocatedPartsList';
import CustomerInfo from '../common/CustomerInfo';

interface PartsStageProps {
  job: Job;
  data: Partial<PartsData>;
  onUpdate: (data: PartsData) => void;
  onComplete: () => void;
}

const PartsStage: React.FC<PartsStageProps> = ({
  job,
  data,
  onUpdate,
  onComplete
}) => {
  const { parts: availableParts } = usePartsContext();
  const [partsData, setPartsData] = useState<PartsData>({
    requiredParts: data.requiredParts || [],
    notes: data.notes || '',
    totalCost: data.totalCost || 0
  });
  const [searchResults, setSearchResults] = useState(availableParts);

  const handleSearch = (searchTerm: string) => {
    const filtered = availableParts.filter(part => 
      part.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.partNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      part.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setSearchResults(filtered);
  };

  const handleAllocatePart = (partId: string, quantity: number = 1) => {
    setPartsData(prev => ({
      ...prev,
      requiredParts: [
        ...prev.requiredParts,
        { partId, quantity, status: 'allocated' }
      ]
    }));
  };

  const handleRemovePart = (partId: string) => {
    setPartsData(prev => ({
      ...prev,
      requiredParts: prev.requiredParts.filter(p => p.partId !== partId)
    }));
  };

  const handleUpdateStatus = (partId: string, status: PartsData['requiredParts'][0]['status']) => {
    setPartsData(prev => ({
      ...prev,
      requiredParts: prev.requiredParts.map(p =>
        p.partId === partId ? { ...p, status } : p
      )
    }));
  };

  const handleSave = () => {
    onUpdate(partsData);
    onComplete();
  };

  const unavailableParts = partsData.requiredParts.filter(p => p.status === 'unavailable');

  return (
    <div className="space-y-6">
      <CustomerInfo job={job} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Parts Selection</h2>
            <PartsSearch onSearch={handleSearch} />
            
            <div className="mt-4 space-y-2">
              {searchResults.map(part => (
                <div
                  key={part.id}
                  className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleAllocatePart(part.id)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-medium">{part.name}</h3>
                      <p className="text-sm text-gray-600">Part #{part.partNumber}</p>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-sm ${
                      part.stockLevel > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                    }`}>
                      {part.stockLevel > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{part.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <AllocatedPartsList
            parts={partsData.requiredParts}
            onRemovePart={handleRemovePart}
            onUpdateStatus={handleUpdateStatus}
          />

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-medium mb-4">Parts Notes</h3>
            <textarea
              value={partsData.notes}
              onChange={(e) => setPartsData(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="w-full border rounded-lg p-2 focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
              placeholder="Add notes about parts requirements or special orders..."
            />
          </div>
        </div>
      </div>

      {unavailableParts.length > 0 && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Unavailable Parts
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <p>Some required parts are currently unavailable. Please review and update status when parts become available.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default PartsStage;
```