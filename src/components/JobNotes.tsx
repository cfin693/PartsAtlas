import React, { useState } from 'react';
import { Save } from 'lucide-react';

const JobNotes: React.FC = () => {
  const [notes, setNotes] = useState('');

  const handleSaveNotes = () => {
    // Implement save functionality here
    console.log('Saving notes:', notes);
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Job Notes</h2>
      <textarea
        value={notes}
        onChange={(e) => setNotes(e.target.value)}
        className="w-full h-32 border rounded p-2 mb-4"
        placeholder="Enter job notes here..."
      />
      <button
        onClick={handleSaveNotes}
        className="bg-[#004aad] text-white px-4 py-2 rounded flex items-center hover:bg-[#003c8f]"
      >
        <Save className="w-4 h-4 mr-2" /> Save Notes
      </button>
    </div>
  );
};

export default JobNotes;