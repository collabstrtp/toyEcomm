import React from "react";
import { useNavigate } from "react-router-dom";

const products = [
  {
    id: 1,
    name: "Homall Convertible Sectional Sofa Couch, Modern Linen Fabric L-Shaped Couch 3-Seat Sofa.",
    image:
      "https://i5.walmartimages.com/seo/Homall-Convertible-Sectional-Sofa-Couch-Modern-Linen-Fabric-L-Shaped-Couch-3-Seat-Reversible-Chaise-Small-Living-Room-Apartment-Space-Dark-Gray_580e12a9-825b-4586-87df-e275ea527e67.78b035bcf5754d1e6b0f1aa872ff576a.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$499.99",
    reviews: "⭐⭐⭐⭐☆ (4.5)",
  },
  {
    id: 2,
    name: "JUSTLET Sectional Sofa with Ottoman, Small L Shaped Free Combination Furniture Sets.",
    image:
      "https://i5.walmartimages.com/seo/JUSTLET-Sectional-Sofa-with-Ottoman-Small-L-Shaped-Free-Combination-Corduroy-Couch-Furniture-Sets-for-Living-Room-Beige_3520e8a8-dc82-4ff2-bf5c-1b5eb0acd6a2.d68b1659f9ea323f4f24a11835b14be1.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$399.99",
    reviews: "⭐⭐⭐⭐☆ (4.0)",
  },
  {
    id: 3,
    name: "Zinus 76 Harmony Indoor Fabric Sofa, Dark Gray.",
    image:
      "https://i5.walmartimages.com/seo/Zinus-Harmony-Indoor-Fabric-Sofa-Dark-Gray_6e34aeaa-bb0e-41cc-84aa-d9c11458daca.8d83b4f1c97d5d919f3f5bb36b88fdbc.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$299.99",
    reviews: "⭐⭐⭐⭐☆ (4.8)",
  },
  {
    id: 4,
    name: "DHP Cooper Reversible Sectional Sofa.",
    image:
      "https://i5.walmartimages.com/seo/DHP-Cooper-Reversible-Sectional-Sofa-Green-Velvet_1c79856c-bed4-47a0-81e3-d2b70f9d9ccb.83afe1787bef53e1abf7053037c667b2.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$199.99",
    reviews: "⭐⭐⭐⭐☆ (4.2)",
  },
  {
    id: 5,
    name: "COMHOMA Convertible Futon Sofa Bed Upholstered Futon Couch Fabric Sleeper Sofa, Gray.",
    image:
      "https://i5.walmartimages.com/seo/COMHOMA-Convertible-Futon-Sofa-Bed-Upholstered-Futon-Couch-Fabric-Sleeper-Sofa-Gray_492b9567-40b6-4f98-8dfe-222ad8667e49.260426d1d61d2db517a2eb335f716bfb.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$599.99",
    reviews: "⭐⭐⭐⭐☆ (4.6)",
  },
  {
    id: 6,
    name: "Mayview Ruthie 73 Upholstered Sofa, Charcoal Fabric.",
    image:
      "https://i5.walmartimages.com/seo/Mayview-Ruthie-Upholstered-Sofa-Charcoal-Fabric_65940440-5d10-477e-9a67-dc30de76c464.63cb7fe1f738c3e18a98c01a21a97d0e.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$499.99",
    reviews: "⭐⭐⭐⭐☆ (4.7)",
  },
  {
    id: 7,
    name: "87 Corduroy Sofa,3 Seater Sofa with Extra Deep Seats,Neche Comfy Upholstered Couch for Living Room,2 Pillows,Green.",
    image:
      "https://i5.walmartimages.com/seo/87-Corduroy-Sofa-3-Seater-Sofa-with-Extra-Deep-Seats-Neche-Comfy-Upholstered-Couch-for-Living-Room-2-Pillows-Green_15a5f04b-e374-4505-91e5-fe403e4db106.0bc81d68599ca9c2df51ff7ec978e0ef.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$399.99",
    reviews: "⭐⭐⭐⭐☆ (4.4)",
  },
  {
    id: 8,
    name: "UBesGoo Convertible Sectional Sofa with Chaise L Shaped Couch with Ottoman Reversible 3-Seat Sofa Sectional Couch Sets for Apartment Black.",
    image:
      "https://i5.walmartimages.com/seo/UBesGoo-Convertible-Sectional-Sofa-with-Chaise-L-Shaped-Couch-with-Ottoman-Reversible-3-Seat-Sofa-Sectional-Couch-Sets-for-Apartment-Black_893166e7-68b1-4eda-ad5e-783b832e95ec.4c0f3c803907ed122a32afab928e6f17.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$299.99",
    reviews: "⭐⭐⭐⭐☆ (4.3)",
  },
  {
    id: 9,
    name: "Belffin Velvet Stylish Modern Sectional L Shaped Sofa Couch with Storage Ottoman 4-seat Black.",
    image:
      "https://i5.walmartimages.com/seo/Belffin-Velvet-Stylish-Modern-Sectional-L-Shaped-Sofa-Couch-with-Storage-Ottoman-4-seat-Black_c094524a-03e7-4f39-a2b5-bc4dc096e95a.056257517235d9c598fd2555d9469953.jpeg?odnHeight=2000&odnWidth=2000&odnBg=FFFFFF",
    price: "$199.99",
    reviews: "⭐⭐⭐⭐☆ (4.5)",
  },
  {
    id: 10,
    name: "Ktaxon Sectional Sofa Set, 110 U-Shaped Chenille Couch, 4 Seat Lounge Sleeper with Double Chaise for Living Room Beige.",
    image:
      "https://i5.walmartimages.com/seo/Ktaxon-Sectional-Sofa-Set-110-U-Shaped-Chenille-Couch-4-Seat-Lounge-Sleeper-with-Double-Chaise-for-Living-Room-Beige_1da7d01e-ec18-4684-8956-6190786814dd.649a01a05da4fa9cae0367a2af157391.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
    price: "$599.99",
    reviews: "⭐⭐⭐⭐☆ (4.6)",
  },
];

function ProductList() {
  const navigate = useNavigate();

  return (
    <div className="m-0 p-0 overflow-x-hidden font-sans text-gray-800">

      <div className="flex flex-wrap justify-center">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex flex-col items-center border border-gray-300 rounded-xl overflow-hidden max-w-[250px] m-3 bg-white shadow-md transition-transform hover:scale-[1.02]"
          >
            {/* Image */}
            <div className="relative w-full">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-auto block"
              />
            </div>

            {/* Main content */}
            <div className="p-4 text-center">
              <p className="text-sm text-gray-600">
                Our collection promotes balance and calm.
              </p>
              <div className="mt-2">
                <h2 className="text-lg font-semibold text-gray-800">
                  {product.price}
                </h2>
              </div>

              <button
                onClick={() => {
                  if (product.id === 1) navigate("/");
                }}
                className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
              >
                Buy Now
              </button>

              <div className="mt-2 text-sm">{product.reviews}</div>
            </div>

            {/* Product name */}
            <div className="flex items-center px-3 py-2 border-t border-gray-200 bg-gray-50">
              <p className="text-sm text-gray-700">{product.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
