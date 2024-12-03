import React, { useState } from 'react';
import { Send, Phone, Mail, MessageSquare } from 'lucide-react';
import { Customer, Communication } from '../../types/customers';

interface CommunicationCenterProps {
  customer: Customer;
}

const CommunicationCenter: React.FC<CommunicationCenterProps> = ({ customer }) => {
  const [message, setMessage] = useState('');
  const [communicationType, setCommunicationType] = useState<'email' | 'sms' | 'phone'>('email');

  // Mock data - replace with actual API call
  const communications: Communication[] = [
    {
      id: '1',
      date: '2024-03-15',
      type: 'email',
      subject: 'Service Reminder',
      content: 'Your equipment is due for maintenance',
      status: 'sent'
    },
    // Add more mock communications as needed
  ];

  const handleSend = () => {
    if (message.trim()) {
      // Handle sending message
      console.log('Sending message:', { message, type: communicationType });
      setMessage('');
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg">
        <div className="p-4 border-b">
          <h2 className="text-xl font-semibold">Communication History</h2>
        </div>
        <div className="max-h-96 overflow-y-auto">
          {communications.map(comm => (
            <div key={comm.id} className="p-4 border-b hover:bg-gray-50">
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center space-x-2">
                    {comm.type === 'email' && <Mail className="w-4 h-4 text-blue-500" />}
                    {comm.type === 'phone' && <Phone className="w-4 h-4 text-green-500" />}
                    {comm.type === 'sms' && <MessageSquare className="w-4 h-4 text-purple-500" />}
                    <span className="font-medium">{comm.subject}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{comm.content}</p>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(comm.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg p-4">
        <h3 className="font-medium mb-4">New Message</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Communication Type
            </label>
            <select
              value={communicationType}
              onChange={(e) => setCommunicationType(e.target.value as 'email' | 'sms' | 'phone')}
              className="w-full border rounded-md p-2"
            >
              <option value="email">Email</option>
              <option value="sms">SMS</option>
              <option value="phone">Phone Call Log</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Message
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={4}
              className="w-full border rounded-md p-2"
              placeholder="Type your message..."
            />
          </div>
          <button
            onClick={handleSend}
            className="bg-[#004aad] text-white px-4 py-2 rounded-md hover:bg-[#003c8f] flex items-center justify-center"
          >
            <Send className="w-4 h-4 mr-2" />
            Send Message
          </button>
        </div>
      </div>
    </div>
  );
};

export default CommunicationCenter;