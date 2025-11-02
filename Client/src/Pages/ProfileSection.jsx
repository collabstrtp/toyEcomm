import React, { useState } from 'react';
import { User, Package, MapPin, Settings, LogOut, Edit2, Camera, Save, Eye, EyeOff } from 'lucide-react';

import Address from '../Components/Address';
import Profile from '../Components/Profile';
import Setting from '../Components/Setting';
import Order from '../Components/Order';

export default function ProfileSection() {
  const [activeTab, setActiveTab] = useState('profile');

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'address', icon: MapPin, label: 'Address' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];
  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return <Profile />;

      case 'orders':
        return <Order />;

      case 'address':
        return <Address />;

      case 'settings':
        return <Setting />;

      default:
        return null;
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      // Add logout logic here
      alert('Logged out successfully!');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
            {/* Sidebar */}
            <div className="md:col-span-1 bg-gradient-to-b from-gray-50 to-gray-100 border-r border-gray-200 p-6">
              <div className="space-y-2">
                {menuItems.map(item => (
                  <button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl transition-all font-medium ${
                      activeTab === item.id 
                        ? 'bg-orange-500 text-white shadow-lg transform scale-105' 
                        : 'text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                ))}
                <button 
                  onClick={handleLogout}
                  className="w-full flex items-center space-x-3 px-4 py-3.5 rounded-xl text-red-600 hover:bg-red-50 transition-all mt-8 font-medium"
                >
                  <LogOut className="w-5 h-5" />
                  <span>Logout</span>
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="md:col-span-3 p-6 md:p-10">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}