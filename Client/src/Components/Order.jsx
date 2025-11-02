import React from "react";

const Order = () => {

    const orders = [
    { id: '#ORD-2024-1234', date: 'Oct 28, 2025', status: 'Delivered', total: '$124.99', items: 3 },
    { id: '#ORD-2024-1189', date: 'Oct 15, 2025', status: 'In Transit', total: '$89.50', items: 2 },
    { id: '#ORD-2024-1145', date: 'Oct 02, 2025', status: 'Delivered', total: '$234.00', items: 5 },
    { id: '#ORD-2024-1089', date: 'Sep 20, 2025', status: 'Delivered', total: '$156.75', items: 4 }
  ];
  return (
    <div className="space-y-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>
      {orders.map((order) => (
        <div
          key={order.id}
          className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all"
        >
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-bold text-lg text-gray-800">{order.id}</h3>
              <p className="text-sm text-gray-500 mt-1">{order.date}</p>
            </div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-semibold ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700"
                  : "bg-blue-100 text-blue-700"
              }`}
            >
              {order.status}
            </span>
          </div>
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <p className="text-gray-600 font-medium">{order.items} items</p>
            <div className="flex items-center space-x-4">
              <span className="text-xl font-bold text-gray-800">
                {order.total}
              </span>
              <button className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Order;
