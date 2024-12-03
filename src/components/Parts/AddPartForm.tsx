import React, { useState, useEffect } from 'react';
import { Upload, Save, X } from 'lucide-react';
import { usePartsContext } from '../../contexts/PartsContext';
import { Part } from '../../types/parts';

interface AddPartFormProps {
  onClose: () => void;
  onSuccess: () => void;
  editPart?: Part | null;
}

const AddPartForm: React.FC<AddPartFormProps> = ({ onClose, onSuccess, editPart }) => {
  const { addPart, updatePart } = usePartsContext();
  const [formData, setFormData] = useState({
    brand: '',
    partNumber: '',
    name: '',
    description: '',
    price: '',
    cost: '',
    inStock: '',
    committed: '0',
    unavailable: '0',
    location: '',
    image: null as File | null,
    reorderPoint: '5'
  });

  useEffect(() => {
    if (editPart) {
      setFormData({
        brand: editPart.brand,
        partNumber: editPart.partNumber,
        name: editPart.name,
        description: editPart.description,
        price: editPart.price.toString(),
        cost: editPart.cost.toString(),
        inStock: editPart.stockLevel.toString(),
        committed: editPart.committed.toString(),
        unavailable: editPart.unavailable.toString(),
        location: editPart.location,
        image: editPart.image || null,
        reorderPoint: editPart.reorderPoint.toString()
      });
    }
  }, [editPart]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const partData = {
      brand: formData.brand,
      partNumber: formData.partNumber,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      cost: parseFloat(formData.cost),
      stockLevel: parseInt(formData.inStock),
      committed: parseInt(formData.committed),
      unavailable: parseInt(formData.unavailable),
      location: formData.location,
      image: formData.image,
      reorderPoint: parseInt(formData.reorderPoint),
      supplier: formData.brand, // Using brand as supplier for now
      status: parseInt(formData.inStock) > 0 ? 'In Stock' : 'Out of Stock'
    };

    if (editPart) {
      updatePart(editPart.id, { ...partData });
    } else {
      addPart({
        id: `part-${Date.now()}`,
        ...partData
      });
    }

    onSuccess();
    onClose();
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">{editPart ? 'Edit Part' : 'Add New Part'}</h2>
        <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
          <X className="w-5 h-5" />
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Brand</label>
            <input
              type="text"
              value={formData.brand}
              onChange={(e) => setFormData(prev => ({ ...prev, brand: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Part Number</label>
            <input
              type="text"
              value={formData.partNumber}
              onChange={(e) => setFormData(prev => ({ ...prev, partNumber: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Part Name</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            rows={3}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Price ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.price}
              onChange={(e) => setFormData(prev => ({ ...prev, price: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Cost ($)</label>
            <input
              type="number"
              step="0.01"
              value={formData.cost}
              onChange={(e) => setFormData(prev => ({ ...prev, cost: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">In Stock</label>
            <input
              type="number"
              value={formData.inStock}
              onChange={(e) => setFormData(prev => ({ ...prev, inStock: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Committed</label>
            <input
              type="number"
              value={formData.committed}
              onChange={(e) => setFormData(prev => ({ ...prev, committed: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Unavailable</label>
            <input
              type="number"
              value={formData.unavailable}
              onChange={(e) => setFormData(prev => ({ ...prev, unavailable: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Reorder Point</label>
            <input
              type="number"
              value={formData.reorderPoint}
              onChange={(e) => setFormData(prev => ({ ...prev, reorderPoint: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
              required
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Location</label>
          <input
            type="text"
            value={formData.location}
            onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring focus:ring-[#004aad] focus:ring-opacity-50"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Part Image</label>
          <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
            <div className="space-y-1 text-center">
              <Upload className="mx-auto h-12 w-12 text-gray-400" />
              <div className="flex text-sm text-gray-600">
                <label className="relative cursor-pointer bg-white rounded-md font-medium text-[#004aad] hover:text-[#003c8f]">
                  <span>Upload a file</span>
                  <input
                    type="file"
                    className="sr-only"
                    accept="image/*"
                    onChange={handleImageUpload}
                  />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
              {formData.image && (
                <p className="text-sm text-green-600">Image selected: {formData.image.name}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-[#004aad] text-white rounded-md hover:bg-[#003c8f] flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            {editPart ? 'Update Part' : 'Save Part'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddPartForm;