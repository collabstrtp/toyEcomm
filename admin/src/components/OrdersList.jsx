import React, { useState, useEffect } from "react";
import { toast, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TbTrash } from "react-icons/tb";
import api from "../api/api";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await api.get("/api/orders/all", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
    setLoading(false);
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      const token = localStorage.getItem("token");
      await api.put(
        `/api/orders/${orderId}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setOrders(
        orders.map((order) =>
          order._id === orderId ? { ...order, status } : order,
        ),
      );

      toast.success(`Order status updated to ${status}`, {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const deleteOrder = async (orderId) => {
    if (!window.confirm("Are you sure you want to delete this order?")) {
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await api.delete(`/api/orders/${orderId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setOrders(orders.filter((order) => order._id !== orderId));

      toast.success("Order deleted successfully", {
        position: "bottom-right",
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error deleting order:", error);
      toast.error("Failed to delete order", {
        position: "bottom-right",
        autoClose: 3000,
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-700";
      case "approved":
        return "bg-blue-100 text-blue-700";
      case "shipped":
        return "bg-purple-100 text-purple-700";
      case "delivered":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="text-black flex-col font-anta p-8 box-border bg-white w-full h-screen lg:max-w-[100%] rounded-sm mt-4 lg:m-7 border border-gray-200">
      <h1 className="bold-22 font-anta text-center mb-5">ORDERS LIST</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col justify-center items-center bg-gray-100 py-8 rounded-lg border border-gray-300">
          <p className="font-anta text-black text-center mt-5">
            No orders to show
          </p>
        </div>
      ) : (
        <div className="max-h-[77vh] overflow-auto px-4">
          <table className="w-full mx-auto">
            <thead>
              <tr className="overflow-auto border-b-2 border-black">
                <th className="p-2 font-anta uppercase">Order ID</th>
                <th className="p-2 font-anta uppercase">Customer</th>
                <th className="p-2 font-anta uppercase">Product</th>
                <th className="p-2 font-anta uppercase">Qty</th>
                <th className="p-2 font-anta uppercase">Price</th>
                <th className="p-2 font-anta uppercase">Status</th>
                <th className="p-2 font-anta uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr
                  key={order._id}
                  className="border-b border-gray-300 p-6 medium-14 hover:bg-gray-50"
                >
                  <td className="p-2 font-anta text-xs">
                    {order._id.substring(0, 8)}...
                  </td>
                  <td className="p-2 font-anta text-xs">
                    <div>{order.customerName}</div>
                    <div className="text-gray-500">{order.customerPhone}</div>
                  </td>
                  <td className="p-2 font-anta text-xs">
                    {order.product?.name || "N/A"}
                  </td>
                  <td className="p-2 font-anta text-center">
                    {order.quantity}
                  </td>
                  <td className="p-2 font-anta">₹{order.price}</td>
                  <td className="p-2">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(
                        order.status,
                      )}`}
                    >
                      {order.status}
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center gap-2">
                      <select
                        value={order.status}
                        onChange={(e) =>
                          updateOrderStatus(order._id, e.target.value)
                        }
                        className="border border-gray-300 rounded px-2 py-1 text-xs"
                      >
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                      </select>
                      <button
                        onClick={() => deleteOrder(order._id)}
                        className="p-1.5 bg-red-100 text-red-600 rounded hover:bg-red-200 transition-colors"
                        title="Delete Order"
                      >
                        <TbTrash size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersList;
