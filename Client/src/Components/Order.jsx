import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { BASE_URL } from "../Utils/urlconfig";
import { useNavigate } from "react-router-dom";
import { Star } from "lucide-react";

const Order = () => {
  const { user } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [reviewModal, setReviewModal] = useState({
    open: false,
    order: null,
    product: null,
  });
  const [rating, setRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      fetchOrders();
    }
  }, [user]);

  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem("token");
      const response = await axios.get(`${BASE_URL}/orders/my-orders`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setOrders(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
    setLoading(false);
  };

  const handleReviewClick = async (order) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `${BASE_URL}/orders/can-review/${order.product._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.canReview) {
        setReviewModal({ open: true, order: order, product: order.product });
      } else {
        alert("You are not eligible to review this product yet.");
      }
    } catch (error) {
      console.error("Error checking review eligibility:", error);
      alert("You are not eligible to review this product yet.");
    }
  };

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/products/${reviewModal.product._id}/rate`,
        { rating, review: reviewText },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await axios.put(
        `${BASE_URL}/orders/${reviewModal.order._id}/reviewed`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Review submitted successfully!");
      setReviewModal({ open: false, order: null, product: null });
      setRating(5);
      setReviewText("");
      fetchOrders();
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
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

  if (!user) {
    return (
      <div className="p-5">
        <p>Please login to view your orders.</p>
      </div>
    );
  }

  if (loading) {
    return <p className="p-5">Loading...</p>;
  }

  return (
    <div className="space-y-5 p-5">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">My Orders</h2>

      {orders.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-gray-500">No orders found.</p>
        </div>
      ) : (
        orders.map((order) => (
          <div
            key={order._id}
            className="border border-gray-200 rounded-xl p-6 hover:shadow-lg hover:border-orange-200 transition-all"
          >
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-bold text-lg text-gray-800">
                  Order #{order._id.substring(0, 8)}
                </h3>
                <p className="text-sm text-gray-500 mt-1">
                  {new Date(order.createdAt).toDateString()}
                </p>
              </div>
              <span
                className={`px-4 py-2 rounded-full text-sm font-semibold ${getStatusColor(
                  order.status,
                )}`}
              >
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
              {order.product &&
                order.product.images &&
                order.product.images[0] && (
                  <img
                    src={order.product.images[0]}
                    alt={order.product.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                )}
              <div className="flex-1">
                <h4 className="font-semibold">
                  {order.product ? order.product.name : "Product"}
                </h4>
                <p className="text-gray-600">Qty: {order.quantity}</p>
                <p className="text-orange-600 font-bold">₹{order.price}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-2">
                <span className="text-gray-600 font-medium">
                  Total:{" "}
                  <span className="text-xl font-bold text-gray-800">
                    ₹{order.price * order.quantity}
                  </span>
                </span>
              </div>
              <div className="flex items-center space-x-4">
                {order.status === "delivered" && !order.reviewed && (
                  <button
                    onClick={() => handleReviewClick(order)}
                    className="px-5 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors flex items-center gap-2"
                  >
                    <Star className="w-4 h-4" />
                    Write Review
                  </button>
                )}
                {order.status === "delivered" && order.reviewed && (
                  <span className="text-green-600 font-semibold flex items-center gap-2">
                    <Star className="w-4 h-4 fill-current" />
                    Reviewed
                  </span>
                )}
                <button
                  onClick={() =>
                    navigate(
                      `/product/${order.product ? order.product._id : ""}`,
                    )
                  }
                  className="px-5 py-2 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  View Details
                </button>
              </div>
            </div>
          </div>
        ))
      )}

      {reviewModal.open && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>

            {reviewModal.product && (
              <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
                {reviewModal.product.images &&
                  reviewModal.product.images[0] && (
                    <img
                      src={reviewModal.product.images[0]}
                      alt={reviewModal.product.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                  )}
                <div>
                  <h4 className="font-semibold">{reviewModal.product.name}</h4>
                  <p className="text-gray-600 text-sm">
                    ₹{reviewModal.product.price}
                  </p>
                </div>
              </div>
            )}

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setRating(star)}
                    className={`p-1 ${rating >= star ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <Star
                      className={`w-8 h-8 ${rating >= star ? "fill-current" : ""}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">
                Your Review (Optional)
              </label>
              <textarea
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                placeholder="Share your experience with this product..."
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                rows={4}
              />
            </div>

            <div className="flex gap-4">
              <button
                onClick={() =>
                  setReviewModal({ open: false, order: null, product: null })
                }
                className="flex-1 px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={submitReview}
                className="flex-1 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600"
              >
                Submit Review
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Order;
