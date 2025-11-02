const Gallery = () => {
  return (
    <div className="relative min-h-screen">
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Masonry Grid Container */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-5 gap-4 p-4 space-y-4">
        {/* Image 2 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop"
            alt="Building Blocks"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 3 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1563396983906-b3795482a59a?w=600&h=500&fit=crop"
            alt="Plush Toys"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 4 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1515488764276-beab7607c1e6?w=600&h=700&fit=crop"
            alt="Colorful Toys"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 6 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1530325553241-4f6e7690cf36?w=600&h=550&fit=crop"
            alt="Stuffed Animals"
            className="w-full rounded-lg"
          />
        </div>

        {/* Image 8 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=600&h=600&fit=crop"
            alt="Arts and Crafts"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 9 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1551818255-e6e10975bc17?w=600&h=500&fit=crop"
            alt="Action Figures"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 10 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=450&fit=crop"
            alt="Gift Sets"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 11 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?w=600&h=550&fit=crop"
            alt="Pretend Play"
            className="w-full rounded-lg"
          />
        </div>
        {/* Image 12 */}
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1632501641765-e568d28b0015?w=600&h=400&fit=crop"
            alt="Board Games"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Centered Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <h1 className="text-white text-6xl md:text-8xl font-bold text-center leading-tight drop-shadow-2xl">
          Sign up to get
        </h1>
        <h1 className="text-white text-6xl md:text-8xl font-bold text-center leading-tight drop-shadow-2xl">
          your ideas
        </h1>
        <button className="mt-8 px-8 py-4 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-full pointer-events-auto transition-colors cursor-pointer shadow-xl">
          Sign Up
        </button>
      </div>

      {/* Scroll to Top Button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-8 right-8 bg-pink-600 hover:bg-pink-700 text-white p-4 rounded-full shadow-lg transition-colors z-50"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>
    </div>
  );
};

export default Gallery;
