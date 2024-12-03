import React, { useState } from 'react';
import { Send, Lock, Globe, Clock, User } from 'lucide-react';
import { ServiceStageNote } from '../../types/jobs';
import { format } from 'date-fns';

interface StageNotesProps {
  notes: ServiceStageNote[];
  onAddNote: (note: string, isInternal: boolean) => void;
  stage: string;
}

const StageNotes: React.FC<StageNotesProps> = ({ notes, onAddNote, stage }) => {
  const [newNote, setNewNote] = useState('');
  const [isInternal, setIsInternal] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newNote.trim()) {
      onAddNote(newNote.trim(), isInternal);
      setNewNote('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4 capitalize">{stage} Notes</h3>
      
      <div className="space-y-4 mb-4 max-h-64 overflow-y-auto">
        {notes.map((note) => (
          <div 
            key={note.id} 
            className={`p-3 rounded-lg ${
              note.isInternal ? 'bg-yellow-50' : 'bg-blue-50'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4 text-gray-600" />
                <span className="text-sm font-medium">{note.technicianName}</span>
                {note.isInternal && <Lock className="w-4 h-4 text-yellow-600" />}
                {!note.isInternal && <Globe className="w-4 h-4 text-blue-600" />}
              </div>
              <div className="flex items-center text-gray-500 text-sm">
                <Clock className="w-4 h-4 mr-1" />
                {format(new Date(note.timestamp), 'MMM d, yyyy h:mm a')}
              </div>
            </div>
            <p className="text-gray-700">{note.content}</p>
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-2">
        <div className="flex items-center space-x-2 mb-2">
          <label className="flex items-center">
            <input
              type="checkbox"
              checked={isInternal}
              onChange={(e) => setIsInternal(e.target.checked)}
              className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-gray-300 rounded"
            />
            <span className="ml-2 text-sm text-gray-600">Internal Note</span>
          </label>
        </div>
        
        <div className="flex space-x-2">
          <input
            type="text"
            value={newNote}
            onChange={(e) => setNewNote(e.target.value)}
            placeholder="Add a note..."
            className="flex-1 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
          <button
            type="submit"
            disabled={!newNote.trim()}
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-[#004aad] hover:bg-[#003c8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-gray-300"
          >
            <Send className="w-4 h-4 mr-2" />
            Add Note
          </button>
        </div>
      </form>
    </div>
  );
};

export default StageNotes;