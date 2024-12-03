import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from './Auth';
import { Wrench, Users, ArrowRight, Shield } from 'lucide-react';

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (role: 'admin' | 'technician') => {
    login(role);
    navigate('/dashboard', { replace: true });
  };

  const handleCustomerCheckIn = () => {
    navigate('/check-in');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#004aad] to-[#0066ff]">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <img 
            src="https://cdn.shopify.com/s/files/1/0471/4060/2007/files/Untitled_design_-_2024-10-18T145142.458.png?v=1729281733" 
            alt="Parts Atlas Logo" 
            className="mx-auto h-32 w-auto bg-white rounded-full p-2"
          />
          <h2 className="mt-6 text-4xl font-extrabold text-white">
            Welcome to Parts Atlas
          </h2>
          <p className="mt-2 text-xl text-blue-100">
            Small Engine Service Management System
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Admin Login */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-[#004aad]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Admin Portal</h3>
              <p className="text-gray-600 mb-4">Access system administration and management tools</p>
              <button
                onClick={() => handleLogin('admin')}
                className="w-full bg-[#004aad] text-white px-4 py-3 rounded-lg hover:bg-[#003c8f] flex items-center justify-center"
              >
                Login as Admin
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Technician Login */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Wrench className="w-6 h-6 text-[#004aad]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Technician Portal</h3>
              <p className="text-gray-600 mb-4">Access service queue and repair management</p>
              <button
                onClick={() => handleLogin('technician')}
                className="w-full bg-[#004aad] text-white px-4 py-3 rounded-lg hover:bg-[#003c8f] flex items-center justify-center"
              >
                Login as Technician
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Customer Check-In */}
          <div className="bg-white rounded-xl shadow-xl overflow-hidden transform transition-all hover:scale-105">
            <div className="p-6">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-[#004aad]" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Customer Check-In</h3>
              <p className="text-gray-600 mb-4">Submit your equipment for service or repair</p>
              <button
                onClick={handleCustomerCheckIn}
                className="w-full bg-[#004aad] text-white px-4 py-3 rounded-lg hover:bg-[#003c8f] flex items-center justify-center"
              >
                Start Check-In
                <ArrowRight className="ml-2 w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-blue-100">
            Professional small engine repair management solution
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;