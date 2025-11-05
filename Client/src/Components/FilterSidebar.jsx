/* import React, { useState } from "react";
import { X, ChevronDown, ChevronUp } from "lucide-react";

const FilterSidebar = ({
  showFilters,
  setShowFilters,
  filters,
  setFilters,
  handleFilterChange,
  filterOptions,
}) => {
  const [showPriceOptions, setShowPriceOptions] = useState(false);

  if (!showFilters) return null;

  const priceRanges = [
    "Under ₹500",
    "₹500 - ₹1000",
    "₹1000 - ₹2000",
    "Above ₹2000",
  ];

  const handlePriceSelect = (price) => {
    setFilters((prev) => ({ ...prev, priceRange: price }));
  };

  return (
    <div className="fixed inset-0  bg-opacity-30 z-50 flex">
      <div className="bg-white w-full max-w-sm h-full overflow-y-auto shadow-lg animate-slideIn">
       
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold text-gray-900">Filters</h2>
          <button
            onClick={() => setShowFilters(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

    
        <div className="p-4 space-y-6">
         
          <div>
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-2">
                {priceRanges.map((range) => (
                  <label
                    key={range}
                    className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                  >
                    <input
                      type="checkbox"
                      name="priceRange"
                      value={range}
                      checked={filters.priceRange === range}
                      onChange={() => handlePriceSelect(range)}
                      className="w-4 h-4 text-orange-500 accent-orange-500"
                    />
                    <span className="text-sm text-gray-700">{range}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

  
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {filterOptions.categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(cat)}
                    onChange={() => handleFilterChange("categories", cat)}
                    className="w-4 h-4 text-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{cat}</span>
                </label>
              ))}
            </div>
          </div>

       
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Colors</h3>
            <div className="space-y-2">
              {filterOptions.colors.map((color) => (
                <label
                  key={color}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.colors.includes(color)}
                    onChange={() => handleFilterChange("colors", color)}
                    className="w-4 h-4 text-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{color}</span>
                </label>
              ))}
            </div>
          </div>

        
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Materials</h3>
            <div className="space-y-2">
              {filterOptions.materials.map((material) => (
                <label
                  key={material}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.materials.includes(material)}
                    onChange={() => handleFilterChange("materials", material)}
                    className="w-4 h-4 text-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{material}</span>
                </label>
              ))}
            </div>
          </div>

          
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">
              Gender / Interest
            </h3>
            <div className="space-y-2">
              {filterOptions.gender.map((g) => (
                <label
                  key={g}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.gender.includes(g)}
                    onChange={() => handleFilterChange("gender", g)}
                    className="w-4 h-4 text-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{g}</span>
                </label>
              ))}
            </div>
          </div>

        
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Age Group</h3>
            <div className="space-y-2">
              {filterOptions.ageGroups.map((age) => (
                <label
                  key={age}
                  className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 p-2 rounded transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={filters.ageGroup.includes(age)}
                    onChange={() => handleFilterChange("ageGroup", age)}
                    className="w-4 h-4 text-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{age}</span>
                </label>
              ))}
            </div>
          </div>

          
          <button
            onClick={() => setShowFilters(false)}
            className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition-colors shadow-md hover:shadow-lg"
          >
            Apply Filters
          </button>
        </div>
      </div>

   
      <div className="flex-1" onClick={() => setShowFilters(false)}></div>
    </div>
  );
};

export default FilterSidebar;
 */
