import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import Faq from "./Faq";
import Gallery from "../Components/Gallery";

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Multiple sets of images for different slides
  const slideImages = [
    [
      {
        id: 1,
        imgSrc:
          "https://images.unsplash.com/photo-1531525645387-7f14be1bdbbd?w=300&h=600&fit=crop",
        altText: "Action Figures",
        height: "h-[500px]",
      },
      {
        id: 2,
        imgSrc:
          "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=300&h=500&fit=crop",
        altText: "Superhero Toys",
        height: "h-[400px]",
      },
      {
        id: 3,
        imgSrc:
          "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=400&fit=crop",
        altText: "Robot Toys",
        height: "h-[300px]",
      },
      {
        id: 4,
        imgSrc:
          "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=500&fit=crop",
        altText: "Collectible Figures",
        height: "h-[300px]",
      },
      {
        id: 5,
        imgSrc:
          "https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=300&h=600&fit=crop",
        altText: "Character Toys",
        height: "h-[400px]",
      },
      {
        id: 6,
        imgSrc:
          "https://images.unsplash.com/photo-1560015534-cee980ba7e13?w=300&h=700&fit=crop",
        altText: "Toy Collection",
        height: "h-[500px]",
      },
    ],
    // Slide 1 - Building Blocks & Construction
    [
      {
        id: 1,
        imgSrc:
          "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=600&fit=crop",
        altText: "LEGO Bricks",
        height: "h-[500px]",
      },
      {
        id: 2,
        imgSrc:
          "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=500&fit=crop",
        altText: "Building Blocks",
        height: "h-[400px]",
      },
      {
        id: 3,
        imgSrc:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=400&fit=crop",
        altText: "Construction Set",
        height: "h-[300px]",
      },
      {
        id: 4,
        imgSrc:
          "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=300&h=500&fit=crop",
        altText: "Creative Building",
        height: "h-[300px]",
      },
      {
        id: 5,
        imgSrc:
          "https://images.unsplash.com/photo-1572375992501-4b0892d50c69?w=300&h=600&fit=crop",
        altText: "Block Tower",
        height: "h-[400px]",
      },
      {
        id: 6,
        imgSrc:
          "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=300&h=700&fit=crop",
        altText: "STEM Toys",
        height: "h-[500px]",
      },
    ],
    // Slide 2 - Dolls & Stuffed Animals
    [
      {
        id: 1,
        imgSrc:
          "https://images.unsplash.com/photo-1563454392212-c9226e966e3b?w=300&h=600&fit=crop",
        altText: "Teddy Bears",
        height: "h-[500px]",
      },
      {
        id: 2,
        imgSrc:
          "https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=300&h=500&fit=crop",
        altText: "Plush Toys",
        height: "h-[400px]",
      },
      {
        id: 3,
        imgSrc:
          "https://images.unsplash.com/photo-1587912921042-4a6363c0b29c?w=300&h=400&fit=crop",
        altText: "Dolls",
        height: "h-[300px]",
      },
      {
        id: 4,
        imgSrc:
          "https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?w=300&h=500&fit=crop",
        altText: "Stuffed Animals",
        height: "h-[300px]",
      },
      {
        id: 5,
        imgSrc:
          "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?w=300&h=600&fit=crop",
        altText: "Soft Toys",
        height: "h-[400px]",
      },
      {
        id: 6,
        imgSrc:
          "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=300&h=700&fit=crop",
        altText: "Cuddly Toys",
        height: "h-[500px]",
      },
    ],
    // Slide 3 - Educational & Board Games
    [
      {
        id: 1,
        imgSrc:
          "https://images.unsplash.com/photo-1611371805429-8b5c1b2c34ba?w=300&h=600&fit=crop",
        altText: "Board Games",
        height: "h-[500px]",
      },
      {
        id: 2,
        imgSrc:
          "https://images.unsplash.com/photo-1606503153255-59d8b8b82176?w=300&h=500&fit=crop",
        altText: "Puzzle Games",
        height: "h-[400px]",
      },
      {
        id: 3,
        imgSrc:
          "https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=300&h=400&fit=crop",
        altText: "Educational Toys",
        height: "h-[300px]",
      },
      {
        id: 4,
        imgSrc:
          "https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=300&h=500&fit=crop",
        altText: "Learning Games",
        height: "h-[300px]",
      },
      {
        id: 5,
        imgSrc:
          "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=300&h=600&fit=crop",
        altText: "Family Games",
        height: "h-[400px]",
      },
      {
        id: 6,
        imgSrc:
          "https://images.unsplash.com/photo-1559825481-12a05cc00344?w=300&h=700&fit=crop",
        altText: "Strategy Games",
        height: "h-[500px]",
      },
    ],
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

  const scrollToContent = () => {
    window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col overflow-hidden">
      {/* Main Content Container */}
      <div className="flex-1 flex flex-col justify-center items-center py-2">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h2 className="text-5xl md:text-7xl font-bold text-gray-900 leading-tight">
            Discover your next
          </h2>
          <h2
            className="text-5xl md:text-7xl font-bold leading-tight"
            style={{ color: "#E6C89C" }}
          >
            Favourite toy
          </h2>
        </div>

        {/* Navigation Dots */}
        <div className="flex space-x-2 mb-12">
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
        <div className="flex items-end justify-center gap-4 md:gap-6 mb-12 max-w-7xl pb-4">
          {snacks.map((snack, index) => (
            <div
              key={`${currentSlide}-${snack.id}`}
              className={`flex-shrink-0 w-32 md:w-48 lg:w-56 ${snack.height} rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer`}
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


      <h2 className="ml-10 mb-10 mt-5 text-2xl sm:text-xl">Continue your shopping</h2>

      <div className="relative flex items-center justify-between gap-10 px-10 mb-10 sm:gap-5">
        {/* Product Item */}
        {[
          "https://i5.walmartimages.com/seo/Electric-Shaver-Men-Women-4-1-Rechargeable-Razor-Waterproof-Painless-Epilator-Nose-Hair-Removal-Remover-Facial-Body-Bikini-Eyebrow-Beard-Sideburn-Mus_048f2612-82aa-400b-9169-567099c8e89c.f2dec29f5c99bab88dd706023c55419a.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF",
          "https://i5.walmartimages.com/seo/KingSo-22-inch-Wood-Burning-Fire-Pit-Camping-Picnic-Bonfire-Patio-Outside-Backyard-Garden-Small-Steel-Firepit-Bowl-Spark-Screen-Log-Grate-Poker_fa1c9c62-d182-468b-8f17-6624ac721b3e.d317b2c08cf5ba62ca1c48cb4efb76f1.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF",
          "https://i5.walmartimages.com/seo/LEGO-Speed-Champions-2-Fast-Furious-Nissan-Skyline-GT-R-R34-76917-Race-Car-Toy-Model-Building-Kit-Collectible-Racer-Minifigure-2023-Set-Kids_1078c4bd-27ad-49f8-8757-7336d6887d69.587429381fb543fdf9f69cf12c616532.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF",
          "https://i5.walmartimages.com/seo/LEGO-Classic-LEGO-Medium-Creative-Brick-Box-10696_f7af88f3-04c1-4c77-8237-e5cccc466ab4.2422f9b4d28481d4ffbc684d1357be85.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF",
          "https://i5.walmartimages.com/seo/Better-Homes-Gardens-Oaklee-2-Drawer-Nightstand-for-bedroom-Charcoal-Finish_4daaa94e-a1d5-45ec-8893-092a1289c2dd.3e44901795490ec5efab0fc6859d5192.jpeg?odnHeight=640&odnWidth=640&odnBg=FFFFFF",
          "https://i5.walmartimages.com/seo/Fisher-Price-Laugh-Learn-Wake-Up-Learn-Coffee-Mug-Baby-Toddler-Toy-with-Music-Lights_04856f59-6129-4e43-aa3f-ff839bc67fab.93bc2a4f8cee212664e7434f55c1b091.jpeg?odnHeight=117&odnWidth=117&odnBg=FFFFFF",
        ].map((img, index) => (
          <div key={index} className="relative min-w-[200px] bg-white p-4 rounded-2xl shadow-md flex flex-col items-start">
            {/* Heart Button */}
            <button className="absolute top-0 right-5 bg-white border-none h-[30px] w-[30px] rounded-full flex items-center justify-center shadow-sm">
              <i className="fa-solid fa-heart text-[20px] text-gray-300"></i>
            </button>

            {/* Image */}
            <img
              src={img}
              alt="product"
              className="h-[170px] ml-[23px] mb-2"
            />

            <p className="text-[13px] font-light mb-1">Sponsored</p>

            <h2 className="font-normal text-[19px] mb-1">
              <span className="text-green-600">Now $16.99 </span>$52.99
            </h2>

            <p className="font-normal text-[14px] w-[210px] mb-6">
              Electric shaver for Men & Women, 4-in-1 Rechargeable...
            </p>

            <button className="px-6 py-2 rounded-full border border-black hover:bg-gray-100">
              + Add
            </button>

            <i className="fa-solid fa-xmark text-gray-500 text-[30px] absolute bottom-[108px] right-[80px]"></i>
          </div>
        ))}

        {/* Navigation Buttons */}
        <button className="absolute left-7 sm:left-2 h-10 w-10 border border-black rounded-full flex items-center justify-center">
          <i className="fa-solid fa-angle-left"></i>
        </button>
        <button className="absolute right-7 sm:right-2 h-10 w-10 border border-black rounded-full flex items-center justify-center">
          <i className="fa-solid fa-angle-right"></i>
        </button>
      </div>
      <Gallery />
      <Faq />
    </div>
  );
};

export default Home;
