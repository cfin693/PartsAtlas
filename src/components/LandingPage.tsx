import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Wrench, 
  Clock, 
  BarChart2, 
  Shield, 
  CheckCircle,
  ArrowRight,
  Hammer,
  Settings,
  Users
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-[#004aad] to-[#0066ff] py-20 px-4 sm:px-6 lg:px-8">
        <div className="relative max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight">
              Small Engine Service Management
              <span className="block text-blue-200">Simplified</span>
            </h1>
            <p className="mt-6 max-w-2xl mx-auto text-xl text-blue-100">
              Streamline your small engine repair business with our comprehensive service management platform.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/login"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-[#004aad] bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
              >
                Get Started
              </Link>
              <Link
                to="/check-in"
                className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg md:px-10"
              >
                Customer Check-In
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Powerful Features for Your Business
            </h2>
            <p className="mt-4 text-xl text-gray-600">
              Everything you need to manage your small engine repair service efficiently
            </p>
          </div>

          <div className="mt-20">
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#004aad] rounded-md shadow-lg">
                        <Wrench className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Service Management</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Track repairs, manage work orders, and streamline your service operations efficiently.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#004aad] rounded-md shadow-lg">
                        <Clock className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Real-time Updates</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Keep customers informed with automatic notifications about their service status.
                    </p>
                  </div>
                </div>
              </div>

              <div className="pt-6">
                <div className="flow-root bg-gray-50 rounded-lg px-6 pb-8">
                  <div className="-mt-6">
                    <div>
                      <span className="inline-flex items-center justify-center p-3 bg-[#004aad] rounded-md shadow-lg">
                        <BarChart2 className="h-6 w-6 text-white" />
                      </span>
                    </div>
                    <h3 className="mt-8 text-lg font-medium text-gray-900 tracking-tight">Analytics & Reporting</h3>
                    <p className="mt-5 text-base text-gray-500">
                      Make data-driven decisions with comprehensive business analytics and reporting tools.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Parts Atlas?
            </h2>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Designed specifically for small engine repair businesses to improve efficiency and customer satisfaction.
            </p>
          </div>

          <div className="mt-16">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  icon: Shield,
                  title: 'Secure & Reliable',
                  description: 'Your data is protected with enterprise-grade security measures.'
                },
                {
                  icon: Users,
                  title: 'Customer-Focused',
                  description: 'Improve customer satisfaction with streamlined communication and service updates.'
                },
                {
                  icon: Hammer,
                  title: 'Technician-Friendly',
                  description: 'Intuitive interface designed for technicians to manage their work efficiently.'
                },
                {
                  icon: Settings,
                  title: 'Customizable Workflow',
                  description: 'Adapt the system to match your specific business needs and processes.'
                }
              ].map((feature, index) => (
                <div key={index} className="relative">
                  <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-[#004aad] text-white">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div className="ml-16">
                    <h3 className="text-lg font-medium text-gray-900">{feature.title}</h3>
                    <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-[#004aad]">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to get started?</span>
            <span className="block text-blue-200">Start managing your service business today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link
                to="/login"
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-[#004aad] bg-white hover:bg-blue-50"
              >
                Get Started
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;