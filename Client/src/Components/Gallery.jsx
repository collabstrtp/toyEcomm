const Gallery = () => {
  return (
    <div className="relative min-h-screen ">
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Masonry Grid Container */}
      <div className="columns-1 md:columns-2 lg:columns-3 xl:columns-5 gap-4 space-y-4 z-5 pb-16">
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
        <div className="relative break-inside-avoid">
          <img
            src="https://images.unsplash.com/photo-1587654780291-39c9404d746b?w=600&h=600&fit=crop"
            alt="Building Blocks"
            className="w-full rounded-lg"
          />
        </div>
      </div>

      {/* Centered Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <div className="absolute inset-0 flex  items-center justify-between z-20 px-10 -mt-25">
          <div className="flex flex-row w-1/2 justify-left px-10 items-center flex-wrap">
            <h1 className="text-white text-3xl md:text-6xl font-bold text-center leading-tight drop-shadow-2xl">
              Contact us to get in touch
            </h1>
          </div>
          {/* Contact Form Container */}
          <form className="bg-white p-4 sm:p-6 rounded-xl shadow-2xl  max-w-md pointer-events-auto">
            <div className="relative flex justify-around gap-1.5 text-center">
              {" "}
              <input
                type="text"
                placeholder="Your Name"
                className=" p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
              <input
                type="number"
                placeholder="Your Contact No"
                className=" p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
                required
              />
            </div>

            <input
              type="email"
              placeholder="Your Email"
              className="w-full p-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            />

            <textarea
              placeholder="Your Message"
              rows="4"
              className="w-full p-2 mb-4 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-600"
              required
            ></textarea>

            <button
              type="submit"
              className="w-full px-8 py-3 bg-red-600 hover:bg-red-700 text-white text-xl font-semibold rounded-full transition-colors shadow-lg"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Gallery;
