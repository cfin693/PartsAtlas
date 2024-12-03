import React, { useState } from 'react';
import { Camera, Save, AlertTriangle } from 'lucide-react';
import { Job } from '../../../types/jobs';
import { CheckInData } from '../types';

interface CheckInStageProps {
  job: Job;
  data: Partial<CheckInData>;
  onUpdate: (data: CheckInData) => void;
  onComplete: () => void;
}

const CheckInStage: React.FC<CheckInStageProps> = ({
  job,
  data,
  onUpdate,
  onComplete
}) => {
  const [inspection, setInspection] = useState<CheckInData>({
    condition: data.condition || 'unknown',
    visibleDamage: data.visibleDamage || false,
    missingParts: data.missingParts || false,
    severity: data.severity || 'minor',
    estimatedHours: data.estimatedHours || 1,
    notes: data.notes || '',
    photos: data.photos || []
  });

  const handleSave = () => {
    onUpdate(inspection);
    onComplete();
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, implement file upload logic here
      const newPhotos = [...inspection.photos];
      for (let i = 0; i < e.target.files.length; i++) {
        newPhotos.push(URL.createObjectURL(e.target.files[i]));
      }
      setInspection(prev => ({ ...prev, photos: newPhotos }));
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Initial Inspection</h2>
        <div className="text-sm text-gray-500">
          Job #{job.id}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Equipment Condition
            </label>
            <select
              value={inspection.condition}
              onChange={(e) => setInspection(prev => ({ 
                ...prev, 
                condition: e.target.value 
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring-[#004aad]"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
              <option value="poor">Poor</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Severity Level
            </label>
            <select
              value={inspection.severity}
              onChange={(e) => setInspection(prev => ({ 
                ...prev, 
                severity: e.target.value as CheckInData['severity']
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring-[#004aad]"
            >
              <option value="minor">Minor - Simple fix needed</option>
              <option value="moderate">Moderate - Standard repair</option>
              <option value="critical">Critical - Urgent attention required</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Estimated Hours
            </label>
            <input
              type="number"
              value={inspection.estimatedHours}
              onChange={(e) => setInspection(prev => ({ 
                ...prev, 
                estimatedHours: parseFloat(e.target.value) 
              }))}
              min="0.5"
              step="0.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring-[#004aad]"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inspection.visibleDamage}
                onChange={(e) => setInspection(prev => ({ 
                  ...prev, 
                  visibleDamage: e.target.checked 
                }))}
                className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
              />
              <span className="ml-2">Visible Damage Present</span>
            </label>
          </div>

          <div>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={inspection.missingParts}
                onChange={(e) => setInspection(prev => ({ 
                  ...prev, 
                  missingParts: e.target.checked 
                }))}
                className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
              />
              <span className="ml-2">Missing Parts</span>
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Inspection Notes
            </label>
            <textarea
              value={inspection.notes}
              onChange={(e) => setInspection(prev => ({ 
                ...prev, 
                notes: e.target.value 
              }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#004aad] focus:ring-[#004aad]"
              placeholder="Enter detailed inspection notes..."
            />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Photos
        </label>
        <div className="flex items-center space-x-4">
          <label className="cursor-pointer bg-gray-50 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100 transition-colors">
            <Camera className="w-5 h-5 inline-block mr-2" />
            <span>Add Photos</span>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          <span className="text-sm text-gray-500">
            {inspection.photos.length} photos uploaded
          </span>
        </div>
      </div>

      {(inspection.visibleDamage || inspection.missingParts) && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">
                Attention Required
              </h3>
              <div className="mt-2 text-sm text-yellow-700">
                <ul className="list-disc list-inside">
                  {inspection.visibleDamage && (
                    <li>Visible damage detected</li>
                  )}
                  {inspection.missingParts && (
                    <li>Missing parts identified</li>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-end space-x-4">
        <button
          onClick={handleSave}
          className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8f] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#004aad]"
        >
          <Save className="w-4 h-4 mr-2" />
          Save and Continue
        </button>
      </div>
    </div>
  );
};

export default CheckInStage;