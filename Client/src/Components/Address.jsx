import React, { useState, useEffect } from "react";
import { Edit2, Trash2, Plus, Save, X } from "lucide-react";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Utils/urlconfig";

const Address = () => {
  const [addresses, setAddresses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    type: "Home",
    address: "",
    city: "",
    isDefault: false,
  });

  const token = useSelector((state) => state.auth.token);

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const response = await fetch(`${BASE_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.user.addresses || []);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddAddress = async () => {
    try {
      // Create new address without _id (let server generate it)
      const newAddress = {
        ...formData,
      };

      // Add to current addresses
      const updatedAddresses = [...addresses, newAddress];

      // Ensure only one default address
      if (formData.isDefault) {
        updatedAddresses.forEach((addr) => {
          if (addr !== newAddress) {
            addr.isDefault = false;
          }
        });
      }

      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.user.addresses);
        setShowAddForm(false);
        resetForm();
      }
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };

  const handleUpdateAddress = async (addressId) => {
    try {
      const updatedAddresses = addresses.map((addr) =>
        addr._id === addressId ? { ...addr, ...formData } : addr
      );

      // Ensure only one default address
      if (formData.isDefault) {
        updatedAddresses.forEach((addr) => {
          if (addr._id !== addressId) {
            addr.isDefault = false;
          }
        });
      }

      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.user.addresses);
        setEditingId(null);
        resetForm();
      }
    } catch (error) {
      console.error("Error updating address:", error);
    }
  };

  const handleDeleteAddress = async (addressId) => {
    if (!window.confirm("Are you sure you want to delete this address?"))
      return;

    try {
      const updatedAddresses = addresses.filter(
        (addr) => addr._id !== addressId
      );

      const response = await fetch(`${BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ addresses: updatedAddresses }),
      });
      const data = await response.json();
      if (data.success) {
        setAddresses(data.user.addresses);
      }
    } catch (error) {
      console.error("Error deleting address:", error);
    }
  };

  const startEditing = (address) => {
    setEditingId(address._id);
    setFormData({
      type: address.type,
      address: address.address,
      city: address.city,
      isDefault: address.isDefault,
    });
  };

  const cancelEditing = () => {
    setEditingId(null);
    resetForm();
  };

  const resetForm = () => {
    setFormData({
      type: "Home",
      address: "",
      city: "",
      isDefault: false,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      handleUpdateAddress(editingId);
    } else {
      handleAddAddress();
    }
  };
  if (loading) {
    return <div className="text-center py-8">Loading addresses...</div>;
  }

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800">My Addresses</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="px-5 py-2.5 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add New Address</span>
        </button>
      </div>

      {/* Add/Edit Form */}
      {(showAddForm || editingId) && (
        <div className="border border-gray-200 rounded-xl p-6 bg-gray-50">
          <h3 className="text-xl font-bold text-gray-800 mb-4">
            {editingId ? "Edit Address" : "Add New Address"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Type
                </label>
                <select
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({ ...formData, type: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                >
                  <option value="Home">Home</option>
                  <option value="Work">Work</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Address
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter address"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) =>
                    setFormData({ ...formData, city: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                  placeholder="Enter city"
                  required
                />
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="isDefault"
                  checked={formData.isDefault}
                  onChange={(e) =>
                    setFormData({ ...formData, isDefault: e.target.checked })
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="isDefault"
                  className="text-sm font-medium text-gray-700"
                >
                  Set as default address
                </label>
              </div>
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="px-4 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors flex items-center space-x-2"
              >
                <Save className="w-4 h-4" />
                <span>{editingId ? "Update" : "Add"} Address</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowAddForm(false);
                  cancelEditing();
                }}
                className="px-4 py-2 bg-gray-500 text-white font-semibold rounded-lg hover:bg-gray-600 transition-colors flex items-center space-x-2"
              >
                <X className="w-4 h-4" />
                <span>Cancel</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Address List */}
      {addresses.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          No addresses found. Add your first address above.
        </div>
      ) : (
        addresses.map((addr) => (
          <div
            key={addr._id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-3">
                  <h3 className="font-bold text-lg text-gray-800">
                    {addr.type}
                  </h3>
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
                <button
                  onClick={() => startEditing(addr)}
                  className="p-2.5 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <Edit2 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDeleteAddress(addr._id)}
                  className="p-2.5 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Address;
