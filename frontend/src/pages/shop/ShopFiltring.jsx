import React from "react";

const ShopFiltring = ({ filters, filtersState, setFiltersState, clearFilters }) => {
  const handlePriceRangeChange = (range) => {
    setFiltersState((prev) => ({
      ...prev,
      min: range.min,
      max: range.max,
    }));
  };

  const handleCategoryChange = (id) => {
    setFiltersState((prev) => ({
      ...prev,
      categoryId: id,
    }));
  };

  return (
    <div className="space-y-5 flex-shrink-0 dark:text-zinc-50">
      <h3 className="text-xl font-semibold mb-5 bg-white p-2 rounded-md dark:bg-zinc-900">
        Filters
      </h3>

      {/* Category */}
      <div className="flex flex-col space-y-2 bg-white p-2 rounded-md dark:bg-zinc-900">
        <h4 className="text-lg font-medium">Category</h4>
        {filters.Categories.map((category) => (
          <label key={category.id} className="cursor-pointer capitalize relative flex items-center">
            <input
              className="mr-1 sr-only peer"
              type="radio"
              name="category"
              value={category.id}
              checked={filtersState.categoryId === category.id}
              onChange={() => handleCategoryChange(category.id)}
            />
            <div className="w-4 h-4 bg-transparent border-2 rounded-full peer-checked:bg-primary peer-hover:shadow-lg peer-hover:shadow-primary/50 peer-checked:shadow-lg peer-checked:shadow-primary/50 transition duration-300 ease-in-out"></div>
            <span className="ml-1 hover:text-primary transition-all duration-200 peer-checked:text-primary">
              {category.name}
            </span>
          </label>
        ))}
      </div>

      {/* Price Range */}
      <div className="flex flex-col space-y-2 bg-white p-2 rounded-md dark:bg-zinc-900">
        <h4 className="text-lg font-medium">Price Range</h4>
        {filters.priceRanges.map((range) => (
          <label key={range.label} className="cursor-pointer capitalize relative flex items-center">
            <input
              className="mr-1 sr-only peer"
              type="radio"
              name="priceRange"
              checked={
                filtersState.min === range.min && filtersState.max === range.max
              }
              onChange={() => handlePriceRangeChange(range)}
            />
            <div className="w-4 h-4 bg-transparent border-2 rounded-full peer-checked:bg-primary peer-hover:shadow-lg peer-hover:shadow-primary/50 peer-checked:shadow-lg peer-checked:shadow-primary/50 transition duration-300 ease-in-out"></div>
            <span className="ml-1 hover:text-primary transition-all duration-200 peer-checked:text-primary">
              {range.label}
            </span>
          </label>
        ))}
      </div>

      {/* Clear Filters */}
      <button
        className="bg-primary py-1 px-4 w-full rounded-md text-white hover:bg-primary-dark"
        onClick={clearFilters}
        type="button"
      >
        Clear All Filters
      </button>
    </div>
  );
};

export default ShopFiltring;
