import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";
import FilterBar from "../Components/FilterBar";

const CategoryProducts = () => {
  const { name } = useParams();
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/products/category/${name}`,
        );
        setProducts(response.data.products);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();

    // Load favorites from localStorage
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, [name]);

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    const isFavorited = favorites.some((fav) => fav.id === product._id);
    let updatedFavorites;
    if (isFavorited) {
      updatedFavorites = favorites.filter((fav) => fav.id !== product._id);
      setFavorites(updatedFavorites);
      showNotification("Removed from favourites");
    } else {
      updatedFavorites = [...favorites, product];
      setFavorites(updatedFavorites);
      showNotification("Added to favourites ❤️");
    }
    // Save to localStorage
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  const isFavorited = (productId) =>
    favorites.some((fav) => fav.id === productId);

  const addToCart = (e, product) => {
    e.stopPropagation();
    showNotification(`${product.name.substring(0, 30)}... added to cart! 🛒`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Loading products...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 py-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 capitalize">
          {name} Products
        </h1>

        {products.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">
              No products found in this category
            </p>
          </div>
        ) : (
          <>
            {/*   <FilterBar />  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <div
                  key={product._id}
                  className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer relative"
                  onClick={() => navigate("/product")}
                >
                  <button
                    onClick={(e) => toggleFavorite(e, product)}
                    className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 transition-all"
                  >
                    <Heart
                      className={`w-5 h-5 transition-all ${
                        isFavorited(product._id)
                          ? "fill-red-500 text-red-500"
                          : "text-gray-400"
                      }`}
                    />
                  </button>

                  <div className="relative w-full aspect-square">
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="p-4 flex-1 flex flex-col">
                    <p className="text-xs text-orange-600 font-medium mb-2">
                      {product.category?.name || name}
                    </p>
                    <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-1">
                      {product.name}
                    </h3>

                    <div className="mt-auto space-y-2">
                      <p className="text-xl font-bold text-gray-900">
                        ₹{product.price.toFixed(2)}
                      </p>

                      <button
                        onClick={(e) => addToCart(e, product)}
                        disabled={!product.available}
                        className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                          product.available
                            ? "bg-orange-500 text-white hover:bg-orange-600"
                            : "bg-gray-200 text-gray-500 cursor-not-allowed"
                        }`}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {product.available ? "Add to Cart" : "Out of Stock"}
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CategoryProducts;
