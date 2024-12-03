import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from 'lucide-react';
import { useServiceSync } from '../../hooks/useServiceSync';
import useNotifications from '../../hooks/useNotifications';
import { CheckInForm } from './CheckInForm';
import { CheckInData } from './types';
import { validateCheckInData } from './validation';

const CustomerCheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { syncCheckInWithServices, isSubmitting, error: syncError } = useServiceSync();
  const [formData, setFormData] = useState<CheckInData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    emailUpdates: false,
    smsUpdates: false,
    marketingConsent: false,
    serviceType: '',
    preferredContact: '',
    make: '',
    model: '',
    serialNumber: '',
    issueDescription: '',
    commonIssues: [],
    purchaseDate: '',
    condition: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof CheckInData | 'submit', string>>>({});

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: '', submit: '' }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleCommonIssueChange = (issue: string) => {
    setFormData(prev => ({
      ...prev,
      commonIssues: prev.commonIssues.includes(issue)
        ? prev.commonIssues.filter(i => i !== issue)
        : [...prev.commonIssues, issue]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateCheckInData(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      const result = await syncCheckInWithServices(formData);
      
      // Add notifications
      addNotification({
        type: 'NEW_CHECKIN',
        title: 'New Service Request',
        message: `${formData.firstName} ${formData.lastName} checked in a ${formData.make} ${formData.model}`,
        read: false,
        priority: 'high',
        metadata: {
          jobId: result.job.id,
          customerId: result.customer.id,
          equipmentId: result.equipment.id
        }
      });

      if (formData.serviceType === 'Repair') {
        addNotification({
          type: 'SERVICE_UPDATE',
          title: 'Urgent Repair Needed',
          message: `New repair request for ${formData.make} ${formData.model} requires immediate attention`,
          read: false,
          priority: 'high',
          metadata: {
            jobId: result.job.id
          }
        });
      }

      navigate('/thank-you');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      }));
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow">
      <h1 className="text-2xl font-bold mb-6">Customer Check-In</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <CheckInForm
          formData={formData}
          errors={errors}
          onInputChange={handleInputChange}
          onCheckboxChange={handleCheckboxChange}
          onCommonIssueChange={handleCommonIssueChange}
        />

        {(errors.submit || syncError) && (
          <div className="text-red-500 text-sm">
            {errors.submit || syncError}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-[#004aad] text-white p-3 rounded-md hover:bg-[#003c8f] disabled:bg-gray-400 flex items-center justify-center"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Check-In'
          )}
        </button>
      </form>
    </div>
  );
};