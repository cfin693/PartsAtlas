import React, { useState } from 'react';
import { Activity, BarChart2, Users, Wrench } from 'lucide-react';
import OverviewCard from './OverviewCard';
import NotificationsPanel from './NotificationsPanel';
import CustomizableWidget from './CustomizableWidget';
import JobSummaryPanel from './JobSummaryPanel';
import { useAuth } from './Auth';

export interface Job {
  id: string;
  customerName: string;
  contactInfo: string;
  equipmentType: string;
  make: string;
  model: string;
  serviceType: 'Repair' | 'Maintenance' | 'Warranty';
  status: 'Assigned' | 'In Progress' | 'Waiting on Parts' | 'Pending Approval' | 'Completed';
  priority: 'low' | 'medium' | 'high';
  estimatedCompletion: string;
  description: string;
  history: string[];
  purchaseDate: string;
  serialNumber: string;
  condition: 'Excellent' | 'Good' | 'Fair' | 'Poor' | 'Non-Functional-End-Of-Life';
}

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const [jobs] = useState<Job[]>([]);
  const [widgets, setWidgets] = useState<string[]>(['stockLevels', 'technicianPerformance', 'assignedJobs']);

  const addWidget = (widgetType: string) => {
    if (!widgets.includes(widgetType)) {
      setWidgets([...widgets, widgetType]);
    }
  };

  const removeWidget = (widgetType: string) => {
    setWidgets(widgets.filter(w => w !== widgetType));
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Service Dashboard</h1>
      <JobSummaryPanel jobs={jobs} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">Customizable Widgets</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {widgets.map((widget) => (
                <div key={widget} className="relative">
                  <CustomizableWidget type={widget} />
                  <button
                    onClick={() => removeWidget(widget)}
                    className="absolute top-2 right-2 text-gray-500 hover:text-[#004aad]"
                  >
                    <span className="sr-only">Remove widget</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              ))}
            </div>
            <div className="mt-4 flex space-x-4">
              <button 
                onClick={() => addWidget('stockLevels')} 
                className="bg-[#004aad] text-white px-4 py-2 rounded flex items-center hover:bg-[#003c8f]"
                disabled={widgets.includes('stockLevels')}
              >
                <BarChart2 className="w-4 h-4 mr-2" /> Add Stock Levels
              </button>
              <button 
                onClick={() => addWidget('technicianPerformance')} 
                className="bg-[#004aad] text-white px-4 py-2 rounded flex items-center hover:bg-[#003c8f]"
                disabled={widgets.includes('technicianPerformance')}
              >
                <Users className="w-4 h-4 mr-2" /> Add Technician Performance
              </button>
              <button 
                onClick={() => addWidget('assignedJobs')} 
                className="bg-[#004aad] text-white px-4 py-2 rounded flex items-center hover:bg-[#003c8f]"
                disabled={widgets.includes('assignedJobs')}
              >
                <Wrench className="w-4 h-4 mr-2" /> Add Assigned Jobs
              </button>
            </div>
          </div>
        </div>
        <NotificationsPanel />
      </div>
    </div>
  );
};

export default Dashboard;