import React, { useState } from 'react';
import { Send } from 'lucide-react';
import { Job } from '../../types/jobs';
import { useServiceQueueContext } from '../../contexts/ServiceQueueContext';

interface ServiceNotesProps {
  job: Job;
}

const ServiceNotes: React.FC<ServiceNotesProps> = ({ job }) => {
  const [note, setNote] = useState('');
  const { updateJobNotes } = useServiceQueueContext();

  const handleAddNote = () => {
    if (!note.trim()) return;

    const newNote = {
      id: `note-${Date.now()}`,
      content: note,
      technicianId: 'current-user',
      technicianName: 'Current User',
      timestamp: new Date().toISOString(),
      isInternal: false
    };

    const updatedNotes = {
      ...job.stageNotes,
      [job.stage]: [...(job.stageNotes[job.stage] || []), newNote]
    };

    updateJobNotes(job.id, updatedNotes);
    setNote('');
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-4">Service Notes</h3>
      
      <div className="space-y-4">
        {/* Notes List */}
        <div className="space-y-2 max-h-60 overflow-y-auto">
          {job.stageNotes[job.stage]?.map((note) => (
            <div key={note.id} className="bg-gray-50 p-3 rounded-lg">
              <div className="flex justify-between text-sm text-gray-500 mb-1">
                <span>{note.technicianName}</span>
                <span>{new Date(note.timestamp).toLocaleString()}</span>
              </div>
              <p className="text-gray-700">{note.content}</p>
            </div>
          ))}
        </div>

        {/* Add Note Form */}
        <div className="flex space-x-2">
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            onClick={handleAddNote}
            disabled={!note.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#004aad] hover:bg-[#003c8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Add Note
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceNotes;