import React from 'react';
import { Clock, Wrench, ClipboardList, MessageCircle } from 'lucide-react';
import { ServiceStage } from './ServiceStages';
import NotifyCustomerButton from './NotifyCustomerButton';

interface StageDetailsProps {
  stage: ServiceStage;
  jobId: string;
  notes: string[];
  estimatedTime?: string;
  partNumbers?: string[];
  instructions?: string[];
  onAddNote: (note: string) => void;
}

const StageDetails: React.FC<StageDetailsProps> = ({
  stage,
  jobId,
  notes,
  estimatedTime,
  partNumbers,
  instructions,
  onAddNote
}) => {
  const [newNote, setNewNote] = React.useState('');

  const handleAddNote = () => {
    if (newNote.trim()) {
      onAddNote(newNote);
      setNewNote('');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-xl font-semibold">{stage.charAt(0).toUpperCase() + stage.slice(1)} Details</h3>
        <NotifyCustomerButton jobId={jobId} stage={stage} />
      </div>

      <div className="space-y-6">
        {estimatedTime && (
          <div className="flex items-center text-gray-600">
            <Clock className="w-5 h-5 mr-2" />
            <span>Estimated Time: {estimatedTime}</span>
          </div>
        )}

        {partNumbers && partNumbers.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Required Parts
            </h4>
            <ul className="list-disc list-inside space-y-1 text-gray-600">
              {partNumbers.map((part, index) => (
                <li key={index}>{part}</li>
              ))}
            </ul>
          </div>
        )}

        {instructions && instructions.length > 0 && (
          <div>
            <h4 className="font-medium mb-2 flex items-center">
              <ClipboardList className="w-5 h-5 mr-2" />
              Instructions
            </h4>
            <ul className="list-decimal list-inside space-y-2 text-gray-600">
              {instructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          </div>
        )}

        <div>
          <h4 className="font-medium mb-2 flex items-center">
            <MessageCircle className="w-5 h-5 mr-2" />
            Notes
          </h4>
          <div className="space-y-4">
            <div className="flex space-x-2">
              <input
                type="text"
                value={newNote}
                onChange={(e) => setNewNote(e.target.value)}
                className="flex-1 border rounded-md px-3 py-2"
                placeholder="Add a note..."
              />
              <button
                onClick={handleAddNote}
                className="bg-[#004aad] text-white px-4 py-2 rounded-md hover:bg-[#003c8f]"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {notes.map((note, index) => (
                <div key={index} className="bg-gray-50 p-3 rounded-md text-gray-600">
                  {note}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StageDetails;