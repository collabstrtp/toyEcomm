import React,{useState} from "react";

const Profile = () => {

  const [isEditing, setIsEditing] = useState(false);

  
  const [userData, setUserData] = useState({
    name: 'Sarah Anderson',
    email: 'sarah.anderson@email.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop'
  });


  const handleInputChange = (field, value) => {
    setUserData(prev => ({ ...prev, [field]: value }));
  };




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
            value={userData.phone}
            onChange={(e) => handleInputChange("phone", e.target.value)}
            disabled={!isEditing}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent disabled:bg-gray-100 disabled:text-gray-600 transition-colors"
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
