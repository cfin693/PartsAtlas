import React, { useState } from 'react';
import { Send, Check } from 'lucide-react';
import { ServiceStage } from './ServiceStages';

interface NotifyCustomerButtonProps {
  jobId: string;
  stage: ServiceStage;
}

const NotifyCustomerButton: React.FC<NotifyCustomerButtonProps> = ({ jobId, stage }) => {
  const [isSending, setIsSending] = useState(false);
  const [sent, setSent] = useState(false);

  const getStageMessage = (stage: ServiceStage) => {
    switch (stage) {
      case 'diagnostics':
        return 'Diagnostic evaluation has begun on your equipment';
      case 'parts':
        return 'Parts have been ordered for your repair';
      case 'repair':
        return 'Repairs have started on your equipment';
      case 'testing':
        return 'Your equipment is undergoing final testing';
      case 'pickup':
        return 'Your equipment is ready for pickup';
      default:
        return 'Your service status has been updated';
    }
  };

  const handleNotify = async () => {
    setIsSending(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsSending(false);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <button
      onClick={handleNotify}
      disabled={isSending || sent}
      className={`flex items-center px-4 py-2 rounded-md transition-colors ${
        sent ? 'bg-green-500 text-white' :
        'bg-[#004aad] text-white hover:bg-[#003c8f]'
      }`}
    >
      {sent ? (
        <>
          <Check className="w-4 h-4 mr-2" />
          Sent
        </>
      ) : (
        <>
          <Send className={`w-4 h-4 mr-2 ${isSending ? 'animate-pulse' : ''}`} />
          {isSending ? 'Sending...' : 'Notify Customer'}
        </>
      )}
    </button>
  );
};

export default NotifyCustomerButton;