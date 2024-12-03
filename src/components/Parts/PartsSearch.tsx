import React, { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import { Part } from '../../types/parts';

interface PartsSearchProps {
  onSearch: (results: Part[]) => void;
  parts: Part[];
}

const PartsSearch: React.FC<PartsSearchProps> = ({ onSearch, parts }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchType, setSearchType] = useState<'partNumber' | 'brand' | 'name' | 'description'>('partNumber');

  const performSearch = useCallback(() => {
    const searchLower = searchTerm.toLowerCase();
    const results = parts.filter(part => {
      switch (searchType) {
        case 'partNumber':
          return part.partNumber.toLowerCase().includes(searchLower);
        case 'brand':
          return part.brand.toLowerCase().includes(searchLower);
        case 'name':
          return part.name.toLowerCase().includes(searchLower);
        case 'description':
          return part.description.toLowerCase().includes(searchLower);
        default:
          return true;
      }
    });
    onSearch(results);
  }, [searchTerm, searchType, parts, onSearch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    if (e.target.value === '') {
      onSearch(parts);
    }
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSearchType(e.target.value as any);
    if (searchTerm) {
      performSearch();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <div className="flex-1">
          <input
            type="text"
            value={searchTerm}
            onChange={handleSearchChange}
            placeholder="Search parts..."
            className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
          />
        </div>
        <select
          value={searchType}
          onChange={handleTypeChange}
          className="px-4 py-2 border rounded-md focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
        >
          <option value="partNumber">Part Number</option>
          <option value="brand">Brand</option>
          <option value="name">Name</option>
          <option value="description">Description</option>
        </select>
        <button
          type="submit"
          className="bg-[#004aad] text-white px-6 py-2 rounded-md hover:bg-[#003c8f] flex items-center"
        >
          <Search className="w-4 h-4 mr-2" />
          Search
        </button>
      </div>
    </form>
  );
};

export default PartsSearch;