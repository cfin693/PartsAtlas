```typescript
import React from 'react';
import { Trash2, AlertTriangle, Package } from 'lucide-react';
import { PartsData } from '../../types';

interface AllocatedPartsListProps {
  parts: PartsData['requiredParts'];
  onRemovePart: (partId: string) => void;
  onUpdateStatus: (partId: string, status: PartsData['requiredParts'][0]['status']) => void;
}

const AllocatedPartsList: React.FC<AllocatedPartsListProps> = ({
  parts,
  onRemovePart,
  onUpdateStatus
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'allocated':
        return 'bg-green-100 text-green-800';
      case 'ordered':
        return 'bg-blue-100 text-blue-800';
      case 'unavailable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Allocated Parts</h3>
      {parts.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Package className="w-12 h-12 mx-auto mb-2 text-gray-400" />
          <p>No parts allocated yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {parts.map((part) => (
            <div
              key={part.partId}
              className="bg-white rounded-lg border p-4 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">Part #{part.partId}</span>
                  <select
                    value={part.status}
                    onChange={(e) => onUpdateStatus(part.partId, e.target.value as any)}
                    className={`text-sm rounded-full px-3 py-1 ${getStatusColor(part.status)}`}
                  >
                    <option value="allocated">In Stock</option>
                    <option value="ordered">On Order</option>
                    <option value="unavailable">Unavailable</option>
                  </select>
                </div>
                <div className="flex items-center space-x-4 text-sm text-gray-600">
                  <span>Quantity: {part.quantity}</span>
                  {part.status === 'unavailable' && (
                    <span className="flex items-center text-red-600">
                      <AlertTriangle className="w-4 h-4 mr-1" />
                      Part Unavailable
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => onRemovePart(part.partId)}
                className="ml-4 p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-red-50 transition-colors"
              >
                <Trash2 className="w-5 h-5" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllocatedPartsList;
```