import React, { useState, useRef, useEffect } from "react";
import { Filter, X, ChevronDown } from "lucide-react";

const FilterBar = ({
  showFilters,
  setShowFilters,
  filters,
  handleFilterChange,
  clearFilters,
  filteredProductsCount,
  totalProductsCount,
  activeFilterCount,
  filterOptions,
}) => {
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRefs = useRef({});

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (openDropdown && dropdownRefs.current[openDropdown]) {
        if (!dropdownRefs.current[openDropdown].contains(event.target)) {
          setOpenDropdown(null);
        }
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openDropdown]);

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

  const toggleDropdown = (dropdownName) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const getActiveCount = (filterType) => {
    return filters[filterType]?.length || 0;
  };

  const priceRanges = [
    { label: "Under $200", min: 0, max: 200 },
    { label: "$200 - $400", min: 200, max: 400 },
    { label: "$400 - $600", min: 400, max: 600 },
    { label: "Over $600", min: 600, max: 700 },
  ];

  const FilterDropdown = ({ name, label, options, filterType }) => (
    <div className="relative" ref={(el) => (dropdownRefs.current[name] = el)}>
      <button
        onClick={() => toggleDropdown(name)}
        className="flex items-center gap-2 px-6 py-3 rounded-full transition-all text-sm font-semibold whitespace-nowrap shadow-md hover:shadow-lg"
        style={{
          background: "linear-gradient(180deg, #FFF5E6  0%,  #F97316 100%)",
          color: "#1a202c",
        }}
      >
        <span>{label}</span>
        {getActiveCount(filterType) > 0 && (
          <span className="bg-white text-orange-600 px-2 py-0.5 rounded-full text-xs font-bold">
            {getActiveCount(filterType)}
          </span>
        )}
        <ChevronDown
          className={`w-4 h-4 transition-transform ${
            openDropdown === name ? "rotate-180" : ""
          }`}
        />
      </button>

      {openDropdown === name && (
        <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px] max-h-[300px] overflow-y-auto">
          <div className="p-2">
            {options.map((option) => (
              <label
                key={option}
                className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
              >
                <input
                  type="checkbox"
                  checked={filters[filterType].includes(option)}
                  onChange={() => handleFilterChange(filterType, option)}
                  className="w-4 h-4 text-orange-500 rounded focus:ring-orange-500 accent-orange-500"
                />
                <span className="text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const PriceDropdown = () => {
    const selectedRange = priceRanges.find(
      (range) =>
        filters.priceRange[0] === range.min &&
        filters.priceRange[1] === range.max
    );

    return (
      <div
        className="relative"
        ref={(el) => (dropdownRefs.current["price"] = el)}
      >
        <button
          onClick={() => toggleDropdown("price")}
          className="flex items-center gap-2 px-6 py-3 rounded-full transition-all text-sm font-semibold whitespace-nowrap shadow-md hover:shadow-lg"
          style={{
            background: "linear-gradient(180deg, #FFF5E6  0%,  #F97316 100%)",
            color: "#1a202c",
          }}
        >
          <span>{selectedRange ? selectedRange.label : "Price"}</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform ${
              openDropdown === "price" ? "rotate-180" : ""
            }`}
          />
        </button>

        {openDropdown === "price" && (
          <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 w-[200px]">
            <div className="p-2">
              {priceRanges.map((range, idx) => (
                <label
                  key={idx}
                  className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                >
                  <input
                    type="radio"
                    name="priceRange"
                    checked={
                      filters.priceRange[0] === range.min &&
                      filters.priceRange[1] === range.max
                    }
                    onChange={() =>
                      handleFilterChange("priceRange", [range.min, range.max])
                    }
                    className="w-4 h-4 text-orange-500 focus:ring-orange-500 accent-orange-500"
                  />
                  <span className="text-sm text-gray-700">{range.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="border-b border-gray-200 sticky top-0 z-40 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 py-4">
        {/* Main Filter Bar */}
        <div className="flex items-center justify-between gap-4">
          {/* Filter Dropdowns - Responsive */}
          <div className="flex items-center gap-3 sm:gap-4 flex-nowrap overflow-x-auto scrollbar-hide w-full py-2">
            <PriceDropdown />
            <FilterDropdown
              name="categories"
              label="Categories"
              options={filterOptions.categories}
              filterType="categories"
            />
            <FilterDropdown
              name="colors"
              label="Colors"
              options={filterOptions.colors}
              filterType="colors"
            />
            <FilterDropdown
              name="materials"
              label="Materials"
              options={filterOptions.materials}
              filterType="materials"
            />
            <FilterDropdown
              name="gender"
              label="Gender"
              options={filterOptions.gender}
              filterType="gender"
            />
            <FilterDropdown
              name="ageGroup"
              label="Age Group"
              options={filterOptions.ageGroups}
              filterType="ageGroup"
            />

            {/* Sort Dropdown */}
            <div
              className="relative"
              ref={(el) => (dropdownRefs.current["sortOrder"] = el)}
            >
              <button
                onClick={() => toggleDropdown("sortOrder")}
                className="flex items-center gap-2 px-4 sm:px-6 py-3 rounded-full transition-all text-sm font-semibold whitespace-nowrap shadow-md hover:shadow-lg"
                style={{
                  background:
                    "linear-gradient(180deg, #FFF5E6 0%, #F97316 100%)",
                  color: "#1a202c",
                }}
              >
                <span>
                  {{
                    featured: "Featured",
                    priceLowHigh: "Price: Low to High",
                    priceHighLow: "Price: High to Low",
                    nameAZ: "Name: A to Z",
                  }[filters.sortOrder] || "Sort"}
                </span>
                <ChevronDown
                  className={`w-4 h-4 transition-transform ${
                    openDropdown === "sortOrder" ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openDropdown === "sortOrder" && (
                <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 min-w-[200px]">
                  <div className="p-2">
                    {[
                      { label: "Featured", value: "featured" },
                      { label: "Price: Low to High", value: "priceLowHigh" },
                      { label: "Price: High to Low", value: "priceHighLow" },
                      { label: "Name: A to Z", value: "nameAZ" },
                    ].map((option) => (
                      <label
                        key={option.value}
                        className="flex items-center gap-2 px-3 py-2 hover:bg-gray-50 rounded cursor-pointer"
                      >
                        <input
                          type="radio"
                          name="sortOrder"
                          checked={filters.sortOrder === option.value}
                          onChange={() =>
                            handleFilterChange("sortOrder", option.value)
                          }
                          className="w-4 h-4 text-orange-500 focus:ring-orange-500 accent-orange-500"
                        />
                        <span className="text-sm text-gray-700">
                          {option.label}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Product Count */}
          <div className="text-sm text-gray-600 whitespace-nowrap hidden md:block">
            <span className="font-semibold text-gray-900">
              {filteredProductsCount}
            </span>{" "}
            / {totalProductsCount}
          </div>
        </div>

        {/* Active Filters */}
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2 mt-3 flex-wrap justify-center">
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
