import React, { useState } from 'react';
import { User, Package, MapPin, Settings, LogOut, Edit2, Camera, Save, Eye, EyeOff } from 'lucide-react';

export default function Profile() {
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showAddressForm, setShowAddressForm] = useState(false);
  
  const [userData, setUserData] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const orders = [
    { id: '#ORD-2024-1234', date: 'Oct 28, 2025', status: 'Delivered', total: '$124.99', items: 3 },
    { id: '#ORD-2024-1189', date: 'Oct 15, 2025', status: 'In Transit', total: '$89.50', items: 2 },
    { id: '#ORD-2024-1145', date: 'Oct 02, 2025', status: 'Delivered', total: '$234.00', items: 5 },
    { id: '#ORD-2024-1089', date: 'Sep 20, 2025', status: 'Delivered', total: '$156.75', items: 4 }
  ];

  const addresses = [
    { id: 1, type: 'Home', address: '123 Main Street, Apt 4B', city: 'New York, NY 10001', isDefault: true },
    { id: 2, type: 'Work', address: '456 Business Ave, Suite 200', city: 'New York, NY 10002', isDefault: false }
  ];

  const menuItems = [
    { id: 'profile', icon: User, label: 'Profile' },
    { id: 'orders', icon: Package, label: 'Orders' },
    { id: 'address', icon: MapPin, label: 'Address' },
    { id: 'settings', icon: Settings, label: 'Settings' }
  ];

  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field, value) => {
    setPasswordData(prev => ({ ...prev, [field]: value }));
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    // Add save logic here
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    // Add password change logic here
    alert('Password changed successfully!');
    setPasswordData({ oldPassword: '', newPassword: '', confirmPassword: '' });
  };

  const renderContent = () => {
    switch(activeTab) {
      case 'profile':
        return (
          <div className="space-y-6">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
            </div>

            <div className="flex items-center space-x-6 pb-8 border-b border-gray-200">
              <div className="relative group">
                <img 
                  src={userData.avatar} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-full object-cover ring-4 ring-orange-100"
                />
                {isEditing && (
                  <button className="absolute inset-0 bg-black bg-opacity-60 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Camera className="w-7 h-7 text-white" />
                  </button>
                )}
              </div>
              <div>
                <h3 className="text-2xl font-bold text-gray-800">{userData.name}</h3>
                <p className="text-gray-500 mt-1">Member since October 2023</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
                <input 
                  type="text" 
                  value={userData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  value={userData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number</label>
                <input 
                  type="tel" 
                  value={userData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  disabled={!isEditing}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
                />
              </div>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="space-y-5">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
            {orders.map(order => (
              <div key={order.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
                    <p className="text-sm text-gray-500 mt-1">{order.date}</p>
                  </div>
                  <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                    order.status === 'Delivered' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                  }`}>
                    {order.status}
                  </span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <p className="text-gray-600 font-medium">{order.items} items</p>
                  <div className="flex items-center space-x-4">
                    <span className="text-xl font-bold text-gray-800">{order.total}</span>
                    <button className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'address':
        return (
          <div className="space-y-5">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-3xl font-bold text-gray-800">My Addresses</h2>
              <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                + Add New Address
              </button>
            </div>
            {addresses.map(addr => (
              <div key={addr.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="font-bold text-lg text-gray-800">{addr.type}</h3>
                      {addr.isDefault && (
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">Default</span>
                      )}
                    </div>
                    <p className="text-gray-600 leading-relaxed">{addr.address}</p>
                    <p className="text-gray-600">{addr.city}</p>
                  </div>
                  <div className="flex space-x-2">
                    <button className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
                      <Edit2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'settings':
        return (
          <div className="space-y-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>
            
            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-800">Profile Information</h3>
                <button 
                  onClick={() => setActiveTab('profile')}
                  className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors"
                >
                  <Edit2 className="w-4 h-4" />
                  <span>Edit Profile</span>
                </button>
              </div>
              <div className="space-y-3 text-gray-600">
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-700 w-24">Name:</span>
                  <span>{userData.name}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-700 w-24">Email:</span>
                  <span>{userData.email}</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="font-semibold text-gray-700 w-24">Phone:</span>
                  <span>{userData.phone}</span>
                </div>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Change Password</h3>
              <div className="space-y-5 max-w-xl">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Current Password</label>
                  <div className="relative">
                    <input 
                      type={showOldPassword ? "text" : "password"}
                      value={passwordData.oldPassword}
                      onChange={(e) => handlePasswordChange('oldPassword', e.target.value)}
                      placeholder="Enter current password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowOldPassword(!showOldPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showOldPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">New Password</label>
                  <div className="relative">
                    <input 
                      type={showNewPassword ? "text" : "password"}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      placeholder="Enter new password"
                      className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    >
                      {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Confirm New Password</label>
                  <input 
                    type="password"
                    value={passwordData.confirmPassword}
                    onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                    placeholder="Confirm new password"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  />
                </div>
                <button 
                  onClick={handleChangePassword}
                  className="w-full px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  Update Password
                </button>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-xl p-8">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                  <span className="text-gray-700">Email notifications for orders</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" defaultChecked className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                  <span className="text-gray-700">Promotional emails and offers</span>
                </label>
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input type="checkbox" className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500" />
                  <span className="text-gray-700">SMS notifications</span>
                </label>
              </div>
            </div>
          </div>
        );

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