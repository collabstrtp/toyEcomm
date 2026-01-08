import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import FilterBar from "../Components/FilterBar";
import Navbar from "../Components/Navbar";
import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";

function ProductList({ fixed = true }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [filters, setFilters] = useState({
    priceRange: [0, 700],
    sortOrder: "featured",
    categories: [],
    colors: [],
    materials: [],
    gender: [],
    ageGroup: [],
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/allproducts`);

        const normalizedProducts = res.data.products.map((p) => ({
          id: p._id,
          name: p.name,
          image: p.images[0],
          images: p.images,
          price: p.price,
          discountPercent: p.discountPercent,
          category: p.category?.name?.trim(),
          color: p.color,
          material: p.material,
          gender: p.gender,
          ageGroup: p.ageGroup,
          inStock: p.stock > 0,
          stock: p.stock,
          reviews: `⭐⭐⭐⭐☆ (${p.ratings.length || 0})`,
        }));

        setProducts(normalizedProducts);
        console.log("Fetched products:", normalizedProducts);
      } catch (err) {
        console.error("Error fetching products", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filterOptions = {
    categories: ["Electronics", "Soft toys", "toy"],
    colors: ["blue", "red", "black", "b"],
    materials: ["plastic", "gold", "leather"],
    gender: ["boys", "girls", "unisex"],
    ageGroups: ["0-2", "3-5", "6-8", "13+"],
  };

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
      showNotification("Removed from favourites");
    } else {
      setFavorites([...favorites, product]);
      showNotification("Added to favourites ❤️");
    }
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

  const handleFilterChange = (filterType, value) => {
    setFilters((prev) => {
      if (filterType === "priceRange") {
        return { ...prev, priceRange: value };
      }
      if (Array.isArray(prev[filterType])) {
        const exists = prev[filterType].includes(value);
        return {
          ...prev,
          [filterType]: exists
            ? prev[filterType].filter((item) => item !== value)
            : [...prev[filterType], value],
        };
      }
      return { ...prev, [filterType]: value };
    });
  };

  const clearFilters = () => {
    setFilters({
      priceRange: [0, 700],
      sortOrder: "featured",
      categories: [],
      colors: [],
      materials: [],
      gender: [],
      ageGroup: [],
    });
  };

  const getFilteredProducts = () => {
    let filtered = [...products];

    filtered = filtered.filter(
      (p) =>
        p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]
    );

    if (filters.categories.length > 0) {
      filtered = filtered.filter((p) =>
        filters.categories.includes(p.category)
      );
    }

    if (filters.colors.length > 0) {
      filtered = filtered.filter((p) => filters.colors.includes(p.color));
    }

    if (filters.materials.length > 0) {
      filtered = filtered.filter((p) => filters.materials.includes(p.material));
    }

    if (filters.gender.length > 0) {
      filtered = filtered.filter((p) => filters.gender.includes(p.gender));
    }

    if (filters.ageGroup.length > 0) {
      filtered = filtered.filter((p) => filters.ageGroup.includes(p.ageGroup));
    }

    switch (filters.sortOrder) {
      case "priceLowHigh":
        filtered.sort((a, b) => a.price - b.price);
        break;
      case "priceHighLow":
        filtered.sort((a, b) => b.price - a.price);
        break;
      case "nameAZ":
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return filtered;
  };

  const filteredProducts = getFilteredProducts();
  const activeFilterCount =
    filters.categories.length +
    filters.colors.length +
    filters.materials.length +
    filters.gender.length +
    filters.ageGroup.length;

  return (
    <div className="min-h-screen overflow-visible">
      {/* Notification */}
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

      {/* Filter Bar - Now with horizontal dropdowns on desktop */}
      <FilterBar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        filteredProductsCount={filteredProducts.length}
        totalProductsCount={products.length}
        activeFilterCount={activeFilterCount}
        filterOptions={filterOptions}
        className="z-1000"
      />

      {/* Horizontal Bar */}
      <div className="border-t border-gray-300 h-1 mt-40 bg-gray-100"></div>

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 pt-10 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-hide">
        {filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-xl text-gray-500 mb-4">
              No products found matching your filters
            </p>
            <button
              onClick={clearFilters}
              className="px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
            >
              Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-all cursor-pointer relative"
                onClick={() => navigate(`/product/${product.id}`)}
              >
                <button
                  onClick={(e) => toggleFavorite(e, product)}
                  className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-md hover:scale-110 transition-all"
                >
                  <Heart
                    className={`w-5 h-5 transition-all ${
                      isFavorited(product.id)
                        ? "fill-red-500 text-red-500"
                        : "text-gray-400"
                    }`}
                  />
                </button>

                <div className="relative w-full aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 flex-1 flex flex-col">
                  <p className="text-xs text-orange-600 font-medium mb-2">
                    {product.category}
                  </p>
                  <h3 className="text-sm font-medium text-gray-800 mb-2 line-clamp-2 flex-1">
                    {product.name}
                  </h3>

                  <div className="mt-auto space-y-2">
                    <p className="text-xl font-bold text-gray-900">
                      ${product.price.toFixed(2)}
                    </p>

                    <button
                      onClick={(e) => addToCart(e, product)}
                      disabled={!product.inStock}
                      className={`w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
                        product.inStock
                          ? "bg-orange-500 text-white hover:bg-orange-600"
                          : "bg-gray-200 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {product.inStock ? "Add to Cart" : "Out of Stock"}
                    </button>

                    <div className="text-xs text-center text-gray-600">
                      {product.reviews}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProductList;
