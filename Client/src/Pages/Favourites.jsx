import React, { useState } from "react";
import { Heart, ShoppingCart, Trash2, ArrowLeft } from "lucide-react";

const Favourites = () => {
  // Sample favorite items - in real app, this would come from state management or context
  const [favouriteItems, setFavouriteItems] = useState([
    {
      id: 1,
      name: "Homall Convertible Sectional Sofa Couch, Modern Linen Fabric L-Shaped Couch 3-Seat Sofa.",
      image:
        "https://i5.walmartimages.com/seo/Homall-Convertible-Sectional-Sofa-Couch-Modern-Linen-Fabric-L-Shaped-Couch-3-Seat-Reversible-Chaise-Small-Living-Room-Apartment-Space-Dark-Gray_580e12a9-825b-4586-87df-e275ea527e67.78b035bcf5754d1e6b0f1aa872ff576a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: "$499.99",
      reviews: "⭐⭐⭐⭐☆ (4.5)",
      inStock: true,
    },
    {
      id: 3,
      name: "Zinus 76 Harmony Indoor Fabric Sofa, Dark Gray.",
      image:
        "https://i5.walmartimages.com/seo/Zinus-Harmony-Indoor-Fabric-Sofa-Dark-Gray_6e34aeaa-bb0e-41cc-84aa-d9c11458daca.8d83b4f1c97d5d919f3f5bb36b88fdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      price: "$299.99",
      reviews: "⭐⭐⭐⭐☆ (4.8)",
      inStock: true,
    },
    {
      id: 5,
      name: "COMHOMA Convertible Futon Sofa Bed Upholstered Futon Couch Fabric Sleeper Sofa, Gray.",
      image:
        "https://i5.walmartimages.com/seo/COMHOMA-Convertible-Futon-Sofa-Bed-Upholstered-Futon-Couch-Fabric-Sleeper-Sofa-Gray_492b9567-40b6-4f98-8dfe-222ad8667e49.260426d1d61d2db517a2eb335f716bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: "$599.99",
      reviews: "⭐⭐⭐⭐☆ (4.6)",
      inStock: true,
    },
    {
      id: 7,
      name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
      image:
        "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      price: "$399.99",
      reviews: "⭐⭐⭐⭐☆ (4.4)",
      inStock: false,
    },
    {
      id: 1,
      name: "Homall Convertible Sectional Sofa Couch, Modern Linen Fabric L-Shaped Couch 3-Seat Sofa.",
      image:
        "https://i5.walmartimages.com/seo/Homall-Convertible-Sectional-Sofa-Couch-Modern-Linen-Fabric-L-Shaped-Couch-3-Seat-Reversible-Chaise-Small-Living-Room-Apartment-Space-Dark-Gray_580e12a9-825b-4586-87df-e275ea527e67.78b035bcf5754d1e6b0f1aa872ff576a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: "$499.99",
      reviews: "⭐⭐⭐⭐☆ (4.5)",
      inStock: true,
    },
    {
      id: 3,
      name: "Zinus 76 Harmony Indoor Fabric Sofa, Dark Gray.",
      image:
        "https://i5.walmartimages.com/seo/Zinus-Harmony-Indoor-Fabric-Sofa-Dark-Gray_6e34aeaa-bb0e-41cc-84aa-d9c11458daca.8d83b4f1c97d5d919f3f5bb36b88fdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      price: "$299.99",
      reviews: "⭐⭐⭐⭐☆ (4.8)",
      inStock: true,
    },
    {
      id: 5,
      name: "COMHOMA Convertible Futon Sofa Bed Upholstered Futon Couch Fabric Sleeper Sofa, Gray.",
      image:
        "https://i5.walmartimages.com/seo/COMHOMA-Convertible-Futon-Sofa-Bed-Upholstered-Futon-Couch-Fabric-Sleeper-Sofa-Gray_492b9567-40b6-4f98-8dfe-222ad8667e49.260426d1d61d2db517a2eb335f716bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
      price: "$599.99",
      reviews: "⭐⭐⭐⭐☆ (4.6)",
      inStock: true,
    },
    {
      id: 7,
      name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
      image:
        "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
      price: "$399.99",
      reviews: "⭐⭐⭐⭐☆ (4.4)",
      inStock: false,
    },
  ]);

  const [notification, setNotification] = useState("");

  const removeFromFavourites = (e, productId) => {
    e.stopPropagation();
    setFavouriteItems(favouriteItems.filter((item) => item.id !== productId));
    showNotification("Removed from favourites");
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    showNotification(`${product.name.substring(0, 30)}... added to cart! 🛒`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  const clearAllFavourites = () => {
    if (window.confirm("Are you sure you want to clear all favourites?")) {
      setFavouriteItems([]);
      showNotification("All favourites cleared");
    }
  };

  return (
    <div className="min-h-screen py-5">
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}
      {/* Main Content */}
      <div className="m-0 p-0 overflow-x-hidden font-sans text-gray-800">
        {favouriteItems.length === 0 ? (
          // Empty State
          <div className="flex flex-col items-center justify-center py-16">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              <Heart className="w-12 h-12 text-gray-400" />
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">
              No favourites yet
            </h2>
            <p className="text-gray-600 mb-6 text-center max-w-md">
              Start adding items to your favourites to keep track of products
              you love!
            </p>
            <button
              onClick={() => window.history.back()}
              className="px-6 py-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors font-medium"
            >
              Start Shopping
            </button>
          </div>
        ) : (
<div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0 max-w-7xl mx-auto px-0">
            {favouriteItems.map((product) => (
              <div
                key={product.id}
                className="flex flex-col items-center border border-gray-300 rounded-xl overflow-hidden max-w-[200px] m-1 bg-white shadow-md transition-transform hover:scale-[1.02] relative"
              >
                {/* Remove Button (Filled Heart) */}
                <button
                  onClick={(e) => removeFromFavourites(e, product.id)}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group"
                  aria-label="Remove from favorites"
                >
                  <Heart className="w-6 h-6 fill-red-500 text-red-500 group-hover:fill-red-600 group-hover:text-red-600 transition-all duration-200" />
                </button>

                {/* Out of Stock Badge */}
                {!product.inStock && (
                  <div className="absolute top-3 left-3 z-10 bg-red-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
                    Out of Stock
                  </div>
                )}

                {/* Image */}
                <div className="relative w-full">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-auto block"
                  />
                </div>

                {/* Main content */}
                <div className="p-4 text-center w-full">
                  <div className="flex items-center px-3 py-0 border-t border-gray-200 bg-gray-50 w-full">
                  <p className="text-sm text-gray-700 truncate">{product.name}</p>
                </div>
                  <div className="mt-1">
                    <h2 className="text-lg font-semibold text-gray-800">
                      {product.price}
                    </h2>
                  </div>

                  <button
                    onClick={(e) => addToCart(e, product)}
                    disabled={!product.inStock}
                    className={`mt-2 w-full py-1 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                      product.inStock
                        ? "bg-orange-500 text-white hover:bg-orange-600"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? "Add to Cart" : "Out of Stock"}
                  </button>

                  <div className="mt-2 text-sm">{product.reviews}</div>
                </div>

                {/* Product name */}
                
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Favourites;
