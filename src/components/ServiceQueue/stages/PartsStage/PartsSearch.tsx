```typescript
import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Part } from '../../../../types/parts';

interface PartsSearchProps {
  onSearch: (searchTerm: string) => void;
}

const PartsSearch: React.FC<PartsSearchProps> = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearch} className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search parts by name, number, or description..."
        className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
      />
    </form>
  );
};

export default PartsSearch;
```