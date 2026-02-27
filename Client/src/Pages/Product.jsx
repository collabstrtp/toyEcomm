import React, { useState, useEffect } from "react";
import { NavLink, useParams, useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";

import axios from "axios";
import {
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
  Star,
} from "lucide-react";
import redirectToWhatsApp from "../Utils/whatsapp";
import { BASE_URL } from "../Utils/urlconfig";

const Product = () => {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const { user } = useSelector((state) => state.auth);

  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  // Review modal state
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewOrderId, setReviewOrderId] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${BASE_URL}/products/${id}`);
        setProduct(res.data.product);
        setImages(res.data.product.images);
        setQuantity(1); // Reset quantity when product changes
      } catch (error) {
        console.error("Failed to fetch product", error);
      }
    };

    fetchProduct();
  }, [id]);

  // Check for review query parameter from email
  useEffect(() => {
    const checkReviewEligibility = async () => {
      const reviewParam = searchParams.get("review");
      const orderIdParam = searchParams.get("orderId");

      if (reviewParam === "true" && orderIdParam) {
        if (!user) {
          alert("Please login to write a review");
          return;
        }

        try {
          const token = localStorage.getItem("token");
          const response = await axios.get(
            `${BASE_URL}/api/orders/can-review/${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            },
          );

          if (response.data.canReview) {
            setReviewOrderId(response.data.orderId);
            setShowReviewModal(true);
          } else {
            alert(
              "You are not eligible to review this product. The order may not be delivered yet or you have already reviewed.",
            );
          }
        } catch (error) {
          console.error("Error checking review eligibility:", error);
          alert(
            "Unable to verify review eligibility. Please try again or write a review from your order history.",
          );
        }
      }
    };

    checkReviewEligibility();
  }, [id, searchParams, user]);

  const submitReview = async () => {
    try {
      const token = localStorage.getItem("token");

      await axios.post(
        `${BASE_URL}/api/products/${id}/rate`,
        { rating: reviewRating, review: reviewText, orderId: reviewOrderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (reviewOrderId) {
        await axios.put(
          `${BASE_URL}/api/orders/${reviewOrderId}/reviewed`,
          { reviewText },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
      }

      alert("Review submitted successfully!");
      setShowReviewModal(false);
      setReviewRating(5);
      setReviewText("");

      // Refresh product data to show new rating
      const res = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(res.data.product);
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    }
  };

  if (!product) return <p className="p-5">Loading...</p>;

  const discountedPrice =
    product.price - (product.price * product.discountPercent) / 100;

  const handlePrevClick = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNextClick = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleAddToCart = () => {
    const payload = {
      id: product._id,
      name: product.name,
      price: discountedPrice,
      quantity,
      image: images[currentImageIndex],
    };
    redirectToWhatsApp(payload, user);
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

      {/* Review Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Write a Review</h3>

            <div className="flex items-center gap-4 mb-4 p-3 bg-gray-50 rounded-lg">
              {product.images && product.images[0] && (
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-16 h-16 object-cover rounded"
                />
              )}
              <div>
                <h4 className="font-semibold">{product.name}</h4>
                <p className="text-gray-600 text-sm">₹{product.price}</p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Rating</label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    onClick={() => setReviewRating(star)}
                    className={`p-1 ${reviewRating >= star ? "text-yellow-500" : "text-gray-300"}`}
                  >
                    <Star
                      className={`w-8 h-8 ${reviewRating >= star ? "fill-current" : ""}`}
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
                onClick={() => setShowReviewModal(false)}
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
            {Array.from({ length: 5 }, (_, i) => (
              <span
                key={i}
                className={
                  i < Math.round(product.averageRating)
                    ? "text-yellow-500"
                    : "text-gray-300"
                }
              >
                ★
              </span>
            ))}{" "}
            <NavLink className="text-blue-500">
              ({product.totalRatings} reviews)
            </NavLink>
          </p>

          <div className="mb-6">
            <p className="text-gray-500 line-through text-sm">
              MRP ₹{product.price}
            </p>

            <h2 className="text-green-600 font-semibold text-xl">
              Now ₹{discountedPrice}
            </h2>

            {product.discountPercent > 0 && (
              <p className="text-sm text-green-700 font-medium">
                You save {product.discountPercent}% on this product
              </p>
            )}

            <p className="text-[13px] font-medium text-gray-600 mt-1">
              Price when purchased online
            </p>
          </div>

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

          <div className="flex items-center mb-10 gap-4">
            <button
              onClick={handleAddToCart}
              className="px-8 py-3 rounded-full bg-green-600 text-white font-medium hover:bg-green-700 flex flex-row items-center gap-2"
            >
              <MessageCircle />
              Buy via WhatsApp
            </button>
          </div>
          <div className="mt-10 border-t border-gray-200 pt-6">
            <h2 className="text-lg font-semibold mb-4">Specifications</h2>

            <div className="mb-3">
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
                    ),
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="mt-12 border-t border-gray-200 pt-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-semibold">Ratings & Reviews</h2>
            </div>

            <div className="flex flex-col md:flex-row gap-10 mb-8">
              <div>
                <h3 className="text-4xl font-semibold">
                  {product.averageRating}{" "}
                  <span className="text-yellow-500">★</span>
                </h3>
                <p className="text-sm text-gray-500">
                  {product.totalRatings} Ratings
                </p>
              </div>

              <div className="flex flex-col gap-2 w-full md:w-1/2">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = product.ratings.filter(
                    (r) => r.rating === star,
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

            <div className="space-y-4">
              {product.ratings.length === 0 && (
                <p className="text-sm text-gray-500">
                  No reviews yet. Be the first to review this product.
                </p>
              )}

              {product.ratings.map((review, i) => (
                <div key={i} className="pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="bg-green-600 text-white text-xs px-2 py-1 rounded">
                      {review.rating} ★
                    </span>
                    <span className="font-semibold text-sm">
                      {review.rating === 5
                        ? "Excellent"
                        : review.rating === 4
                          ? "Very Good"
                          : review.rating === 3
                            ? "Average"
                            : review.rating === 2
                              ? "Poor"
                              : "Very Poor"}
                    </span>
                  </div>

                  {review.review && (
                    <p className="text-sm mb-2">{review.review}</p>
                  )}

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
    </>
  );
};

export default Product;
