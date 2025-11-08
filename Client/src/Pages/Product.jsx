import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Heart,
  ZoomIn,
  ChevronLeft,
  ChevronRight,
  MessageCircle,
  X,
} from "lucide-react";

const Product = () => {
  const images = [
    "https://media.istockphoto.com/id/144293437/photo/wooden-chair.jpg?s=612x612&w=0&k=20&c=edjQRvQj8iiXFSW8POirO3z0MImbeXyzPBm69DRms4w=",
    "https://media.istockphoto.com/id/144293437/photo/wooden-chair.jpg?s=612x612&w=0&k=20&c=edjQRvQj8iiXFSW8POirO3z0MImbeXyzPBm69DRms4w=",
    "https://media.istockphoto.com/id/144293437/photo/wooden-chair.jpg?s=612x612&w=0&k=20&c=edjQRvQj8iiXFSW8POirO3z0MImbeXyzPBm69DRms4w=",
    "https://media.istockphoto.com/id/144293437/photo/wooden-chair.jpg?s=612x612&w=0&k=20&c=edjQRvQj8iiXFSW8POirO3z0MImbeXyzPBm69DRms4w=",
    "https://media.istockphoto.com/id/144293437/photo/wooden-chair.jpg?s=612x612&w=0&k=20&c=edjQRvQj8iiXFSW8POirO3z0MImbeXyzPBm69DRms4w=",
  ];

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const handlePrevClick = () =>
    setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));

  const handleNextClick = () =>
    setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));

  const handleAddToCart = () => {
    alert(`Added ${quantity} item(s) to cart`);
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
        <div className="md:w-3/5 flex flex-col md:flex-row items-center justify-between min-h-[650px] md:min-h-[653px] overflow-hidden">
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
            {currentImageIndex === 2 ? (
              <Canvas shadows camera={{ position: [0, 0, 5], fov: 30 }}>
                <color attach="background" args={["#232323"]} />
              </Canvas>
            ) : (
              <img
                src={images[currentImageIndex]}
                alt="Main Display"
                className="object-contain h-full rounded-md"
              />
            )}

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
            Homall
          </NavLink>

          <h2 className="text-lg font-semibold leading-7 mb-2">
            BestOffice Mesh Chair, Ergonomic Adjustable, Back Support, Rolling
            Swivel, Black for Women & Men.
          </h2>

          <p className="mb-2 text-sm">
            ★★★☆☆ <NavLink className="text-blue-500">(30.1)941 reviews</NavLink>
          </p>

          <h2 className="text-green-600 font-medium mb-2 text-xl">
            Now $189.99
          </h2>

          <h3 className="text-[13px] font-medium mb-2">
            As low as $18/mo <span className="font-light">with</span>{" "}
            <NavLink className="text-blue-500">Affirm</NavLink>{" "}
            <NavLink className="text-blue-500">Learn more</NavLink>
          </h3>

          <p className="text-[13px] font-medium mb-6">
            Price when purchased online{" "}
            <button className="px-2 rounded-full border border-gray-400">
              i
            </button>
          </p>

          {/* Quantity and Add to Cart */}
          <div className="flex items-center mb-4 gap-4">
            <div className="flex items-center border border-gray-300 rounded-full">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                -
              </button>
              <span className="px-4 py-2 text-center min-w-[50px]">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-gray-800"
              >
                +
              </button>
            </div>
          </div>
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
                  "https://wa.me/1234567890?text=Hello, I am interested in this product.",
                  "_blank"
                )
              }
              className="px-4 py-3 rounded-full bg-green-500 text-white hover:bg-green-600"
            >
              <MessageCircle />
            </button>
          </div>

          {/* <div className="bg-gray-100 p-4 rounded-md">
            <p className="font-semibold mb-4 text-[15px]">
              Actual colors: Gray
            </p>
            <div className="flex justify-around flex-wrap gap-3">
              {[
                "#10458C",
                "rgb(215,174,131)",
                "rgb(104,106,119)",
                "rgb(170,167,156)",
                "#fff",
              ].map((color, i) => (
                <div key={i} className="text-center">
                  <button
                    className={`h-[55px] w-[55px] rounded-full border-4 ${
                      i === 2 ? "border-gray-700" : "border-gray-400"
                    } flex items-center justify-center`}
                  >
                    <div
                      style={{ backgroundColor: color }}
                      className="h-[45px] w-[45px] rounded-full"
                    ></div>
                  </button>
                  <p className="text-sm mt-1">$169.99</p>
                </div>
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};

export default Product;
