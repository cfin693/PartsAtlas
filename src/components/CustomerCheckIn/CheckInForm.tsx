import React from 'react';
import { AlertTriangle } from 'lucide-react';
import { CheckInData } from './types';

interface CheckInFormProps {
  formData: CheckInData;
  errors: Partial<Record<keyof CheckInData | 'submit', string>>;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
  onCheckboxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const CheckInForm: React.FC<CheckInFormProps> = ({
  formData,
  errors,
  onInputChange,
  onCheckboxChange
}) => {
  return (
    <div className="space-y-8">
      {/* Customer Information */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">First Name *</label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.firstName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.firstName && <p className="mt-1 text-sm text-red-500">{errors.firstName}</p>}
          </div>
          <div>
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">Last Name *</label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              value={formData.lastName}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.lastName ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.lastName && <p className="mt-1 text-sm text-red-500">{errors.lastName}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.phone ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.phone && <p className="mt-1 text-sm text-red-500">{errors.phone}</p>}
          </div>
        </div>

        <div className="mt-4">
          <label htmlFor="preferredContact" className="block text-sm font-medium text-gray-700">
            Preferred Contact Method *
          </label>
          <select
            id="preferredContact"
            name="preferredContact"
            value={formData.preferredContact}
            onChange={onInputChange}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.preferredContact ? 'border-red-500' : 'border-gray-300'}`}
          >
            <option value="">Select preferred contact method</option>
            <option value="email">Email</option>
            <option value="phone">Phone</option>
            <option value="sms">SMS</option>
          </select>
          {errors.preferredContact && <p className="mt-1 text-sm text-red-500">{errors.preferredContact}</p>}
        </div>

        <div className="mt-4 space-y-2">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="serviceUpdates"
              name="serviceUpdates"
              checked={formData.serviceUpdates}
              onChange={onCheckboxChange}
              className="h-4 w-4 text-[#004aad] focus:ring-[#004aad] border-gray-300 rounded"
            />
            <label htmlFor="serviceUpdates" className="ml-2 block text-sm text-gray-700">
              I consent to receive service status updates
            </label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="marketingConsent"
              name="marketingConsent"
              checked={formData.marketingConsent}
              onChange={onCheckboxChange}
              className="h-4 w-4 text-[#004aad] focus:ring-[#004aad] border-gray-300 rounded"
            />
            <label htmlFor="marketingConsent" className="ml-2 block text-sm text-gray-700">
              I agree to receive promotional updates and special offers
            </label>
          </div>
        </div>
      </section>

      {/* Equipment Information */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Equipment Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="serviceType" className="block text-sm font-medium text-gray-700">Service Type *</label>
            <select
              id="serviceType"
              name="serviceType"
              value={formData.serviceType}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.serviceType ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select service type</option>
              <option value="Repair">Repair</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Tune-Up">Tune-Up</option>
              <option value="Warranty">Warranty Service</option>
            </select>
            {errors.serviceType && <p className="mt-1 text-sm text-red-500">{errors.serviceType}</p>}
          </div>
          <div>
            <label htmlFor="urgencyLevel" className="block text-sm font-medium text-gray-700">Urgency Level *</label>
            <select
              id="urgencyLevel"
              name="urgencyLevel"
              value={formData.urgencyLevel}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.urgencyLevel ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select urgency level</option>
              <option value="low">Standard - Not urgent</option>
              <option value="medium">Priority - Needs attention soon</option>
              <option value="high">Urgent - Critical repair needed</option>
            </select>
            {errors.urgencyLevel && <p className="mt-1 text-sm text-red-500">{errors.urgencyLevel}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="make" className="block text-sm font-medium text-gray-700">Equipment Make *</label>
            <input
              type="text"
              id="make"
              name="make"
              value={formData.make}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.make ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.make && <p className="mt-1 text-sm text-red-500">{errors.make}</p>}
          </div>
          <div>
            <label htmlFor="model" className="block text-sm font-medium text-gray-700">Equipment Model *</label>
            <input
              type="text"
              id="model"
              name="model"
              value={formData.model}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.model ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.model && <p className="mt-1 text-sm text-red-500">{errors.model}</p>}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="serialNumber" className="block text-sm font-medium text-gray-700">Serial Number *</label>
            <input
              type="text"
              id="serialNumber"
              name="serialNumber"
              value={formData.serialNumber}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.serialNumber ? 'border-red-500' : 'border-gray-300'}`}
            />
            {errors.serialNumber && <p className="mt-1 text-sm text-red-500">{errors.serialNumber}</p>}
          </div>
          <div>
            <label htmlFor="condition" className="block text-sm font-medium text-gray-700">Equipment Condition *</label>
            <select
              id="condition"
              name="condition"
              value={formData.condition}
              onChange={onInputChange}
              className={`mt-1 block w-full rounded-md shadow-sm ${errors.condition ? 'border-red-500' : 'border-gray-300'}`}
            >
              <option value="">Select condition</option>
              <option value="Excellent">Excellent - Like new</option>
              <option value="Good">Good - Normal wear</option>
              <option value="Fair">Fair - Showing wear</option>
              <option value="Poor">Poor - Significant wear</option>
              <option value="Non-Functional-End-Of-Life">Non-Functional / End of Life</option>
            </select>
            {errors.condition && <p className="mt-1 text-sm text-red-500">{errors.condition}</p>}
          </div>
        </div>
      </section>

      {/* Issue Details */}
      <section>
        <h2 className="text-xl font-semibold mb-4">Issue Details</h2>
        <div>
          <label htmlFor="issueDescription" className="block text-sm font-medium text-gray-700">
            Description of Issue *
          </label>
          <textarea
            id="issueDescription"
            name="issueDescription"
            value={formData.issueDescription}
            onChange={onInputChange}
            rows={4}
            className={`mt-1 block w-full rounded-md shadow-sm ${errors.issueDescription ? 'border-red-500' : 'border-gray-300'}`}
            placeholder="Please describe the issue in detail..."
          />
          {errors.issueDescription && <p className="mt-1 text-sm text-red-500">{errors.issueDescription}</p>}
        </div>

        <div className="mt-4">
          <label htmlFor="specialRequests" className="block text-sm font-medium text-gray-700">
            Special Requests or Additional Notes
          </label>
          <textarea
            id="specialRequests"
            name="specialRequests"
            value={formData.specialRequests}
            onChange={onInputChange}
            rows={3}
            className="mt-1 block w-full rounded-md shadow-sm border-gray-300"
            placeholder="Any special requests or additional information..."
          />
        </div>
      </section>

      <div className="mt-4 p-4 bg-blue-50 rounded-md">
        <div className="flex items-start">
          <AlertTriangle className="w-5 h-5 text-blue-500 mt-0.5 mr-2" />
          <p className="text-sm text-blue-700">
            By submitting this form, you agree to our terms of service and acknowledge that all information provided is accurate.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CheckInForm;