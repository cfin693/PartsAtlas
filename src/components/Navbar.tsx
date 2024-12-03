import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Home, LogOut, UserPlus } from 'lucide-react';
import { useAuth } from './Auth';
import NotificationCenter from './Notifications/NotificationCenter';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  if (!user) return null;

  return (
    <nav className="bg-[#ebeee9] text-gray-800 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img 
            src="https://cdn.shopify.com/s/files/1/0471/4060/2007/files/Untitled_design_-_2024-10-18T145142.458.png?v=1729281733" 
            alt="Parts Atlas Logo" 
            className="w-[150px] h-[150px] mr-2"
          />
        </Link>
        <div className="flex items-center space-x-6">
          <Link to="/" className="hover:text-[#004aad] flex items-center">
            <Home className="inline-block mr-1 text-[#004aad]" />
            <span>Dashboard</span>
          </Link>
          <Link to="/check-in" className="hover:text-[#004aad] flex items-center">
            <UserPlus className="inline-block mr-1 text-[#004aad]" />
            <span>Customer Check-In</span>
          </Link>
          <NotificationCenter />
          <button onClick={handleLogout} className="hover:text-[#004aad] flex items-center">
            <LogOut className="inline-block mr-1 text-[#004aad]" />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;