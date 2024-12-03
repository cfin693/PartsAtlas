import React, { useState } from 'react';
import { Job } from '../../../types/jobs';
import { Camera, Save, AlertTriangle } from 'lucide-react';

interface CheckInDetailsProps {
  job: Job;
  onUpdate: (updates: Partial<Job>) => void;
}

const CheckInDetails: React.FC<CheckInDetailsProps> = ({ job, onUpdate }) => {
  const [inspection, setInspection] = useState({
    visibleDamage: false,
    missingParts: false,
    severity: 'minor',
    estimatedHours: 1,
    notes: ''
  });

  const handleSaveInspection = () => {
    onUpdate({
      history: [
        ...job.history,
        `${new Date().toISOString()}: Initial inspection completed - ${inspection.severity} severity, ${inspection.estimatedHours}h estimated`
      ],
      stageNotes: {
        ...job.stageNotes,
        'check-in': [
          ...(job.stageNotes['check-in'] || []),
          {
            id: `note-${Date.now()}`,
            content: inspection.notes,
            technicianId: 'current-tech',
            technicianName: 'Current Technician',
            timestamp: new Date().toISOString(),
            isInternal: false
          }
        ]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Initial Inspection</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inspection.visibleDamage}
                onChange={(e) => setInspection(prev => ({ ...prev, visibleDamage: e.target.checked }))}
                className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
              />
              <span className="ml-2">Visible Damage</span>
            </label>
            
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inspection.missingParts}
                onChange={(e) => setInspection(prev => ({ ...prev, missingParts: e.target.checked }))}
                className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
              />
              <span className="ml-2">Missing Parts</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Severity Level</label>
            <select
              value={inspection.severity}
              onChange={(e) => setInspection(prev => ({ ...prev, severity: e.target.value }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
            >
              <option value="minor">Minor - Simple fix needed</option>
              <option value="moderate">Moderate - Standard repair</option>
              <option value="severe">Severe - Complex repair needed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
            <input
              type="number"
              value={inspection.estimatedHours}
              onChange={(e) => setInspection(prev => ({ ...prev, estimatedHours: parseFloat(e.target.value) }))}
              min="0.5"
              step="0.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Inspection Notes</label>
            <textarea
              value={inspection.notes}
              onChange={(e) => setInspection(prev => ({ ...prev, notes: e.target.value }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
              placeholder="Enter inspection findings and observations..."
            />
          </div>

          <div className="flex justify-between items-center">
            <button
              type="button"
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              <Camera className="w-4 h-4 mr-2" />
              Add Photos
            </button>

            <button
              onClick={handleSaveInspection}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8f]"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Inspection
            </button>
          </div>
        </div>
      </div>

      {(inspection.visibleDamage || inspection.missingParts) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Attention Required</h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside">
                  {inspection.visibleDamage && <li>Visible damage detected</li>}
                  {inspection.missingParts && <li>Missing parts identified</li>}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckInDetails;