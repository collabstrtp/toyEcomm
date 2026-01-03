import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import Faq from "./Faq";
import Gallery from "../Components/Gallery";
// Add these imports at the top of your file:
import { Heart, ShoppingCart, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../Utils/urlconfig";

const Home = () => {
  const scrollContainerRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [bannerSlide, setBannerSlide] = useState(0);
  const navigate = useNavigate();
  const [favorites, setFavorites] = useState([]);
  const [notification, setNotification] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [categories, setCategories] = useState([]);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [slides, setSlides] = useState([]);
  const [loadingSlides, setLoadingSlides] = useState(true);

  // Multiple sets of images for different slides
  const slideImages = [
    // Slide 1
    [
      {
        id: 1,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0400.jpg",
        altText: "Action Figures",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0401.jpg",
        altText: "Superhero Toys",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0402.jpg",
        altText: "Robot Toys",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0403.jpg",
        altText: "Collectible Figures",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0404.jpg",
        altText: "Character Toys",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0405.jpg",
        altText: "Toy Collection",
        height: "h-[450px]",
      },
    ],
    // Slide 2
    [
      {
        id: 1,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0406.jpg",
        altText: "LEGO Bricks",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0407.jpg",
        altText: "Building Blocks",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0408.jpg",
        altText: "Construction Set",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0409.jpg",
        altText: "Creative Building",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0410.jpg",
        altText: "Block Tower",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0411.jpg",
        altText: "STEM Toys",
        height: "h-[450px]",
      },
    ],
    // Slide 3
    [
      {
        id: 1,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0412.jpg",
        altText: "Teddy Bears",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0413.jpg",
        altText: "Plush Toys",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0414.jpg",
        altText: "Dolls",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0415.jpg",
        altText: "Stuffed Animals",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0416.jpg",
        altText: "Soft Toys",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0417.jpg",
        altText: "Cuddly Toys",
        height: "h-[450px]",
      },
    ],
    // Slide 4
    [
      {
        id: 1,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0418.jpg",
        altText: "Teddy Bears",
        height: "h-[450px]",
      },
      {
        id: 2,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0419.jpg",
        altText: "Plush Toys",
        height: "h-[350px]",
      },
      {
        id: 3,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0420.jpg",
        altText: "Dolls",
        height: "h-[250px]",
      },
      {
        id: 4,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0421.jpg",
        altText: "Stuffed Animals",
        height: "h-[250px]",
      },
      {
        id: 5,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0422.jpg",
        altText: "Soft Toys",
        height: "h-[350px]",
      },
      {
        id: 6,
        imgSrc:
          "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0423.jpg",
        altText: "Cuddly Toys",
        height: "h-[450px]",
      },
    ],
  ];

  // Fetch categories from backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/categories/allcategories`
        );
        setCategories(response.data.categories);
        setLoadingCategories(false);
      } catch (error) {
        console.error("Error fetching categories:", error);
        setLoadingCategories(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch home page banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/banners/allbanners`);
        const homeBanners = response.data.filter(
          (banner) => banner.pageName === "HomePage"
        );
        if (homeBanners.length > 0) {
          const allUrls = homeBanners.flatMap((banner) => banner.urls);
          const bannerSlides = allUrls.map((url, index) => ({
            id: index + 1,
            image: url,
            alt: `Banner ${index + 1}`,
          }));
          setSlides(bannerSlides);
        }
        setLoadingSlides(false);
      } catch (error) {
        console.error("Error fetching banners:", error);
        setLoadingSlides(false);
      }
    };

    fetchBanners();
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
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0430.jpg",
      title: "Electric shaver for Men & Women, 4-in-1 Rechargeable...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 2,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0431.jpg",
      title: "KingSo 22 inch Wood Burning Fire Pit for Camping...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 3,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0432.jpg",
      title: "LEGO Speed Champions 2 Fast 2 Furious Nissan Skyline...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 4,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0433.jpg",
      title: "LEGO Classic LEGO Medium Creative Brick Box 10696",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 5,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0434.jpg",
      title: "Better Homes & Gardens Oaklee 2-Drawer Nightstand...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 6,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0435.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 7,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0436.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 8,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0437.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 9,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0438.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
    {
      id: 10,
      image:
        "https://raw.githubusercontent.com/collabstrtp/photos/main/toyEcom/IMG-20251108-WA0439.jpg",
      title: "Fisher-Price Laugh & Learn Wake Up & Learn Coffee Mug...",
      currentPrice: 16.99,
      originalPrice: 52.99,
    },
  ];

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  // Auto slide functionality for top slider
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slideImages.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, []);

  // Auto slide functionality for banner slider
  useEffect(() => {
    if (slides.length > 1) {
      const interval = setInterval(() => {
        setBannerSlide((prev) => (prev + 1) % slides.length);
      }, 3000); // Change slide every 3 seconds

      return () => clearInterval(interval);
    }
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
                index === bannerSlide ? "opacity-100" : "opacity-0"
              }`}
            >
              <img
                src={slide.image}
                alt={slide.alt}
                className="w-full h-full object-cover"
              />
            </div>
          ))}

          {/* Slide Indicators */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setBannerSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === bannerSlide
                    ? "bg-white w-8"
                    : "bg-white/50 hover:bg-white/75"
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
          {loadingCategories ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Loading categories...</p>
            </div>
          ) : (
            categories.map((category, index) => (
              <div
                key={category._id}
                className={`relative bg-gradient-to-br ${
                  index % 2 === 0
                    ? "from-orange-400 to-amber-400"
                    : "from-orange-500 to-yellow-400"
                } rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer md:h-72 h-50 p-4`}
                onClick={() => navigate(`/products?category=${category.name}`)}
              >
                {/* Decorative clouds */}
                <div className="absolute top-4 left-8 w-16 h-8 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-6 left-12 w-12 h-6 bg-white rounded-full opacity-80"></div>
                <div className="absolute top-8 right-16 w-20 h-10 bg-white rounded-full opacity-60"></div>
                <div className="absolute top-10 right-20 w-14 h-7 bg-white rounded-full opacity-60"></div>

                <div className="relative z-10 h-full flex">
                  {/* Text Content */}
                  <div className="flex-1 p-6 flex flex-col justify-center">
                    <p className="text-sm font-medium text-gray-800 mb-1">
                      Explore
                    </p>
                    <h3 className="text-2xl font-bold text-black mb-1">
                      {category.name}
                    </h3>
                  </div>

                  {/* Image Content */}
                  <div className="flex-1 flex items-end justify-center pb-0 md:pb-4">
                    <div className="bg-white rounded-2xl shadow-lg p-1 md:p-2 max-w-[200px]">
                      <img
                        src={category.thumbnail_image}
                        alt={category.name}
                        className="w-full md:h-48 h-40 object-cover rounded-xl"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
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
