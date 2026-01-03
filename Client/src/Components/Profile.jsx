import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";
import { Camera } from "lucide-react";

const Profile = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    number: "",
    profilePic: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/auth/profile`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.data.success) {
          setUserData({
            name: response.data.user.name,
            email: response.data.user.email,
            number: response.data.user.number || "",
            profilePic:
              response.data.user.profilePic ||
              "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
          });
        }
      } catch (err) {
        setError("Failed to load profile data");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (token) {
      fetchProfile();
    } else {
      setLoading(false);
      setError("No authentication token found");
    }
  }, [token]);

  const handleInputChange = (field, value) => {
    setUserData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `${BASE_URL}/auth/profile`,
        {
          name: userData.name,
          email: userData.email,
          number: userData.number,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setIsEditing(false);
        // Optionally update Redux state or show success message
      }
    } catch (err) {
      console.error("Failed to update profile", err);
      // Handle error
    }
  };

  if (loading) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-gray-500">Loading profile...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-6">
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
        </div>
        <div className="flex justify-center items-center h-64">
          <div className="text-red-500">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800">My Profile</h2>
      </div>

      <div className="flex items-center space-x-6 pb-8 border-b border-gray-200">
        <div className="relative group">
          <img
            src={userData.profilePic}
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
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Full Name
          </label>
          <input
            type="text"
            value={userData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Email Address
          </label>
          <input
            type="email"
            value={userData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            value={userData.number}
            onChange={(e) => handleInputChange("number", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
          />
        </div>
      </div>

      <div className="flex justify-end space-x-4 pt-6">
        {isEditing ? (
          <>
            <button
              onClick={() => setIsEditing(false)}
              className="px-6 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Save Changes
            </button>
          </>
        ) : (
          <button
            onClick={() => setIsEditing(true)}
            className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
          >
            Edit Profile
          </button>
        )}
      </div>
    </div>
  );
};

export default Profile;
