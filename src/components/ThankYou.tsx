import React from 'react';
import { CheckCircle, LogIn } from 'lucide-react';
import { Link } from 'react-router-dom';

const ThankYou: React.FC = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full text-center">
        <div className="mb-6">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Thank You!</h1>
        <div className="space-y-4 text-gray-600">
          <p>Your service request has been successfully submitted.</p>
          <p>Our team will review your request and contact you shortly using your preferred contact method.</p>
          <p className="font-semibold">Service Request Reference Number:</p>
          <p className="text-lg font-mono bg-gray-50 p-2 rounded">{`SR-${Date.now().toString().slice(-6)}`}</p>
          <p className="text-sm">Please keep this reference number for your records.</p>
        </div>
        <div className="mt-8">
          <Link
            to="/login"
            className="inline-flex items-center justify-center bg-[#004aad] text-white px-6 py-3 rounded-lg hover:bg-[#003c8f] transition-colors"
          >
            <LogIn className="w-5 h-5 mr-2" />
            Return to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ThankYou;