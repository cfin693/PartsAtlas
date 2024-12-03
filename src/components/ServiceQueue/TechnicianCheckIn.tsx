import React, { useState } from 'react';
import { Upload, Clock, AlertTriangle, Send, Check, Camera } from 'lucide-react';
import { Job } from '../../types/jobs';
import { InitialInspection } from '../CustomerCheckIn/types';
import { Customer } from '../../types/customers';

interface TechnicianCheckInProps {
  job: Job;
  customer: Customer;
  onUpdateInspection: (inspection: InitialInspection) => void;
  onNotifyCustomer: (message: string) => void;
  compact?: boolean;
}

const TechnicianCheckIn: React.FC<TechnicianCheckInProps> = ({
  job,
  customer,
  onUpdateInspection,
  onNotifyCustomer,
  compact = false
}) => {
  const [inspection, setInspection] = useState<InitialInspection>({
    visibleDamage: false,
    missingParts: false,
    additionalNotes: '',
    photos: [],
    severityLevel: 'Minor',
    estimatedHours: 0.5
  });

  const [notificationSent, setNotificationSent] = useState(false);

  const handlePhotoUpload = (files: FileList | null) => {
    if (files) {
      setInspection(prev => ({
        ...prev,
        photos: [...prev.photos, ...Array.from(files)]
      }));
    }
  };

  const handleNotifyCustomer = async () => {
    const message = `Initial inspection completed for your ${job.make} ${job.model}. Estimated completion time: ${inspection.estimatedHours} hours.`;
    await onNotifyCustomer(message);
    setNotificationSent(true);
    setTimeout(() => setNotificationSent(false), 3000);
  };

  if (compact) {
    return (
      <div className="space-y-2 border-t pt-2 mt-2">
        <div className="flex items-center justify-between">
          <select
            value={inspection.severityLevel}
            onChange={(e) => setInspection(prev => ({
              ...prev,
              severityLevel: e.target.value as InitialInspection['severityLevel']
            }))}
            className="text-sm rounded-md border-gray-300"
          >
            <option value="Minor">Minor</option>
            <option value="Moderate">Moderate</option>
            <option value="Severe">Severe</option>
          </select>
          <button
            onClick={() => onUpdateInspection(inspection)}
            className="text-sm bg-[#004aad] text-white px-2 py-1 rounded-md hover:bg-[#003c8f]"
          >
            Save
          </button>
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={inspection.estimatedHours}
            onChange={(e) => setInspection(prev => ({
              ...prev,
              estimatedHours: parseFloat(e.target.value)
            }))}
            min="0.5"
            step="0.5"
            className="w-20 text-sm rounded-md border-gray-300"
          />
          <span className="text-sm text-gray-600">hours</span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold">Initial Inspection</h3>
        <div className="flex items-center space-x-2">
          <Clock className="w-5 h-5 text-gray-400" />
          <span className="text-sm text-gray-600">
            Estimated Time: {inspection.estimatedHours} hours
          </span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Severity Level</label>
            <select
              value={inspection.severityLevel}
              onChange={(e) => setInspection(prev => ({
                ...prev,
                severityLevel: e.target.value as InitialInspection['severityLevel']
              }))}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            >
              <option value="Minor">Minor - Simple fix</option>
              <option value="Moderate">Moderate - Standard repair</option>
              <option value="Severe">Severe - Complex repair</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">Estimated Hours</label>
            <input
              type="number"
              value={inspection.estimatedHours}
              onChange={(e) => setInspection(prev => ({
                ...prev,
                estimatedHours: parseFloat(e.target.value)
              }))}
              min="0.5"
              step="0.5"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="visibleDamage"
              checked={inspection.visibleDamage}
              onChange={(e) => setInspection(prev => ({
                ...prev,
                visibleDamage: e.target.checked
              }))}
              className="h-4 w-4 text-[#004aad] focus:ring-[#004aad] border-gray-300 rounded"
            />
            <label htmlFor="visibleDamage" className="text-sm text-gray-700">
              Visible Damage Present
            </label>
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="missingParts"
              checked={inspection.missingParts}
              onChange={(e) => setInspection(prev => ({
                ...prev,
                missingParts: e.target.checked
              }))}
              className="h-4 w-4 text-[#004aad] focus:ring-[#004aad] border-gray-300 rounded"
            />
            <label htmlFor="missingParts" className="text-sm text-gray-700">
              Missing Parts
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
        <textarea
          value={inspection.additionalNotes}
          onChange={(e) => setInspection(prev => ({
            ...prev,
            additionalNotes: e.target.value
          }))}
          rows={3}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm"
          placeholder="Enter any additional observations or notes..."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Upload Photos
        </label>
        <div className="flex items-center justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            <Camera className="mx-auto h-12 w-12 text-gray-400" />
            <div className="flex text-sm text-gray-600">
              <label htmlFor="photo-upload" className="relative cursor-pointer bg-white rounded-md font-medium text-[#004aad] hover:text-[#003c8f]">
                <span>Upload photos</span>
                <input
                  id="photo-upload"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={(e) => handlePhotoUpload(e.target.files)}
                  className="sr-only"
                />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => onUpdateInspection(inspection)}
          className="bg-[#004aad] text-white px-4 py-2 rounded-md hover:bg-[#003c8f] flex items-center"
        >
          <Check className="w-4 h-4 mr-2" />
          Save Inspection
        </button>

        <button
          onClick={handleNotifyCustomer}
          disabled={notificationSent}
          className={`flex items-center px-4 py-2 rounded-md transition-colors ${
            notificationSent
              ? 'bg-green-500 text-white'
              : 'bg-[#004aad] text-white hover:bg-[#003c8f]'
          }`}
        >
          {notificationSent ? (
            <>
              <Check className="w-4 h-4 mr-2" />
              Sent
            </>
          ) : (
            <>
              <Send className="w-4 h-4 mr-2" />
              Notify Customer
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default TechnicianCheckIn;