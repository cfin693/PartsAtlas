import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  LayoutDashboard, 
  ClipboardList, 
  Package, 
  Users, 
  Wrench, 
  Receipt, 
  BarChart2, 
  Settings, 
  HelpCircle, 
  User,
  LogOut
} from 'lucide-react';
import { useAuth } from '../Auth';

const TopNav: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Don't show navigation on public pages
  const hiddenPaths = ['/login', '/check-in', '/thank-you'];
  if (hiddenPaths.includes(location.pathname)) {
    return null;
  }

  // If there's no user, don't show the navigation
  if (!user) {
    return null;
  }

  const navigationItems = [
    {
      label: 'Service Dashboard',
      icon: <LayoutDashboard className="w-5 h-5" />,
      path: '/dashboard'
    },
    {
      label: 'Service Queue',
      icon: <ClipboardList className="w-5 h-5" />,
      path: '/service/current'
    },
    {
      label: 'Parts & Inventory',
      icon: <Package className="w-5 h-5" />,
      path: '/parts'
    },
    {
      label: 'Customers',
      icon: <Users className="w-5 h-5" />,
      path: '/customers'
    },
    {
      label: 'Technicians',
      icon: <Wrench className="w-5 h-5" />,
      path: '/technicians'
    },
    {
      label: 'Billing',
      icon: <Receipt className="w-5 h-5" />,
      path: '/billing'
    },
    {
      label: 'Reports',
      icon: <BarChart2 className="w-5 h-5" />,
      path: '/reports'
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-full px-4">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link to="/dashboard">
              <img 
                src="https://cdn.shopify.com/s/files/1/0471/4060/2007/files/Untitled_design_-_2024-10-18T145142.458.png?v=1729281733"
                alt="Parts Atlas Logo"
                className="h-20 w-auto"
              />
            </Link>
          </div>

          {/* Main Navigation - Centered */}
          <div className="flex-1 flex justify-center">
            <div className="flex space-x-4">
              {navigationItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  className={`inline-flex items-center px-4 py-2 text-sm font-medium rounded-md ${
                    location.pathname === item.path
                      ? 'text-[#004aad] bg-blue-50'
                      : 'text-gray-700 hover:text-[#004aad] hover:bg-blue-50'
                  }`}
                >
                  {item.icon}
                  <span className="ml-2">{item.label}</span>
                </Link>
              ))}
            </div>
          </div>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            <Link
              to="/settings"
              className="p-2 text-gray-700 hover:text-[#004aad] rounded-md hover:bg-blue-50"
            >
              <Settings className="w-5 h-5" />
            </Link>
            <Link
              to="/help"
              className="p-2 text-gray-700 hover:text-[#004aad] rounded-md hover:bg-blue-50"
            >
              <HelpCircle className="w-5 h-5" />
            </Link>
            <div className="relative">
              <button
                onClick={handleLogout}
                className="p-2 text-gray-700 hover:text-[#004aad] rounded-md hover:bg-blue-50 flex items-center"
              >
                <User className="w-5 h-5 mr-2" />
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNav;