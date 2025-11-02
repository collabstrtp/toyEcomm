import React, { useState } from "react";
import { Info, Shield } from "lucide-react";

const Cart = () => {
  const [cartItems] = useState([
    {
      id: 1,
      name: "boAt Airdopes Supreme w/ 4 Mics AI ENx Tech, 50 HRS...",
      description: "Serene Green, True Wireless",
      image:
        "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=150&h=150&fit=crop",
      status: "Out Of Stock",
      price: 5299,
    },
    {
      id: 2,
      name: "PUMA Bridge Comfort Running Shoes For Men",
      description: "Size: 9, Black , 9",
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&h=150&fit=crop",
      status: "Out Of Stock",
      price: 3499,
    },
    {
      id: 3,
      name: "DEFENDER HUB Silicone Rubber Earbuds Tips, Eartips, ...",
      description: "Pack of 1, RED & BLACK",
      image:
        "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=150&h=150&fit=crop",
      status: "Out Of Stock",
      price: 299,
    },
  ]);

  const priceDetails = {
    itemCount: 7,
    originalPrice: 153339,
    discount: 39324,
    protectFee: 158,
    totalAmount: 114173,
    savings: 39166,
  };

  return (
    <div className="min-h-screen ">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cart Items Section */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              {/* Header */}
              <div className="p-4 border-b flex justify-between items-center">
                <h2 className="text-lg font-semibold">From Saved Addresses</h2>
                <button className="text-blue-600 text-sm font-medium hover:underline">
                  Enter Delivery Pincode
                </button>
              </div>

              {/* Cart Items */}
              <div className="divide-y">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex gap-4">
                      {/* Product Image */}
                      <div className="flex shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-28 h-28 object-cover rounded"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h3 className="text-base font-medium text-gray-900 mb-1">
                          {item.name}
                        </h3>
                        <p className="text-sm text-gray-600 mb-2">
                          {item.description}
                        </p>
                        <p className="text-red-600 text-sm font-medium mb-4">
                          {item.status}
                        </p>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                          <button className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                            SAVE FOR LATER
                          </button>
                          <button className="text-sm font-semibold text-gray-700 hover:text-gray-900">
                            REMOVE
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Place Order Button */}
              <div className="p-4 border-t">
                <button className="w-full bg-orange-600 text-white py-3 rounded font-semibold text-base hover:bg-orange-700 transition-colors">
                  PLACE ORDER
                </button>
              </div>
            </div>
          </div>

          {/* Price Details Section */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-4">
              <div className="p-4 border-b">
                <h2 className="text-base font-semibold text-gray-700 uppercase">
                  Price Details
                </h2>
              </div>

              <div className="p-4 space-y-4">
                {/* Price Item */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">
                      Price ({priceDetails.itemCount} items)
                    </span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <span className="text-sm">
                    ₹{priceDetails.originalPrice.toLocaleString()}
                  </span>
                </div>

                {/* Discount */}
                <div className="flex justify-between items-center">
                  <span className="text-sm">Discount</span>
                  <span className="text-sm text-green-600">
                    − ₹{priceDetails.discount.toLocaleString()}
                  </span>
                </div>

                {/* Protect Fee */}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-1">
                    <span className="text-sm">Protect Promise Fee</span>
                    <Info size={14} className="text-gray-400" />
                  </div>
                  <span className="text-sm">₹{priceDetails.protectFee}</span>
                </div>

                {/* Total Amount */}
                <div className="pt-4 border-t flex justify-between items-center">
                  <span className="text-base font-semibold">Total Amount</span>
                  <span className="text-base font-semibold">
                    ₹{priceDetails.totalAmount.toLocaleString()}
                  </span>
                </div>

                {/* Savings */}
                <div className="pt-2">
                  <p className="text-sm text-green-600 font-medium">
                    You will save ₹{priceDetails.savings.toLocaleString()} on
                    this order
                  </p>
                </div>
              </div>

              {/* Security Info */}
              <div className="p-4 bg-gray-50 border-t flex gap-3">
                <Shield
                  size={20}
                  className="text-gray-600 flex shrink-0 mt-1"
                />
                <p className="text-xs text-gray-600 leading-relaxed">
                  Safe and Secure Payments. Easy returns. 100% Authentic
                  products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
