const Gallery = () => {
  return (
    <div className="relative z-0 h-[720px] md:h-[600px] overflow-hidden">
      {/* Semi-transparent Overlay */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none"></div>

      {/* Masonry Grid Container */}
      <div className="columns-2 md:columns-3 lg:columns-3 xl:columns-4 gap-4 space-y-4 z-5 px-0">
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
      </div>

      {/* Centered Overlay Text */}
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-20">
        <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between z-20 px-4 md:px-10 py-8 md:py-0">
          <div className="text-white max-w-lg text-center lg:text-left lg:mr-auto">
  <h2 className="text-4xl sm:text-5xl font-extrabold mb-4">
    We’re Here for You
  </h2>
  <p className="text-lg text-gray-200 mb-2">
    Have a question about our products, shipping, or returns?  
    Send us a message and we’ll get back to you as soon as possible.
  </p>
</div>


          {/* Contact Form Container */}
  <form className="bg-white/90 backdrop-blur-lg p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto flex flex-col space-y-4 border border-orange-100">
    
    {/* Heading */}
    <h2 className="text-3xl font-extrabold text-gray-800 text-center mb-2">
      Get in Touch
    </h2>
    <p className="text-gray-500 text-center mb-4">
      We’d love to hear from you! Fill out the form below.
    </p>

    {/* Name */}
    <input
      type="text"
      placeholder="Your Name"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      required
    />

    {/* Contact Number */}
    <input
      type="tel"
      placeholder="Your Contact Number"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      required
    />

    {/* Email */}
    <input
      type="email"
      placeholder="Your Email"
      className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      required
    />

    {/* Message */}
    <textarea
      placeholder="Your Message"
      rows="4"
      className="w-full p-3 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all"
      required
    ></textarea>

    {/* Submit Button */}
    <button
      type="submit"
      className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-xl transition-transform transform hover:-translate-y-0.5"
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
