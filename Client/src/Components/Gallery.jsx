import { NavLink } from "react-router-dom";

// A reusable styled wrapper for all grid items
const GridCard = ({ className = "", children }) => (
  <div
    className={`relative overflow-hidden rounded-lg p-4 shadow-md ${className}`}
  >
    {children}
  </div>
);

// Individual item for the horizontal carousel
const BannerItem = ({ title, img, ar }) => (
  <div className="flex-shrink-0 w-32 md:w-40 p-3 bg-white border border-gray-100 rounded-lg mr-4 text-center">
    {/* Placeholder for Product Image */}
    <img
      src={img}
      alt={title}
      className="w-full h-20 object-contain mx-auto mb-1"
    />
    <h4 className="font-semibold text-xs mt-1 text-gray-800">{title}</h4>
    {ar && <p className="text-[10px] text-green-600 font-medium">✨ AR View</p>}
  </div>
);

const Gallery = () => {
  return (
    // Grid Container: lg:grid-cols-4, auto-rows-min for flexible height
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 lg:p-8 auto-rows-min">
      {/* 1. Floor Care - Top Left (lg:col-span-1, lg:row-span-3) */}
      <GridCard className="bg-[#E6CFA7] lg:col-span-1 lg:row-span-3 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">Floor care for so much less</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-4 flex justify-end">
          <div className="w-40 h-auto bg-white rounded-full p-2"></div>
        </div>
      </GridCard>

      {/* 2. Furniture Showcase - THE CENTRAL BANNER (lg:col-span-2, lg:row-span-5) */}
      <GridCard className="bg-white lg:col-span-2 lg:row-span-5 flex flex-col border border-gray-200 p-0">
        <div className="flex overflow-x-scroll whitespace-nowrap pt-4 px-4 custom-scrollbar">
          <BannerItem title="Clay Vase" img="placeholder-vase.jpg" />
          <BannerItem title="Two Door Cabinet" img="placeholder-cabinet.jpg" />
          <BannerItem
            title="Wooden Chair"
            img="placeholder-chair.jpg"
            ar={true}
          />
          <BannerItem title="Sofa" img="placeholder-sofa.jpg" />
        </div>
        <div className="flex-grow flex items-end justify-center pt-4 overflow-hidden">
          <div className="w-full h-full bg-blue-100/50 flex items-center justify-center"></div>
        </div>
      </GridCard>

      {/* 3. Personal Care - Top Right (lg:col-span-1, lg:row-span-2) */}
      <GridCard className="bg-[#e7edf6] lg:col-span-1 lg:row-span-2 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">Save on personal care</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-end"></div>
      </GridCard>

      {/* 4. Top Styles - Staggered Left (lg:col-span-1, lg:row-span-4) */}
      <GridCard className="bg-[#d9e4f5] lg:col-span-1 lg:row-span-4 flex flex-col justify-between">
        <div>
          <h2 className="text-xl font-bold mb-1">Top styles, low Prices</h2>
          <h2 className="text-xl font-bold my-1">$45</h2>
          <NavLink to="/deals" className="underline text-black text-sm">
            Shop now
          </NavLink>
        </div>
        <div className="w-full flex justify-end"></div>
      </GridCard>

      {/* 5. Apple Savings - Staggered Right (Under Personal Care) (lg:col-span-1, lg:row-span-3) */}
      <GridCard className="bg-[#feeadf] lg:col-span-1 lg:row-span-3 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">Apple savings up to $150 off</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-end"></div>
      </GridCard>

      {/* 6. Budget Friendly Furniture - Under Central Banner, Left (lg:col-span-1, lg:row-span-3) */}
      <GridCard className="bg-gray-200 lg:col-span-1 lg:row-span-3 flex flex-col justify-between p-0">
        <div className="p-4">
          <h2 className="text-xl font-bold mb-1">Budget friendly furniture</h2>
          <NavLink to="/deals" className="underline text-black text-sm">
            Shop now
          </NavLink>
          <div className="mt-2 w-full h-8 bg-gray-700 rounded-md"></div>
        </div>
        <div className="w-full h-3/4 bg-gray-700"></div>
      </GridCard>

      {/* 7. Up to 40% Off - Under Central Banner, Right (lg:col-span-1, lg:row-span-2) */}
      <GridCard className="bg-[#fde77f] lg:col-span-1 lg:row-span-2 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">Up to 40% off</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-center"></div>
      </GridCard>

      {/* 11. 🌟 NEW ITEM: Seasonal Deals (Added below Item 7) 🌟 */}
      {/* This new item balances the grid height against the tall left column (Item 4) */}
      <GridCard className="bg-orange-200 lg:col-span-1 lg:row-span-2">
        <h2 className="text-xl font-bold mb-1">Seasonal Deals!</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-center"></div>
      </GridCard>

      {/* 8. Sports & Outdoors - Bottom Right (lg:col-span-1, lg:row-span-4) */}
      <GridCard className="bg-blue-300 lg:col-span-1 lg:row-span-4 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">
          Sports & outdoors for way less
        </h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-center"></div>
      </GridCard>

      {/* 9. Let's Play - Bottom Left Corner Stagger (lg:col-span-1, lg:row-span-2) */}
      <GridCard className="bg-purple-200 lg:col-span-1 lg:row-span-2 flex flex-col justify-between">
        <h2 className="text-xl font-bold mb-1">Let's play under $25</h2>
        <NavLink to="/deals" className="underline text-black text-sm">
          Shop now
        </NavLink>
        <div className="w-full mt-2 flex justify-end"></div>
      </GridCard>

      {/* 10. Same-day delivery - BOTTOM BANNER (lg:col-span-4, lg:row-span-1) - Spans full width */}
      <GridCard className="bg-[#ffc21f] lg:col-span-2 lg:row-span-1 flex justify-between items-center">
        <h2 className="text-xl font-bold">
          Enjoy Free Same-day delivery low prices!
        </h2>
        <NavLink
          to="/deals"
          className="underline text-black text-sm font-semibold"
        >
          Join Now
        </NavLink>
      </GridCard>
    </div>
  );
};

export default Gallery;
