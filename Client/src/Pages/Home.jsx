import React, { useState, useEffect,useRef  } from "react";
import { ChevronDown } from "lucide-react";
import Faq from "./Faq";
import Gallery from "../Components/Gallery";
// Add these imports at the top of your file:
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
   const [favorites, setFavorites] = useState([]);
   const [notification, setNotification] = useState("");
   const [showFilters, setShowFilters] = useState(false);
  
  // Multiple sets of images for different slides
  const slideImages = [
  // Slide 1
  [
    { id: 1, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0400.jpg", altText: "Action Figures", height: "h-[450px]" },
    { id: 2, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0401.jpg", altText: "Superhero Toys", height: "h-[350px]" },
    { id: 3, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0402.jpg", altText: "Robot Toys", height: "h-[250px]" },
    { id: 4, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0403.jpg", altText: "Collectible Figures", height: "h-[250px]" },
    { id: 5, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0404.jpg", altText: "Character Toys", height: "h-[350px]" },
    { id: 6, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0405.jpg", altText: "Toy Collection", height: "h-[450px]" },
  ],
  // Slide 2
  [
    { id: 1, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0406.jpg", altText: "LEGO Bricks", height: "h-[450px]" },
    { id: 2, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0407.jpg", altText: "Building Blocks", height: "h-[350px]" },
    { id: 3, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0408.jpg", altText: "Construction Set", height: "h-[250px]" },
    { id: 4, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0409.jpg", altText: "Creative Building", height: "h-[250px]" },
    { id: 5, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0410.jpg", altText: "Block Tower", height: "h-[350px]" },
    { id: 6, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0411.jpg", altText: "STEM Toys", height: "h-[450px]" },
  ],
  // Slide 3
  [
    { id: 1, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0412.jpg", altText: "Teddy Bears", height: "h-[450px]" },
    { id: 2, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0413.jpg", altText: "Plush Toys", height: "h-[350px]" },
    { id: 3, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0414.jpg", altText: "Dolls", height: "h-[250px]" },
    { id: 4, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0415.jpg", altText: "Stuffed Animals", height: "h-[250px]" },
    { id: 5, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0416.jpg", altText: "Soft Toys", height: "h-[350px]" },
    { id: 6, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0417.jpg", altText: "Cuddly Toys", height: "h-[450px]" },
  ],
  // Slide 4
  [
    { id: 1, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0418.jpg", altText: "Teddy Bears", height: "h-[450px]" },
    { id: 2, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0419.jpg", altText: "Plush Toys", height: "h-[350px]" },
    { id: 3, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0420.jpg", altText: "Dolls", height: "h-[250px]" },
    { id: 4, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0421.jpg", altText: "Stuffed Animals", height: "h-[250px]" },
    { id: 5, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0422.jpg", altText: "Soft Toys", height: "h-[350px]" },
    { id: 6, imgSrc: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0423.jpg", altText: "Cuddly Toys", height: "h-[450px]" },
  ],
];


  const promoCards = [
    {
      id: 1,
      bgGradient: 'from-orange-400 to-amber-400',
      title: 'Action Figures',
      highlight: 'Superheroes & More',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0424.jpg',
      imageAlt: 'Action Figures',
      badge: null
    },
    {
      id: 2,
      bgGradient: 'from-orange-500 to-yellow-400',
      title: 'Building Blocks',
      highlight: 'LEGO & Construction',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0425.jpg',
      imageAlt: 'Building Blocks',
      badge: null
    },
    {
      id: 3,
      bgGradient: 'from-orange-400 to-amber-400',
      title: 'Dolls & Plush',
      highlight: 'Soft & Cuddly Friends',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0426.jpg',
      imageAlt: 'Dolls and Plush Toys',
      badge: null
    },
    {
      id: 4,
      bgGradient: 'from-orange-500 to-yellow-400',
      title: 'Remote Control',
      highlight: 'Cars, Drones & Robots',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0427.jpg',
      imageAlt: 'Remote Control Toys',
      badge: null
    },
    {
      id: 5,
      bgGradient: 'from-orange-400 to-amber-400',
      title: 'Board Games',
      highlight: 'Family Fun Time',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0428.jpg',
      imageAlt: 'Board Games',
      badge: null
    },
    {
      id: 6,
      bgGradient: 'from-orange-500 to-yellow-400',
      title: 'Educational Toys',
      highlight: 'Learn & Play',
      subtitle: '',
      image: 'https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0429.jpg',
      imageAlt: 'Educational Toys',
      badge: null
    }
  ];

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % 4); // Cycles through 0, 1, 2, 3
    }, 3000); // Changes every 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  const snacks = slideImages[currentSlide];

  const toggleFavorite = (e, product) => {
    e.stopPropagation();
    const isFavorited = favorites.some((fav) => fav.id === product.id);
    if (isFavorited) {
      setFavorites(favorites.filter((fav) => fav.id !== product.id));
    } else {
      setFavorites([...favorites, product]);
    }
  };

  const isFavorited = (productId) =>
    favorites.some((fav) => fav.id === productId);

  const addToCart = (e, product) => {
    e.stopPropagation();
  };

 



  const products = [
    {
      id: 1,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0430.jpg",
      title: "Electric shaver for Men & Women, 4-in-1 Rechargeable...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 2,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0431.jpg",
      title: "KingSo 22 inch Wood Burning Fire Pit for Camping...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 3,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0432.jpg",
      title: "LEGO Speed Champions 2 Fast 2 Furious Nissan Skyline...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 4,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0433.jpg",
      title: "LEGO Classic LEGO Medium Creative Brick Box 10696",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 5,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0434.jpg",
      title: "Better Homes & Gardens Oaklee 2-Drawer Nightstand...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 6,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0435.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 7,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0436.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 8,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0437.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 9,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0438.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99
    },
    {
      id: 10,
      image: "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0439.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99
    }
  ];

  

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };



  const slides = [
    {
      id: 1,
      image: 'https://images.unsplash.com/photo-1543465077-db45d34b88a5?w=1400&h=600&fit=crop',
      alt: 'Winter Kids Fashion'
    },
    {
      id: 2,
      image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1400&h=600&fit=crop',
      alt: 'Fashion Collection'
    },
    {
      id: 3,
      image: 'https://images.unsplash.com/photo-1558769132-cb1aea3c7eb4?w=1400&h=600&fit=crop',
      alt: 'Winter Style'
    }
  ];


  // Auto slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };


  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center py-2">
        {/* Header Section */}
        <div className="text-center mb-6">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Discover your next
          </h2>
          <h2
            className="text-5xl md:text-7xl font-bold leading-tight text-orange-500"
            /* style={{ color: "#E6C89C" }} */
          >
            Favourite toy
          </h2>
        </div>

        {/* Navigation Dots */}
        <div className="flex space-x-2">
          {[0, 1, 2, 3].map((index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "w-3 h-3 bg-blue-600 ring-2 ring-blue-400 ring-offset-2"
                  : "w-2 h-2 bg-gray-300"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Cards Container - Aligned at bottom */}
        <div className="flex items-end justify-center gap-4 md:gap-6 mb-8 max-w-7xl pb-4 ">
          {snacks.map((snack, index) => (
            <div
              key={`${currentSlide}-${snack.id}`}
              className={`flex shrink-0 w-32 md:w-48 lg:w-56 ${snack.height} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
              style={{
                animation: `fadeIn 0.5s ease-out ${index * 0.1}s both`,
              }}
            >
              <img
                src={snack.imgSrc}
                alt={snack.altText}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>

   
{/* banner slider */}
    <div className="w-full max-w-7xl mx-auto p-4">
      <div className="relative rounded-2xl overflow-hidden shadow-2xl md:h-[500px] h-[200px] group">
        {/* Slides */}
        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-full object-cover"
            />
          </div>
        ))}

        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Previous slide"
        >
          <ChevronLeft size={28} />
        </button>

        {/* Next Button */}
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-3 shadow-lg transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-10"
          aria-label="Next slide"
        >
          <ChevronRight size={28} />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? 'bg-white w-8'
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
{/* category card */}
      <div className="w-full p-4">
   
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-7xl mx-auto">
        {promoCards.map((card) => (
          <div
            key={card.id}
            className={`relative bg-gradient-to-br ${card.bgGradient} rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer md:h-72 h-50 p-4`}
          >
            {/* Decorative clouds */}
            <div className="absolute top-4 left-8 w-16 h-8 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-6 left-12 w-12 h-6 bg-white rounded-full opacity-80"></div>
            <div className="absolute top-8 right-16 w-20 h-10 bg-white rounded-full opacity-60"></div>
            <div className="absolute top-10 right-20 w-14 h-7 bg-white rounded-full opacity-60"></div>

            <div className="relative z-10 h-full flex">
              {/* Text Content */}
              <div className="flex-1 p-6 flex flex-col justify-center">
                <p className="text-sm font-medium text-gray-800 mb-1">{card.title}</p>
                <h3 className="text-2xl font-bold text-black mb-1">{card.highlight}</h3>
                {card.subtitle && (
                  <p className="text-xl font-bold text-black">{card.subtitle}</p>
                )}
                
                {/* Badge */}
                {card.badge && (
                  <div className="mt-4 bg-white rounded-md px-3 py-2 inline-flex items-center gap-2 self-start shadow-sm">
                    <div className="flex gap-1">
                      <div className="w-6 h-6 bg-orange-500 rounded flex items-center justify-center text-white text-xs font-bold">B</div>
                      <div className="w-6 h-6 bg-red-600 rounded flex items-center justify-center text-white text-xs font-bold">H</div>
                    </div>
                    <div className="text-xs">
                      <p className="font-bold text-gray-900">{card.badge.text}</p>
                      <p className="text-gray-600">{card.badge.subtext}</p>
                    </div>
                  </div>
                  
                )}
              </div>

              {/* Image Content */}
              <div className="flex-1 flex items-end justify-center pb-0 md:pb-4">
                <div className="bg-white rounded-2xl shadow-lg p-1 md:p-2 max-w-[200px]">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full md:h-48 h-40 object-cover rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
{/* Product List */}
{/* Recently Viewed / Continue Shopping */}
<div className="w-full py-6">
  <h2 className="md:px-10 px-5 mb-6 text-2xl font-semibold text-gray-800">
    Continue your shopping
  </h2>

  <div className="relative px-0 md:px-10">
    {/* Scrollable Container */}
    <div
      ref={scrollContainerRef}
      className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
    >
      {products.map((product) => (
        <div
          key={product.id}
          className="flex-shrink-0 w-36 sm:w-44 md:w-48 lg:w-52 flex flex-col border border-gray-200 rounded-xl bg-white shadow-sm hover:shadow-md transition-all cursor-pointer"
          onClick={() => navigate("/product")}
        >
          {/* Product Image */}
          <div className="relative w-full md:h-50 h-35  bg-gray-50">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-full object-cover p-3"
              loading="lazy"
            />
          </div>

          {/* Product Details */}
          <div className="px-3 py-2">
            <h3 className="text-sm font-medium text-gray-800 truncate mb-1">
              {product.title}
            </h3>

            <div className="flex items-center gap-2">
              <p className="text-base font-semibold text-gray-900">
                ₹{product.currentPrice}
              </p>
              {product.originalPrice && (
                <p className="text-sm text-gray-500 line-through">
                  ₹{product.originalPrice}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</div>



      {/* <Gallery /> */}
      <Faq />
    </div>
  );
};

export default Home;
