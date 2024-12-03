import React, { useState } from 'react';
import { Job } from './Dashboard';
import { Save, PlusCircle, Image, AlertCircle } from 'lucide-react';
import PartsManagement from './Parts/PartsManagement';
import useNotifications from '../hooks/useNotifications';

interface JobDetailsViewProps {
  job: Job;
  onJobUpdate: (updatedJob: Job) => void;
}

const JobDetailsView: React.FC<JobDetailsViewProps> = ({ job, onJobUpdate }) => {
  const [notes, setNotes] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const { addNotification } = useNotifications();

  const handleStatusChange = (newStatus: Job['status']) => {
    const updatedJob = {
      ...job,
      status: newStatus,
      history: [...job.history, `${new Date().toISOString()}: Status updated to ${newStatus}`]
    };
    onJobUpdate(updatedJob);

    // Add appropriate notification based on status change
    const notificationMessages = {
      'In Progress': {
        type: 'SERVICE_UPDATE' as const,
        title: 'Service Started',
        message: `Service has begun for ${job.customerName}'s ${job.equipmentType}`
      },
      'Pending Approval': {
        type: 'SERVICE_UPDATE' as const,
        title: 'Approval Required',
        message: `Service approval needed for ${job.customerName}'s ${job.equipmentType}`
      },
      'Completed': {
        type: 'SERVICE_COMPLETED' as const,
        title: 'Service Completed',
        message: `Service completed for ${job.customerName}'s ${job.equipmentType}`
      },
      'Waiting on Parts': {
        type: 'PARTS_BACKORDER' as const,
        title: 'Parts Required',
        message: `Service delayed - waiting for parts for ${job.customerName}'s ${job.equipmentType}`
      }
    };

    const notification = notificationMessages[newStatus];
    if (notification) {
      addNotification(notification);
    }
  };

  const handleAddNote = () => {
    if (notes.trim()) {
      const updatedJob = {
        ...job,
        history: [...job.history, `${new Date().toISOString()}: ${notes}`]
      };
      onJobUpdate(updatedJob);
      setNotes('');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleFileUpload = () => {
    if (selectedFile) {
      // In a real application, implement file upload logic here
      console.log('Uploading file:', selectedFile.name);
      setSelectedFile(null);
    }
  };

  const handlePartsUpdate = (parts: any[]) => {
    const updatedJob = {
      ...job,
      parts
    };
    onJobUpdate(updatedJob);
  };

  // Generate reference number based on job ID
  const referenceNumber = `SR-${job.id.split('-')[1] || Date.now().toString().slice(-6)}`;

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-4">Job Details</h2>
      
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold mb-2">Service Request Reference</h3>
          <p className="text-lg font-mono bg-gray-50 p-2 rounded">{referenceNumber}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Customer Information</h3>
          <p className="text-gray-600">{job.customerName}</p>
          <p className="text-gray-600">{job.contactInfo}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Equipment Details</h3>
          <p className="text-gray-600">{job.equipmentType}</p>
          <p className="text-gray-600">Make: {job.make}</p>
          <p className="text-gray-600">Model: {job.model}</p>
          <p className="text-gray-600">Serial Number: {job.serialNumber}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Service Information</h3>
          <div className="flex items-center space-x-2">
            <label htmlFor="status" className="text-gray-600">Status:</label>
            <select
              id="status"
              value={job.status}
              onChange={(e) => handleStatusChange(e.target.value as Job['status'])}
              className="border rounded-md p-1 text-gray-600 focus:ring-2 focus:ring-[#004aad] focus:border-transparent"
            >
              <option value="In Progress">In Progress</option>
              <option value="Pending Approval">Pending Approval</option>
              <option value="Completed">Completed</option>
              <option value="Waiting on Parts">Waiting on Parts</option>
            </select>
          </div>
          <p className="text-gray-600 mt-2">Type: {job.serviceType}</p>
          <p className="text-gray-600">Priority: {job.priority}</p>
          <p className="text-gray-600">Estimated Completion: {job.estimatedCompletion}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Description</h3>
          <p className="text-gray-600">{job.description}</p>
        </div>

        <div>
          <h3 className="font-semibold mb-2">History</h3>
          <ul className="space-y-2">
            {job.history.map((entry, index) => (
              <li key={index} className="text-gray-600">{entry}</li>
            ))}
          </ul>
        </div>

        <PartsManagement jobId={job.id} onPartsUpdate={handlePartsUpdate} />

        <div>
          <h3 className="font-semibold mb-2">Add Note</h3>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded-md p-2 mb-2"
            rows={3}
            placeholder="Enter your note here..."
          />
          <button
            onClick={handleAddNote}
            className="flex items-center bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f]"
          >
            <PlusCircle className="w-4 h-4 mr-2" /> Add Note
          </button>
        </div>

        <div>
          <h3 className="font-semibold mb-2">Upload Image/Video</h3>
          <input
            type="file"
            onChange={handleFileChange}
            className="mb-2"
            accept="image/*,video/*"
          />
          <button
            onClick={handleFileUpload}
            disabled={!selectedFile}
            className="flex items-center bg-[#004aad] text-white px-4 py-2 rounded hover:bg-[#003c8f] disabled:bg-gray-400"
          >
            <Image className="w-4 h-4 mr-2" /> Upload File
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsView;