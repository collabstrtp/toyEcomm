import React from "react";
import {Edit2} from 'lucide-react';

const Address = () => {
  const addresses = [
    {
      id: 1,
      type: "Home",
      address: "123 Main Street, Apt 4B",
      city: "New York, NY 10001",
      isDefault: true,
    },
    {
      id: 2,
      type: "Work",
      address: "456 Business Ave, Suite 200",
      city: "New York, NY 10002",
      isDefault: false,
    },
  ];
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Addresses</h2>
        <button className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
          + Add New Address
        </button>
      </div>
      {addresses.map((addr) => (
        <div
          key={addr.id}
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-3">
                <h3 className="font-bold text-lg text-gray-800">{addr.type}</h3>
                {addr.isDefault && (
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs font-semibold rounded-full">
                    Default
                  </span>
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
};

export default Address;
