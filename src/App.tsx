import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Dashboard from './components/Dashboard';
import CustomerCheckIn from './components/CustomerCheckIn';
import ThankYou from './components/ThankYou';
import TopNav from './components/Navigation/TopNav';
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider, useAuth } from './components/Auth';
import Login from './components/Login';
import Customers from './components/Customers/Customers';
import ServiceQueuePage from './components/ServiceQueuePage';
import PartsInventoryPage from './components/Parts/PartsInventoryPage';
import TechniciansPage from './components/Technicians/TechniciansPage';
import { ServiceQueueProvider } from './contexts/ServiceQueueContext';
import { CustomerProvider } from './contexts/CustomerContext';
import { PartsProvider } from './contexts/PartsContext';
import Footer from './components/Footer';

const ProtectedRoute: React.FC<{ element: React.ReactElement, allowedRoles: string[] }> = ({ element, allowedRoles }) => {
  const { user } = useAuth();
  return user && allowedRoles.includes(user.role) ? element : <Navigate to="/login" replace />;
};

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <CustomerProvider>
          <ServiceQueueProvider>
            <PartsProvider>
              <Router>
                <div className="min-h-screen flex flex-col bg-gray-100">
                  <TopNav />
                  <div className="container mx-auto px-4 py-8 mt-24 flex-grow">
                    <Routes>
                      <Route path="/" element={<Navigate to="/login" replace />} />
                      <Route path="/login" element={<Login />} />
                      <Route path="/dashboard" element={
                        <ProtectedRoute 
                          element={<Dashboard />} 
                          allowedRoles={['admin', 'technician']} 
                        />
                      } />
                      <Route path="/service/current" element={
                        <ProtectedRoute 
                          element={<ServiceQueuePage />} 
                          allowedRoles={['admin', 'technician']} 
                        />
                      } />
                      <Route path="/parts" element={
                        <ProtectedRoute 
                          element={<PartsInventoryPage />} 
                          allowedRoles={['admin', 'technician']} 
                        />
                      } />
                      <Route path="/customers" element={
                        <ProtectedRoute 
                          element={<Customers />} 
                          allowedRoles={['admin', 'technician']} 
                        />
                      } />
                      <Route path="/technicians" element={
                        <ProtectedRoute 
                          element={<TechniciansPage />} 
                          allowedRoles={['admin', 'technician']} 
                        />
                      } />
                      <Route path="/check-in" element={<CustomerCheckIn />} />
                      <Route path="/thank-you" element={<ThankYou />} />
                    </Routes>
                  </div>
                  <Footer />
                </div>
              </Router>
            </PartsProvider>
          </ServiceQueueProvider>
        </CustomerProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;