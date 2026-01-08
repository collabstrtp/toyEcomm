import React, { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

import axios from "axios";
import {
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
} from "lucide-react";
import { BASE_URL } from "../Utils/urlconfig";

const Product = () => {
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        setProduct(res.data.product);
        setImages(res.data.product.images);
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-5">Loading...</p>;

  const discountedPrice =
    product.price - (product.price * product.discountPercent) / 100;

  const handlePrevClick = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNextClick = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleAddToCart = () => {
    alert(`Added ${quantity} ${product.name}(s) to cart`);
  };

  const toggleFavorite = () => {
    setIsFavorited(!isFavorited);
  };

  const handleZoom = () => {
    setIsZoomed(true);
  };

  const closeZoom = () => {
    setIsZoomed(false);
  };

  return (
    <>
      {/* Zoom Modal */}
      {isZoomed && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
          <div className="relative max-w-4xl max-h-full p-4">
            <button
              onClick={closeZoom}
              className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-lg hover:bg-gray-100"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={images[currentImageIndex]}
              alt="Zoomed Product"
              className="max-w-full max-h-full object-contain"
            />
          </div>
        </div>
      )}

      {/* Container */}
      <div className="flex flex-col md:flex-row gap-5 p-5">
        <div className="md:w-3/5 h-[400px] flex flex-col md:flex-row items-center justify-between min-h-[650px] md:min-h-[653px] overflow-hidden">
          <div className="flex md:flex-col w-full md:w-[13%] gap-4 md:gap-5 mb-4 md:mb-0 order-2 md:order-1">
            {images.map((image, i) => (
              <img
                key={i}
                src={image}
                alt={`thumb-${i}`}
                onClick={() => setCurrentImageIndex(i)}
                className={`cursor-pointer rounded-md border ${
                  currentImageIndex === i
                    ? "border-blue-500 scale-105"
                    : "border-transparent"
                } w-[60px] h-[60px] md:w-full md:h-[60px]`}
              />
            ))}
          </div>

          <div className="relative flex justify-center items-center w-full md:w-[87%] px-0 md:px-20 h-[500px] md:h-full order-1 md:order-2">
            <img
              src={images[currentImageIndex]}
              alt="Main Display"
              className="object-contain h-full rounded-md"
            />

            {/* Buttons */}
            <button
              onClick={toggleFavorite}
              className={`absolute right-2 top-2 h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-transparent hover:text-gray-700 transition-colors ${
                isFavorited ? "text-red-500" : "text-gray-400"
              }`}
            >
              <Heart
                className={`w-5 h-5 ${isFavorited ? "fill-current" : ""}`}
              />
            </button>

            <button
              onClick={handleZoom}
              className="absolute right-2 top-14 h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-400 hover:text-gray-700 transition-colors"
            >
              <ZoomIn className="w-5 h-5" />
            </button>

            <button
              onClick={handlePrevClick}
              className="absolute left-2 h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-400 hover:text-gray-700"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <button
              onClick={handleNextClick}
              className="absolute right-2 h-10 w-10 flex items-center justify-center rounded-full border border-gray-300 bg-transparent text-gray-400 hover:text-gray-700"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="md:w-2/5">
          <p className="text-[11px] font-semibold bg-[#E6F1FC] text-[#0073C3] w-[70px] text-center rounded mb-1">
            Best seller
          </p>

          <NavLink className="text-[#0073C3] font-semibold block mb-2">
            {product.brand}
          </NavLink>

          <h2 className="text-lg font-semibold leading-7 mb-2">
            {product.name}
          </h2>

          <p className="mb-2 text-sm">
            ★★★☆☆ <NavLink className="text-blue-500">(0 reviews)</NavLink>
          </p>

          {/* Price Section */}
          <div className="mb-6">
            {/* Original Price */}
            <p className="text-gray-500 line-through text-sm">
              MRP ₹{product.price}
            </p>

            {/* Discounted Price */}
            <h2 className="text-green-600 font-semibold text-xl">
              Now ₹{discountedPrice}
            </h2>

            {/* Discount Percent */}
            {product.discountPercent > 0 && (
              <p className="text-sm text-green-700 font-medium">
                You save {product.discountPercent}% on this product
              </p>
            )}

            <p className="text-[13px] font-medium text-gray-600 mt-1">
              Price when purchased online
            </p>
          </div>

          <p className="text-[13px] font-medium mb-6">
            Price when purchased online
          </p>

          {/* Quantity */}
          <div className="flex items-center mb-4 gap-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600"
              >
                -
              </button>
              <span className="px-4 py-2 min-w-[50px] text-center">
                {quantity}
              </span>
              <button
                onClick={() =>
                  setQuantity((q) => Math.min(q + 1, product.stock))
                }
                className="px-3 py-2 text-gray-600"
              >
                +
              </button>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center mb-10 gap-4">
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-full bg-[#0073C3] text-white font-medium hover:bg-blue-700"
            >
              Add to cart
            </button>

            <button
              onClick={() =>
                window.open(
                  `https://wa.me/+919755390579?text=I am interested in ${product.name}`,
                  "_blank"
                )
              }
              className="px-4 py-3 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <MessageCircle />
            </button>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>

            {/* General */}
            <div className="mb-6">
              <div className="grid grid-cols-1 md:grid-cols-1 gap-y-3 text-sm">
                <div className="flex">
                  <span className="w-40 text-gray-500">Brand</span>
                  <span className="font-medium">{product.brand}</span>
                </div>

                <div className="flex">
                  <span className="w-40 text-gray-500">Age Group</span>
                  <span className="font-medium">{product.ageGroup} years</span>
                </div>

                <div className="flex">
                  <span className="w-40 text-gray-500">Gender</span>
                  <span className="font-medium capitalize">
                    {product.gender}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-40 text-gray-500">Material</span>
                  <span className="font-medium capitalize">
                    {product.material}
                  </span>
                </div>

                <div className="flex">
                  <span className="w-40 text-gray-500">Color</span>
                  <span className="font-medium capitalize">
                    {product.color}
                  </span>
                </div>
              </div>
            </div>

            {/* Additional Specifications */}
            {product.specifications && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-1 gap-y-3 text-sm">
                  {Object.entries(product.specifications).map(
                    ([key, value]) => (
                      <div key={key} className="flex">
                        <span className="w-40 text-gray-500 capitalize">
                          {key.replace(/_/g, " ")}
                        </span>
                        <span className="font-medium">{value}</span>
                      </div>
                    )
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Ratings & Reviews */}
          <div className="mt-12 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
              <button className="border px-4 py-2 rounded text-sm font-medium hover:bg-gray-50">
                Rate Product
              </button>
            </div>

            {/* Rating Summary */}
            <div className="flex flex-col md:flex-row gap-10 mb-8">
              {/* Left */}
              <div>
                <h3 className="text-4xl font-semibold">
                  {product.averageRating}{" "}
                  <span className="text-yellow-500">★</span>
                </h3>
                <p className="text-sm text-gray-500">
                  {product.totalRatings} Ratings
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col gap-2 w-full md:w-1/2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.ratings.filter(
                    (r) => r.rating === star
                  ).length;
                  const percent =
                    product.totalRatings === 0
                      ? 0
                      : (count / product.totalRatings) * 100;

                  return (
                    <div key={star} className="flex items-center gap-2 text-sm">
                      <span className="w-6">{star}★</span>
                      <div className="flex-1 h-2 bg-gray-200 rounded">
                        <div
                          className={`h-2 rounded ${
                            star >= 4
                              ? "bg-green-500"
                              : star === 3
                              ? "bg-yellow-400"
                              : "bg-red-400"
                          }`}
                          style={{ width: `${percent}%` }}
                        ></div>
                      </div>
                      <span className="w-6 text-gray-500">{count}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Reviews */}
            <div className="space-y-6">
              {product.ratings.length === 0 && (
                <p className="text-sm text-gray-500">
                  No reviews yet. Be the first to review this product.
                </p>
              )}

              {product.ratings.map((review, i) => (
                <div key={i} className="border-b pb-6">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {review.rating} ★
                    </span>
                    <span className="font-semibold text-sm">
                      {review.rating >= 4 ? "Must buy!" : "Good"}
                    </span>
                  </div>

                  <p className="text-sm mb-2">{review.review}</p>

                  {/* Review Images */}
                  {review.images?.length > 0 && (
                    <div className="flex gap-2 mb-2">
                      {review.images.map((img, idx) => (
                        <img
                          key={idx}
                          src={img}
                          alt="review"
                          className="w-16 h-16 object-cover rounded"
                        />
                      ))}
                    </div>
                  )}

                  <p className="text-xs text-gray-500">
                    {review.user?.name || "Verified Buyer"} ·{" "}
                    {new Date(review.createdAt).toDateString()}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Specifications */}
    </>
  );
};

export default Product;
