import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowLeft } from 'lucide-react';
import { useCustomerContext } from '../contexts/CustomerContext';
import { useServiceQueueContext } from '../contexts/ServiceQueueContext';
import useNotifications from '../hooks/useNotifications';
import { CheckInForm } from './CustomerCheckIn/CheckInForm';
import { CheckInData } from './CustomerCheckIn/types';
import { validateCheckInData } from './CustomerCheckIn/validation';

const CustomerCheckIn: React.FC = () => {
  const navigate = useNavigate();
  const { addNotification } = useNotifications();
  const { addCustomer, addEquipment, addServiceRecord } = useCustomerContext();
  const { addJob } = useServiceQueueContext();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState<CheckInData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    serviceUpdates: false,
    marketingConsent: false,
    preferredContact: '',
    serviceType: '',
    urgencyLevel: '',
    make: '',
    model: '',
    serialNumber: '',
    condition: '',
    issueDescription: '',
    specialRequests: ''
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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const { isValid, errors: validationErrors } = validateCheckInData(formData);
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const timestamp = Date.now();
      const customerId = `customer-${timestamp}`;
      const equipmentId = `equipment-${timestamp}`;
      const serviceId = `service-${timestamp}`;
      const jobId = `job-${timestamp}`;

      // Create customer record
      const customer = {
        id: customerId,
        name: `${formData.firstName} ${formData.lastName}`,
        email: formData.email,
        phone: formData.phone,
        address: '',
        createdAt: new Date().toISOString(),
        communicationPreferences: {
          email: formData.serviceUpdates,
          sms: formData.serviceUpdates,
          phone: true
        },
        marketingConsent: formData.marketingConsent,
        equipment: [],
        serviceHistory: []
      };

      // Create equipment record
      const equipment = {
        id: equipmentId,
        type: formData.make,
        make: formData.make,
        model: formData.model,
        serialNumber: formData.serialNumber
      };

      // Create service record
      const serviceRecord = {
        id: serviceId,
        date: new Date().toISOString(),
        description: formData.issueDescription,
        technician: 'Unassigned',
        status: 'in-progress',
        parts: [],
        cost: 0
      };

      // Create job record
      const job = {
        id: jobId,
        customerName: customer.name,
        contactInfo: `${customer.email} | ${customer.phone}`,
        equipmentType: `${equipment.make} ${equipment.model}`,
        make: equipment.make,
        model: equipment.model,
        serviceType: formData.serviceType as 'Repair' | 'Maintenance' | 'Warranty',
        status: 'Assigned',
        priority: formData.urgencyLevel as 'low' | 'medium' | 'high',
        estimatedCompletion: 'TBD',
        description: formData.issueDescription,
        history: [`${new Date().toISOString()}: Customer check-in completed`],
        serialNumber: equipment.serialNumber,
        condition: formData.condition,
        stage: 'check-in',
        stageNotes: {},
        completedStages: []
      };

      // Add all records to their respective contexts
      addCustomer(customer);
      addEquipment(customer.id, equipment);
      addServiceRecord(customer.id, equipment.id, serviceRecord);
      addJob(job);

      // Add notifications
      addNotification({
        type: 'NEW_CHECKIN',
        title: 'New Service Request',
        message: `${formData.firstName} ${formData.lastName} checked in a ${formData.make} ${formData.model}`,
        read: false,
        priority: 'high',
        metadata: {
          customerId: customer.id,
          equipmentId: equipment.id,
          serviceId: serviceRecord.id,
          jobId: job.id
        }
      });

      if (formData.urgencyLevel === 'high') {
        addNotification({
          type: 'SERVICE_UPDATE',
          title: 'Urgent Repair Needed',
          message: `New repair request for ${formData.make} ${formData.model} requires immediate attention`,
          read: false,
          priority: 'high',
          metadata: {
            customerId: customer.id,
            equipmentId: equipment.id,
            serviceId: serviceRecord.id,
            jobId: job.id
          }
        });
      }

      navigate('/thank-you');
    } catch (error) {
      setErrors(prev => ({
        ...prev,
        submit: error instanceof Error ? error.message : 'Failed to submit form. Please try again.'
      }));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#004aad] to-[#0066ff] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <button
            onClick={() => navigate('/login')}
            className="flex items-center text-white hover:text-blue-200 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Back to Login
          </button>
        </div>
        
        <div className="bg-white rounded-xl shadow-2xl p-8">
          <div className="flex items-center justify-center mb-8">
            <img 
              src="https://cdn.shopify.com/s/files/1/0471/4060/2007/files/Untitled_design_-_2024-10-18T145142.458.png?v=1729281733" 
              alt="Parts Atlas Logo" 
              className="h-20 w-auto"
            />
          </div>
          
          <h1 className="text-2xl font-bold text-gray-900 text-center mb-8">Service Check-In</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <CheckInForm
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onCheckboxChange={handleCheckboxChange}
            />

            {errors.submit && (
              <div className="text-red-500 text-sm bg-red-50 p-3 rounded-md">
                {errors.submit}
              </div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#004aad] text-white p-4 rounded-lg hover:bg-[#003c8f] disabled:bg-gray-400 flex items-center justify-center font-medium text-lg transition-colors"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                'Submit Check-In'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CustomerCheckIn;