/* import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import FilterBar from "../Components/FilterBar";
import FilterSidebar from "../Components/FilterSidebar";

const products = [
  {
    id: 1,
    name: "Homall Convertible Sectional Sofa Couch, Modern Linen Fabric L-Shaped Couch 3-Seat Sofa.",
    image:
      "https://i5.walmartimages.com/seo/Homall-Convertible-Sectional-Sofa-Couch-Modern-Linen-Fabric-L-Shaped-Couch-3-Seat-Reversible-Chaise-Small-Living-Room-Apartment-Space-Dark-Gray_580e12a9-825b-4586-87df-e275ea527e67.78b035bcf5754d1e6b0f1aa872ff576a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 499.99,
    reviews: "⭐⭐⭐⭐☆ (4.5)",
    inStock: true,
    category: "Soft Toys",
    color: "Gray",
    material: "Fabric",
    gender: "Gender-Neutral",
    ageGroup: "6-8 Years",
  },
  {
    id: 2,
    name: "JUSTLET Sectional Sofa with Ottoman, Small L Shaped Free Combination Furniture Sets.",
    image:
      "https://i5.walmartimages.com/seo/JUSTLET-Sectional-Sofa-with-Ottoman-Small-L-Shaped-Free-Combination-Corduroy-Couch-Furniture-Sets-for-Living-Room-Beige_3520e8a8-dc82-4ff2-bf5c-1b5eb0acd6a2.d68b1659f9ea323f4f24a11835b14be1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 399.99,
    reviews: "⭐⭐⭐⭐☆ (4.0)",
    inStock: true,
    category: "Electronics",
    color: "Beige",
    material: "Corduroy",
    gender: "Boys",
    ageGroup: "3-5 Years",
  },
  {
    id: 3,
    name: "Zinus 76 Harmony Indoor Fabric Sofa, Dark Gray.",
    image:
      "https://i5.walmartimages.com/seo/Zinus-Harmony-Indoor-Fabric-Sofa-Dark-Gray_6e34aeaa-bb0e-41cc-84aa-d9c11458daca.8d83b4f1c97d5d919f3f5bb36b88fdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 299.99,
    reviews: "⭐⭐⭐⭐☆ (4.8)",
    inStock: true,
    category: "Stationery",
    color: "Dark Gray",
    material: "Fabric",
    gender: "Girls",
    ageGroup: "9-12 Years",
  },
  {
    id: 4,
    name: "DHP Cooper Reversible Sectional Sofa.",
    image:
      "https://i5.walmartimages.com/seo/DHP-Cooper-Reversible-Sectional-Sofa-Green-Velvet_1c79856c-bed4-47a0-81e3-d2b70f9d9ccb.83afe1787bef53e1abf7053037c667b2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 199.99,
    reviews: "⭐⭐⭐⭐☆ (4.2)",
    inStock: true,
    category: "Educational Games",
    color: "Green",
    material: "Velvet",
    gender: "Gender-Neutral",
    ageGroup: "0-2 Years",
  },
  {
    id: 5,
    name: "COMHOMA Convertible Futon Sofa Bed Upholstered Futon Couch Fabric Sleeper Sofa, Gray.",
    image:
      "https://i5.walmartimages.com/seo/COMHOMA-Convertible-Futon-Sofa-Bed-Upholstered-Futon-Couch-Fabric-Sleeper-Sofa-Gray_492b9567-40b6-4f98-8dfe-222ad8667e49.260426d1d61d2db517a2eb335f716bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 599.99,
    reviews: "⭐⭐⭐⭐☆ (4.6)",
    inStock: true,
    category: "Soft Toys",
    color: "Gray",
    material: "Fabric",
    gender: "Boys",
    ageGroup: "13+ Years",
  },
  {
    id: 6,
    name: "Mayview Ruthie 73 Upholstered Sofa, Charcoal Fabric.",
    image:
      "https://i5.walmartimages.com/seo/Mayview-Ruthie-Upholstered-Sofa-Charcoal-Fabric_65940440-5d10-477e-9a67-dc30de76c464.63cb7fe1f738c3e18a98c01a21a97d0e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 499.99,
    reviews: "⭐⭐⭐⭐☆ (4.7)",
    inStock: true,
    category: "Electronics",
    color: "Charcoal",
    material: "Fabric",
    gender: "Girls",
    ageGroup: "6-8 Years",
  },
  {
    id: 7,
    name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
    image:
      "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 399.99,
    reviews: "⭐⭐⭐⭐☆ (4.4)",
    inStock: false,
    category: "Stationery",
    color: "Green",
    material: "Corduroy",
    gender: "Gender-Neutral",
    ageGroup: "3-5 Years",
  },
  {
    id: 8,
    name: "UBesGoo Convertible Sectional Sofa with Chaise L Shaped Couch with Ottoman Reversible 3-Seat Sofa Sectional Couch Sets for Apartment Black.",
    image:
      "https://i5.walmartimages.com/seo/UBesGoo-Convertible-Sectional-Sofa-with-Chaise-L-Shaped-Couch-with-Ottoman-Reversible-3-Seat-Sofa-Sectional-Couch-Sets-for-Apartment-Black_893166e7-68b1-4eda-ad5e-783b832e95ec.4c0f3c803907ed122a32afab928e6f17.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 299.99,
    reviews: "⭐⭐⭐⭐☆ (4.3)",
    inStock: true,
    category: "Educational Games",
    color: "Black",
    material: "Fabric",
    gender: "Boys",
    ageGroup: "9-12 Years",
  },
  {
    id: 9,
    name: "Belffin Velvet Stylish Modern Sectional L Shaped Sofa Couch with Storage Ottoman 4-seat Black.",
    image:
      "https://i5.walmartimages.com/seo/Belffin-Velvet-Stylish-Modern-Sectional-L-Shaped-Sofa-Couch-with-Storage-Ottoman-4-seat-Black_c094524a-03e7-4f39-a2b5-bc4dc096e95a.056257517235d9c598fd2555d9469953.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 199.99,
    reviews: "⭐⭐⭐⭐☆ (4.5)",
    inStock: true,
    category: "Soft Toys",
    color: "Black",
    material: "Velvet",
    gender: "Girls",
    ageGroup: "0-2 Years",
  },
  {
    id: 10,
    name: "Ktaxon Sectional Sofa Set, 110 U-Shaped Chenille Couch, 4 Seat Lounge Sleeper with Double Chaise for Living Room Beige.",
    image:
      "https://i5.walmartimages.com/seo/Ktaxon-Sectional-Sofa-Set-110-U-Shaped-Chenille-Couch-4-Seat-Lounge-Sleeper-with-Double-Chaise-for-Living-Room-Beige_1da7d01e-ec18-4684-8956-6190786814dd.649a01a05da4fa9cae0367a2af157391.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 599.99,
    reviews: "⭐⭐⭐⭐☆ (4.6)",
    inStock: true,
    category: "Electronics",
    color: "Beige",
    material: "Chenille",
    gender: "Gender-Neutral",
    ageGroup: "13+ Years",
  },
];

function ProductList() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [0, 700],
    sortOrder: "featured",
    categories: [],
    colors: [],
    materials: [],
    gender: [],
    ageGroup: [],
  });

  const filterOptions = {
    categories: ["Soft Toys", "Electronics", "Stationery", "Educational Games"],
    colors: ["Gray", "Beige", "Black", "Green", "Charcoal", "Dark Gray"],
    materials: ["Fabric", "Velvet", "Corduroy", "Chenille"],
    gender: ["Boys", "Girls", "Gender-Neutral"],
    ageGroups: [
      "0-2 Years",
      "3-5 Years",
      "6-8 Years",
      "9-12 Years",
      "13+ Years",
    ],
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
    <div className="min-h-screen ">
      
      {notification && (
        <div className="fixed bottom-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50">
          {notification}
        </div>
      )}

   
      <FilterBar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        handleFilterChange={handleFilterChange}
        clearFilters={clearFilters}
        filteredProductsCount={filteredProducts.length}
        totalProductsCount={products.length}
        activeFilterCount={activeFilterCount}
      />

     
      <FilterSidebar
        showFilters={showFilters}
        setShowFilters={setShowFilters}
        filters={filters}
        setFilters={setFilters}
        handleFilterChange={handleFilterChange}
        filterOptions={filterOptions}
      />

      
      <div className="max-w-7xl mx-auto px-4 py-6">
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
                onClick={() => navigate("/product")}
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
 */

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";
import FilterBar from "../Components/FilterBar";
/* import FilterSidebar from "../Components/FilterSidebar"; */
import Navbar from "../Components/Navbar";

const products = [
  {
    id: 1,
    name: "Homall Convertible Sectional Sofa Couch, Modern Linen Fabric L-Shaped Couch 3-Seat Sofa.",
    image:
      "https://i5.walmartimages.com/seo/Homall-Convertible-Sectional-Sofa-Couch-Modern-Linen-Fabric-L-Shaped-Couch-3-Seat-Reversible-Chaise-Small-Living-Room-Apartment-Space-Dark-Gray_580e12a9-825b-4586-87df-e275ea527e67.78b035bcf5754d1e6b0f1aa872ff576a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 499.99,
    reviews: "⭐⭐⭐⭐☆ (4.5)",
    inStock: true,
    category: "Soft Toys",
    color: "Gray",
    material: "Fabric",
    gender: "Gender-Neutral",
    ageGroup: "6-8 Years",
  },
  {
    id: 2,
    name: "JUSTLET Sectional Sofa with Ottoman, Small L Shaped Free Combination Furniture Sets.",
    image:
      "https://i5.walmartimages.com/seo/JUSTLET-Sectional-Sofa-with-Ottoman-Small-L-Shaped-Free-Combination-Corduroy-Couch-Furniture-Sets-for-Living-Room-Beige_3520e8a8-dc82-4ff2-bf5c-1b5eb0acd6a2.d68b1659f9ea323f4f24a11835b14be1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 399.99,
    reviews: "⭐⭐⭐⭐☆ (4.0)",
    inStock: true,
    category: "Electronics",
    color: "Beige",
    material: "Corduroy",
    gender: "Boys",
    ageGroup: "3-5 Years",
  },
  {
    id: 3,
    name: "Zinus 76 Harmony Indoor Fabric Sofa, Dark Gray.",
    image:
      "https://i5.walmartimages.com/seo/Zinus-Harmony-Indoor-Fabric-Sofa-Dark-Gray_6e34aeaa-bb0e-41cc-84aa-d9c11458daca.8d83b4f1c97d5d919f3f5bb36b88fdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 299.99,
    reviews: "⭐⭐⭐⭐☆ (4.8)",
    inStock: true,
    category: "Stationery",
    color: "Dark Gray",
    material: "Fabric",
    gender: "Girls",
    ageGroup: "9-12 Years",
  },
  {
    id: 4,
    name: "DHP Cooper Reversible Sectional Sofa.",
    image:
      "https://i5.walmartimages.com/seo/DHP-Cooper-Reversible-Sectional-Sofa-Green-Velvet_1c79856c-bed4-47a0-81e3-d2b70f9d9ccb.83afe1787bef53e1abf7053037c667b2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 199.99,
    reviews: "⭐⭐⭐⭐☆ (4.2)",
    inStock: true,
    category: "Educational Games",
    color: "Green",
    material: "Velvet",
    gender: "Gender-Neutral",
    ageGroup: "0-2 Years",
  },
  {
    id: 5,
    name: "COMHOMA Convertible Futon Sofa Bed Upholstered Futon Couch Fabric Sleeper Sofa, Gray.",
    image:
      "https://i5.walmartimages.com/seo/COMHOMA-Convertible-Futon-Sofa-Bed-Upholstered-Futon-Couch-Fabric-Sleeper-Sofa-Gray_492b9567-40b6-4f98-8dfe-222ad8667e49.260426d1d61d2db517a2eb335f716bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 599.99,
    reviews: "⭐⭐⭐⭐☆ (4.6)",
    inStock: true,
    category: "Soft Toys",
    color: "Gray",
    material: "Fabric",
    gender: "Boys",
    ageGroup: "13+ Years",
  },
  {
    id: 6,
    name: "Mayview Ruthie 73 Upholstered Sofa, Charcoal Fabric.",
    image:
      "https://i5.walmartimages.com/seo/Mayview-Ruthie-Upholstered-Sofa-Charcoal-Fabric_65940440-5d10-477e-9a67-dc30de76c464.63cb7fe1f738c3e18a98c01a21a97d0e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 499.99,
    reviews: "⭐⭐⭐⭐☆ (4.7)",
    inStock: true,
    category: "Electronics",
    color: "Charcoal",
    material: "Fabric",
    gender: "Girls",
    ageGroup: "6-8 Years",
  },
  {
    id: 7,
    name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
    image:
      "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 399.99,
    reviews: "⭐⭐⭐⭐☆ (4.4)",
    inStock: false,
    category: "Stationery",
    color: "Green",
    material: "Corduroy",
    gender: "Gender-Neutral",
    ageGroup: "3-5 Years",
  },
  {
    id: 8,
    name: "UBesGoo Convertible Sectional Sofa with Chaise L Shaped Couch with Ottoman Reversible 3-Seat Sofa Sectional Couch Sets for Apartment Black.",
    image:
      "https://i5.walmartimages.com/seo/UBesGoo-Convertible-Sectional-Sofa-with-Chaise-L-Shaped-Couch-with-Ottoman-Reversible-3-Seat-Sofa-Sectional-Couch-Sets-for-Apartment-Black_893166e7-68b1-4eda-ad5e-783b832e95ec.4c0f3c803907ed122a32afab928e6f17.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 299.99,
    reviews: "⭐⭐⭐⭐☆ (4.3)",
    inStock: true,
    category: "Educational Games",
    color: "Black",
    material: "Fabric",
    gender: "Boys",
    ageGroup: "9-12 Years",
  },
  {
    id: 9,
    name: "Belffin Velvet Stylish Modern Sectional L Shaped Sofa Couch with Storage Ottoman 4-seat Black.",
    image:
      "https://i5.walmartimages.com/seo/Belffin-Velvet-Stylish-Modern-Sectional-L-Shaped-Sofa-Couch-with-Storage-Ottoman-4-seat-Black_c094524a-03e7-4f39-a2b5-bc4dc096e95a.056257517235d9c598fd2555d9469953.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: 199.99,
    reviews: "⭐⭐⭐⭐☆ (4.5)",
    inStock: true,
    category: "Soft Toys",
    color: "Black",
    material: "Velvet",
    gender: "Girls",
    ageGroup: "0-2 Years",
  },
  {
    id: 10,
    name: "Ktaxon Sectional Sofa Set, 110 U-Shaped Chenille Couch, 4 Seat Lounge Sleeper with Double Chaise for Living Room Beige.",
    image:
      "https://i5.walmartimages.com/seo/Ktaxon-Sectional-Sofa-Set-110-U-Shaped-Chenille-Couch-4-Seat-Lounge-Sleeper-with-Double-Chaise-for-Living-Room-Beige_1da7d01e-ec18-4684-8956-6190786814dd.649a01a05da4fa9cae0367a2af157391.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: 599.99,
    reviews: "⭐⭐⭐⭐☆ (4.6)",
    inStock: true,
    category: "Electronics",
    color: "Beige",
    material: "Chenille",
    gender: "Gender-Neutral",
    ageGroup: "13+ Years",
  },
];

function ProductList({ fixed = true }) {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    priceRange: [0, 700],
    sortOrder: "featured",
    categories: [],
    colors: [],
    materials: [],
    gender: [],
    ageGroup: [],
  });

  const filterOptions = {
    categories: ["Soft Toys", "Electronics", "Stationery", "Educational Games"],
    colors: ["Gray", "Beige", "Black", "Green", "Charcoal", "Dark Gray"],
    materials: ["Fabric", "Velvet", "Corduroy", "Chenille"],
    gender: ["Boys", "Girls", "Gender-Neutral"],
    ageGroups: [
      "0-2 Years",
      "3-5 Years",
      "6-8 Years",
      "9-12 Years",
      "13+ Years",
    ],
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

      {/* Products Grid */}
      <div className="max-w-7xl mx-auto px-4 py-6 pt-24 mt-20">
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
                onClick={() => navigate("/product")}
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
