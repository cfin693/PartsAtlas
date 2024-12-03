import React from 'react';
import { Package, AlertTriangle, DollarSign, MapPin, Edit } from 'lucide-react';
import { Part } from '../../types/parts';

interface InventoryTableProps {
  parts: Part[];
  onPartSelect: (part: Part) => void;
}

const InventoryTable: React.FC<InventoryTableProps> = ({ parts, onPartSelect }) => {
  const getStockStatusColor = (stockLevel: number, committed: number, reorderPoint: number) => {
    const availableStock = stockLevel - committed;
    if (availableStock <= 0) return 'text-red-600';
    if (availableStock <= reorderPoint) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getStatusBadgeColor = (status: Part['status']) => {
    switch (status) {
      case 'In Stock':
        return 'bg-green-100 text-green-800';
      case 'Low Stock':
        return 'bg-yellow-100 text-yellow-800';
      case 'Out of Stock':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="mt-6 overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Part Details
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Inventory
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Pricing
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {parts.map((part) => (
            <tr key={part.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-start space-y-1 flex-col">
                  <div className="flex items-center">
                    <Package className="w-4 h-4 mr-2 text-gray-400" />
                    <span className="font-medium">{part.partNumber}</span>
                  </div>
                  <span className="text-sm text-gray-900">{part.name}</span>
                  <span className="text-sm text-gray-500">{part.brand}</span>
                  <span className="text-xs text-gray-500 line-clamp-2">{part.description}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className={`text-sm ${getStockStatusColor(part.stockLevel, part.committed, part.reorderPoint)}`}>
                    Available: {part.stockLevel - part.committed}
                  </div>
                  <div className="text-sm text-gray-500">Total: {part.stockLevel}</div>
                  <div className="text-sm text-blue-600">Committed: {part.committed}</div>
                  {part.unavailable > 0 && (
                    <div className="text-sm text-red-600">
                      Unavailable: {part.unavailable}
                    </div>
                  )}
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-gray-900">
                    <DollarSign className="w-4 h-4 mr-1 text-green-600" />
                    {part.price.toFixed(2)}
                  </div>
                  <div className="text-sm text-gray-500">
                    Cost: ${part.cost.toFixed(2)}
                  </div>
                  <div className="text-sm text-green-600">
                    Margin: {((part.price - part.cost) / part.price * 100).toFixed(1)}%
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <MapPin className="w-4 h-4 mr-2 text-gray-400" />
                  <span className="text-sm text-gray-900">{part.location}</span>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusBadgeColor(part.status)}`}>
                  {part.status}
                </span>
                {part.stockLevel <= part.reorderPoint && (
                  <div className="mt-2 flex items-center text-yellow-600 text-xs">
                    <AlertTriangle className="w-4 h-4 mr-1" />
                    Low Inventory
                  </div>
                )}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <button
                  onClick={() => onPartSelect(part)}
                  className="text-[#004aad] hover:text-[#003c8f] flex items-center"
                >
                  <Edit className="w-4 h-4 mr-1" />
                  Edit
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {parts.length === 0 && (
        <div className="text-center py-8 text-gray-500">
          No parts found. Try adjusting your search criteria.
        </div>
      )}
    </div>
  );
};

export default InventoryTable;