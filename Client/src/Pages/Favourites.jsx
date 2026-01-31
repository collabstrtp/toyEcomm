import React, { useState, useEffect } from "react";
import {
  Heart,
  MessageCircle,
  ShoppingCart,
  Trash2,
  ArrowLeft,
} from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import redirectToWhatsApp from "../Utils/whatsapp";

const Favourites = () => {
  const [favouriteItems, setFavouriteItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [notification, setNotification] = useState("");
  const [error, setError] = useState("");
  const { user, token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  // Fetch user's favourites from backend
  useEffect(() => {
    if (user && token) {
      fetchFavourites();
    }
  }, [user, token]);

  const fetchFavourites = async () => {
    try {
      setLoading(true);
      setError("");

      if (!token) {
        setError("Please log in to view your favorites");
        setLoading(false);
        return;
      }

      // Get user's favourites from backend (already populated with full product details)
      const response = await axios.get(`${BASE_URL}/auth/favorites`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.data.success) {
        // response.data.favorites contains populated product objects
        const favouriteProducts = response.data.favorites.map((product) => ({
          _id: product._id,
          name: product.name,
          images: product.images || [],
          price: product.price,
          discountPercent: product.discountPercent || 0,
          category: product.category,
          stock: product.stock || 0,
          ratings: product.ratings || [],
        }));

        setFavouriteItems(favouriteProducts);
      }
    } catch (err) {
      console.error("Error fetching favourites:", err);
      setError("Failed to load favourites. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const removeFromFavourites = async (e, productId) => {
    e.stopPropagation();

    try {
      // Remove from backend
      const response = await axios.delete(
        `${BASE_URL}/auth/favorites/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (response.data.success) {
        // Remove from state
        setFavouriteItems(
          favouriteItems.filter((item) => item._id !== productId),
        );
        showNotification("Removed from favourites");
      }
    } catch (err) {
      console.error("Error removing from favourites:", err);
      showNotification("Error removing item");
    }
  };

  const contactViaWhatsApp = (e, product) => {
    e.stopPropagation();
    // Use the centralized WhatsApp util to open the chat
    redirectToWhatsApp(product);
    showNotification(
      `Opening WhatsApp for ${product.name.substring(0, 30)}... 💬`,
    );
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  const clearAllFavourites = async () => {
    if (window.confirm("Are you sure you want to clear all favourites?")) {
      try {
        // Remove all favorites one by one or in bulk
        const promises = favouriteItems.map((item) =>
          axios.delete(`${BASE_URL}/auth/favorites/${item._id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }),
        );

        await Promise.all(promises);
        setFavouriteItems([]);
        showNotification("All favourites cleared");
      } catch (err) {
        console.error("Error clearing favorites:", err);
        showNotification("Error clearing favorites");
      }
    }
  };

  return (
    <div className="min-h-screen py-8 bg-gray-50">
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}

      {/* Header */}
      <div className="max-w-7xl mx-auto px-4 mb-8">
        <div className="flex items-center justify-between mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-orange-500 hover:text-orange-600 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </button>
          <h1 className="text-3xl font-bold text-gray-900 flex-1 text-center">
            My Favourites
          </h1>
          {favouriteItems.length > 0 && (
            <button
              onClick={clearAllFavourites}
              className="px-4 py-2 bg-red-50 text-red-600 rounded-lg hover:bg-red-100 transition-colors font-medium flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="w-12 h-12 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">Loading favourites...</p>
            </div>
          </div>
        ) : error ? (
          <div className="text-center py-20">
            <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
              <p className="text-red-600 font-medium mb-4">{error}</p>
              <button
                onClick={fetchFavourites}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Retry
              </button>
            </div>
          </div>
        ) : favouriteItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-xl border border-gray-200">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-6">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No favourites yet
            </h2>
            <p className="text-gray-600 mb-8 text-center max-w-md">
              Start adding items to your favourites to keep track of products
              you love!
            </p>
            <button
              onClick={() => navigate("/products")}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {favouriteItems.map((product) => (
              <div
                key={product._id}
                onClick={() => navigate(`/product/${product._id}`)}
                className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:border-orange-300 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer relative group"
              >
                {/* Remove Button */}
                <button
                  onClick={(e) => removeFromFavourites(e, product._id)}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group-hover:opacity-100 opacity-75"
                  aria-label="Remove from favorites"
                >
                  <Heart className="w-6 h-6 fill-red-500 text-red-500 hover:fill-red-600 hover:text-red-600 transition-all duration-200" />
                </button>

                {/* Image Container */}
                <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
                  <img
                    src={
                      product.images?.[0] ||
                      "https://via.placeholder.com/300x200"
                    }
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />

                  {/* Out of Stock Badge */}
                  {product.stock === 0 && (
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
                      <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                        Out of Stock
                      </span>
                    </div>
                  )}

                  {/* Discount Badge */}
                  {product.discountPercent > 0 && (
                    <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
                      -{product.discountPercent}%
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  {/* Category */}
                  <p className="text-xs text-gray-500 mb-1 truncate">
                    {typeof product.category === "object"
                      ? product.category?.name || "Uncategorized"
                      : product.category || "Uncategorized"}
                  </p>

                  {/* Product Name */}
                  <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-orange-500 transition-colors">
                    {product.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-lg font-bold text-gray-900">
                      ₹{product.price?.toFixed(2) || "N/A"}
                    </span>
                    {product.discountPercent > 0 && (
                      <span className="text-sm text-gray-500 line-through">
                        ₹
                        {(
                          product.price /
                          (1 - product.discountPercent / 100)
                        ).toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={(e) => contactViaWhatsApp(e, product)}
                    disabled={product.stock === 0}
                    className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      product.stock > 0
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    {product.stock > 0 ? "Buy via WhatsApp" : "Out of Stock"}
                  </button>

                  <div className="text-xs text-center text-gray-600">
                    {`⭐⭐⭐⭐☆ (${product.ratings?.length || 0})`}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Summary Section */}
        {!loading && !error && favouriteItems.length > 0 && (
          <div className="mt-12 bg-white rounded-lg border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-600 mb-1">Total Items in Favourites</p>
                <p className="text-3xl font-bold text-gray-900">
                  {favouriteItems.length}
                </p>
              </div>
              <button
                onClick={() => navigate("/productlist")}
                className="px-8 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
