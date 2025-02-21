import React from "react";

const ShopFiltring = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
  return (
    <div className="space-y-5 flex-shrink-0">
      <h3 className="text-xl font-semibold mb-5 bg-white p-1 rounded-md">
        Filters
      </h3>

      {/* category */}
      <div className="flex flex-col space-y-2 bg-white p-1 rounded-md">
        <h4 className="text-lg font-medium ">Category</h4>

        {filters.Categories.map((category) => (
          <label key={category} className="cursor-pointer capitalize">
            <input
              className="mr-1"
              type="radio"
              id="category"
              name="category"
              value={category}
              checked={filtersState.category === category}
              onChange={(e) =>
                setFiltersState({ ...filtersState, category: e.target.value })
              }
            />
            <span className="ml-1 hover:text-primary transtion-all duration-200">
              {category}
            </span>
          </label>
        ))}
      </div>

      {/* price */}
      <div className="flex flex-col space-y-2 bg-white p-1 rounded-md">
        <h4 className="text-lg font-medium ">Price Range</h4>

        {filters.priceRanges.map((range) => (
          <label key={range.label} className="cursor-pointer capitalize">
            <input
             className="mr-1"
              type="radio"
              id="priceRange"
              name="priceRange"
              value={`${range.min}-${range.max}`}
              checked={filtersState.priceRange === `${range.min}-${range.max}`}
              onChange={(e) =>
                setFiltersState({ ...filtersState, priceRange: e.target.value })
              }
            />
            <span className="ml-1 hover:text-primary transtion-all duration-200">{range.label}</span>
          </label>
        ))}
      </div>

      {/* clear filters */}
      <button className="bg-primary py-1 px-4 w-full rounded-md text-white hover:bg-primary-dark" onClick={clearFilters} type="button">
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltring;
