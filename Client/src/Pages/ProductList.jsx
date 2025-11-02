import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ShoppingCart } from "lucide-react";

const products = [
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
    id: 2,
    name: "JUSTLET Sectional Sofa with Ottoman, Small L Shaped Free Combination Furniture Sets.",
    image:
      "https://i5.walmartimages.com/seo/JUSTLET-Sectional-Sofa-with-Ottoman-Small-L-Shaped-Free-Combination-Corduroy-Couch-Furniture-Sets-for-Living-Room-Beige_3520e8a8-dc82-4ff2-bf5c-1b5eb0acd6a2.d68b1659f9ea323f4f24a11835b14be1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$399.99",
    reviews: "⭐⭐⭐⭐☆ (4.0)",
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
    id: 4,
    name: "DHP Cooper Reversible Sectional Sofa.",
    image:
      "https://i5.walmartimages.com/seo/DHP-Cooper-Reversible-Sectional-Sofa-Green-Velvet_1c79856c-bed4-47a0-81e3-d2b70f9d9ccb.83afe1787bef53e1abf7053037c667b2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$199.99",
    reviews: "⭐⭐⭐⭐☆ (4.2)",
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
    id: 6,
    name: "Mayview Ruthie 73 Upholstered Sofa, Charcoal Fabric.",
    image:
      "https://i5.walmartimages.com/seo/Mayview-Ruthie-Upholstered-Sofa-Charcoal-Fabric_65940440-5d10-477e-9a67-dc30de76c464.63cb7fe1f738c3e18a98c01a21a97d0e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$499.99",
    reviews: "⭐⭐⭐⭐☆ (4.7)",
    inStock: true,
  },
  {
    id: 7,
    name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
    image:
      "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$399.99",
    reviews: "⭐⭐⭐⭐☆ (4.4)",
    inStock: false, // Out of stock example
  },
  {
    id: 8,
    name: "UBesGoo Convertible Sectional Sofa with Chaise L Shaped Couch with Ottoman Reversible 3-Seat Sofa Sectional Couch Sets for Apartment Black.",
    image:
      "https://i5.walmartimages.com/seo/UBesGoo-Convertible-Sectional-Sofa-with-Chaise-L-Shaped-Couch-with-Ottoman-Reversible-3-Seat-Sofa-Sectional-Couch-Sets-for-Apartment-Black_893166e7-68b1-4eda-ad5e-783b832e95ec.4c0f3c803907ed122a32afab928e6f17.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$299.99",
    reviews: "⭐⭐⭐⭐☆ (4.3)",
    inStock: true,
  },
  {
    id: 9,
    name: "Belffin Velvet Stylish Modern Sectional L Shaped Sofa Couch with Storage Ottoman 4-seat Black.",
    image:
      "https://i5.walmartimages.com/seo/Belffin-Velvet-Stylish-Modern-Sectional-L-Shaped-Sofa-Couch-with-Storage-Ottoman-4-seat-Black_c094524a-03e7-4f39-a2b5-bc4dc096e95a.056257517235d9c598fd2555d9469953.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$199.99",
    reviews: "⭐⭐⭐⭐☆ (4.5)",
    inStock: true,
  },
  {
    id: 10,
    name: "Ktaxon Sectional Sofa Set, 110 U-Shaped Chenille Couch, 4 Seat Lounge Sleeper with Double Chaise for Living Room Beige.",
    image:
      "https://i5.walmartimages.com/seo/Ktaxon-Sectional-Sofa-Set-110-U-Shaped-Chenille-Couch-4-Seat-Lounge-Sleeper-with-Double-Chaise-for-Living-Room-Beige_1da7d01e-ec18-4684-8956-6190786814dd.649a01a05da4fa9cae0367a2af157391.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$599.99",
    reviews: "⭐⭐⭐⭐☆ (4.6)",
    inStock: true,
  },
];

function ProductList() {
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");

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

  const isFavorited = (productId) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const addToCart = (e, product) => {
    e.stopPropagation();
    showNotification(`${product.name.substring(0, 30)}... added to cart! 🛒`);
  };

  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(""), 2500);
  };

  return (
    <div className="m-0 p-0 overflow-x-hidden font-sans text-gray-800">
      {/* Notification */}
      {notification && (
        <div className="fixed top-4 right-4 bg-gray-900 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-slide-in">
          {notification}
        </div>
      )}

      {/* Favorites Counter */}
      {favorites.length > 0 && (
        <div className="fixed top-4 left-4 bg-red-500 text-white px-4 py-2 rounded-full shadow-lg z-50 flex items-center gap-2">
          <Heart className="w-5 h-5 fill-white" />
          <span className="font-semibold">{favorites.length}</span>
        </div>
      )}

      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center border border-gray-300 rounded-xl overflow-hidden max-w-[250px] m-3 bg-white shadow-md transition-transform hover:scale-[1.02] relative cursor-pointer"
            onClick={() => navigate("/product")}
          >
            {/* Like Button */}
            <button
              onClick={(e) => toggleFavorite(e, product)}
              className="absolute top-3 right-3 z-10 bg-white rounded-full w-10 h-10 flex items-center justify-center shadow-lg hover:scale-110 transition-all duration-200 group"
              aria-label="Add to favorites"
            >
              <Heart
                className={`w-6 h-6 transition-all duration-200 ${
                  isFavorited(product.id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-gray-400 group-hover:text-red-400"
                }`}
              />
            </button>

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
              <p className="text-sm text-gray-600">
                Our collection promotes balance and calm.
              </p>
              <div className="mt-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.price}
                </h2>
              </div>

              <button
                onClick={(e) => addToCart(e, product)}
                disabled={!product.inStock}
                className={`mt-3 w-full py-2.5 rounded-lg font-medium transition-colors flex items-center justify-center gap-2 ${
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
            <div className="flex items-center px-3 py-2 border-t border-gray-200 bg-gray-50 w-full">
              <p className="text-sm text-gray-700">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
