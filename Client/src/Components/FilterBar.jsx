import React from "react";
import { Filter, X } from "lucide-react";

const FilterBar = ({
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  clearFilters,
  filteredProductsCount,
  totalProductsCount,
  activeFilterCount,
}) => {
  const allActiveFilters = [
    ...filters.categories,
    ...filters.colors,
    ...filters.materials,
    ...filters.gender,
    ...filters.ageGroup,
  ];

  const removeFilter = (filter) => {
    if (filters.categories.includes(filter))
      handleFilterChange("categories", filter);
    if (filters.colors.includes(filter)) handleFilterChange("colors", filter);
    if (filters.materials.includes(filter))
      handleFilterChange("materials", filter);
    if (filters.gender.includes(filter)) handleFilterChange("gender", filter);
    if (filters.ageGroup.includes(filter))
      handleFilterChange("ageGroup", filter);
  };

  return (
    <div className=" border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Main Filter Bar */}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-4 flex-1">
            {/* Filter Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors shadow-sm hover:shadow-md"
            >
              <Filter className="w-5 h-5" />
              Filters
              {activeFilterCount > 0 && (
                <span className="bg-white text-orange-500 px-2 py-0.5 rounded-full text-xs font-bold">
                  {activeFilterCount}
                </span>
              )}
            </button>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium text-gray-700">Sort:</label>
              <select
                value={filters.sortOrder}
                onChange={(e) =>
                  handleFilterChange("sortOrder", e.target.value)
                }
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 outline-none bg-white text-sm"
              >
                <option value="featured">Featured</option>
                <option value="priceLowHigh">Price: Low to High</option>
                <option value="priceHighLow">Price: High to Low</option>
                <option value="nameAZ">Name: A to Z</option>
              </select>
            </div>
          </div>

          {/* Product Count */}
          <div className="text-sm text-gray-600">
            Showing{" "}
            <span className="font-semibold text-gray-900">
              {filteredProductsCount}
            </span>{" "}
            of {totalProductsCount} products
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700">
              Active filters:
            </span>
            {allActiveFilters.map((filter, idx) => (
              <span
                key={idx}
                className="inline-flex items-center gap-1 px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-sm hover:bg-orange-200 transition-colors"
              >
                {filter}
                <button
                  onClick={() => removeFilter(filter)}
                  className="hover:text-orange-900"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={clearFilters}
              className="text-sm text-orange-600 hover:text-orange-700 font-medium underline"
            >
              Clear all
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FilterBar;
