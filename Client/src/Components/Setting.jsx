import React, { useState } from "react";
import { User, Package, MapPin, Settings, LogOut, Edit2, Camera, Save, Eye, EyeOff } from 'lucide-react';

const Setting = () => {
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const [userData, setUserData] = useState({
    name: "Sarah Anderson",
    email: "sarah.anderson@email.com",
    phone: "+1 (555) 123-4567",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
  });

  const [passwordData, setPasswordData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (field, value) => {
    setPasswordData((prev) => ({ ...prev, [field]: value }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    // Add password change logic here
    alert("Password changed successfully!");
    setPasswordData({ oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  return (
    <div className="space-y-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Settings</h2>

      <div className="bg-white border border-gray-200 rounded-xl p-8">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-bold text-gray-800">
            Profile Information
          </h3>
          <button className="flex items-center space-x-2 px-4 py-2 bg-orange-100 text-orange-700 font-semibold rounded-lg hover:bg-orange-200 transition-colors">
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
        <h3 className="text-xl font-bold text-gray-800 mb-6">
          Change Password
        </h3>
        <div className="space-y-5 max-w-xl">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Current Password
            </label>
            <div className="relative">
              <input
                type={showOldPassword ? "text" : "password"}
                value={passwordData.oldPassword}
                onChange={(e) =>
                  handlePasswordChange("oldPassword", e.target.value)
                }
                placeholder="Enter current password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowOldPassword(!showOldPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showOldPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              New Password
            </label>
            <div className="relative">
              <input
                type={showNewPassword ? "text" : "password"}
                value={passwordData.newPassword}
                onChange={(e) =>
                  handlePasswordChange("newPassword", e.target.value)
                }
                placeholder="Enter new password"
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowNewPassword(!showNewPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showNewPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Confirm New Password
            </label>
            <input
              type="password"
              value={passwordData.confirmPassword}
              onChange={(e) =>
                handlePasswordChange("confirmPassword", e.target.value)
              }
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
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          Notification Preferences
        </h3>
        <div className="space-y-4">
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700">
              Email notifications for orders
            </span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              defaultChecked
              className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700">Promotional emails and offers</span>
          </label>
          <label className="flex items-center space-x-3 cursor-pointer">
            <input
              type="checkbox"
              className="w-5 h-5 text-orange-500 rounded focus:ring-orange-500"
            />
            <span className="text-gray-700">SMS notifications</span>
          </label>
        </div>
      </div>
    </div>
  );
};

export default Setting;
