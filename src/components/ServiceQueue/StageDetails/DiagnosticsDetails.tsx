import React, { useState } from 'react';
import { Job } from '../../../types/jobs';
import { Save, Clock, CheckCircle2, AlertTriangle } from 'lucide-react';

interface DiagnosticsDetailsProps {
  job: Job;
  onUpdate: (updates: Partial<Job>) => void;
}

const DiagnosticsDetails: React.FC<DiagnosticsDetailsProps> = ({ job, onUpdate }) => {
  const [diagnostics, setDiagnostics] = useState({
    findings: '',
    checklist: {
      visualInspection: false,
      operationalTest: false,
      diagnosticScan: false,
      componentTesting: false
    },
    timeSpent: 0,
    recommendedActions: ''
  });

  const handleSaveDiagnostics = () => {
    const timestamp = new Date().toISOString();
    const completedTasks = Object.entries(diagnostics.checklist)
      .filter(([_, completed]) => completed)
      .map(([task]) => task)
      .join(', ');

    onUpdate({
      history: [
        ...job.history,
        `${timestamp}: Diagnostic tests completed - ${completedTasks}`
      ],
      stageNotes: {
        ...job.stageNotes,
        'diagnostics': [
          ...(job.stageNotes['diagnostics'] || []),
          {
            id: `note-${Date.now()}`,
            content: `Findings: ${diagnostics.findings}\nRecommended Actions: ${diagnostics.recommendedActions}`,
            technicianId: 'current-tech',
            technicianName: 'Current Technician',
            timestamp,
            isInternal: false
          }
        ]
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg p-6">
        <h3 className="text-lg font-semibold mb-4">Diagnostic Tests</h3>
        
        <div className="space-y-4">
          {/* Diagnostic Checklist */}
          <div className="space-y-2">
            <h4 className="font-medium text-gray-700">Standard Tests</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <label className="flex items-center p-2 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={diagnostics.checklist.visualInspection}
                  onChange={(e) => setDiagnostics(prev => ({
                    ...prev,
                    checklist: { ...prev.checklist, visualInspection: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
                />
                <span className="ml-2">Visual Inspection</span>
              </label>
              
              <label className="flex items-center p-2 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={diagnostics.checklist.operationalTest}
                  onChange={(e) => setDiagnostics(prev => ({
                    ...prev,
                    checklist: { ...prev.checklist, operationalTest: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
                />
                <span className="ml-2">Operational Test</span>
              </label>
              
              <label className="flex items-center p-2 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={diagnostics.checklist.diagnosticScan}
                  onChange={(e) => setDiagnostics(prev => ({
                    ...prev,
                    checklist: { ...prev.checklist, diagnosticScan: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
                />
                <span className="ml-2">Diagnostic Scan</span>
              </label>
              
              <label className="flex items-center p-2 bg-gray-50 rounded">
                <input
                  type="checkbox"
                  checked={diagnostics.checklist.componentTesting}
                  onChange={(e) => setDiagnostics(prev => ({
                    ...prev,
                    checklist: { ...prev.checklist, componentTesting: e.target.checked }
                  }))}
                  className="rounded border-gray-300 text-[#004aad] focus:ring-[#004aad]"
                />
                <span className="ml-2">Component Testing</span>
              </label>
            </div>
          </div>

          {/* Time Tracking */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Time Spent (minutes)
            </label>
            <div className="mt-1 flex items-center">
              <Clock className="w-5 h-5 text-gray-400 mr-2" />
              <input
                type="number"
                value={diagnostics.timeSpent}
                onChange={(e) => setDiagnostics(prev => ({
                  ...prev,
                  timeSpent: parseInt(e.target.value)
                }))}
                min="0"
                step="5"
                className="block w-24 rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
              />
              <span className="ml-2 text-gray-500">minutes</span>
            </div>
          </div>

          {/* Findings */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Diagnostic Findings
            </label>
            <textarea
              value={diagnostics.findings}
              onChange={(e) => setDiagnostics(prev => ({
                ...prev,
                findings: e.target.value
              }))}
              rows={4}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
              placeholder="Enter detailed findings from diagnostic tests..."
            />
          </div>

          {/* Recommended Actions */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Recommended Actions
            </label>
            <textarea
              value={diagnostics.recommendedActions}
              onChange={(e) => setDiagnostics(prev => ({
                ...prev,
                recommendedActions: e.target.value
              }))}
              rows={3}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-[#004aad] focus:border-[#004aad]"
              placeholder="Enter recommended repairs or actions..."
            />
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button
              onClick={handleSaveDiagnostics}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#004aad] hover:bg-[#003c8f]"
            >
              <Save className="w-4 h-4 mr-2" />
              Save Diagnostics
            </button>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-blue-50 border-l-4 border-blue-400 p-4">
        <div className="flex">
          <CheckCircle2 className="h-5 w-5 text-blue-400" />
          <div className="ml-3">
            <h3 className="text-sm font-medium text-blue-800">Diagnostic Progress</h3>
            <div className="mt-2 text-sm text-blue-700">
              {Object.entries(diagnostics.checklist).filter(([_, completed]) => completed).length} of 4 tests completed
            </div>
          </div>
        </div>
      </div>

      {/* Issues Found Alert */}
      {diagnostics.findings && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <AlertTriangle className="h-5 w-5 text-yellow-400" />
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">Issues Identified</h3>
              <div className="mt-2 text-sm text-yellow-700">
                {diagnostics.findings}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DiagnosticsDetails;