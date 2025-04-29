import React from "react";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const ShopFiltring = ({
  filters,
  filtersState,
  setFiltersState,
  clearFilters,
}) => {
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
      <motion.h3
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="text-xl font-semibold mb-5 bg-white p-2 rounded-md dark:bg-zinc-900"
      >
        Filters
      </motion.h3>

      {/* Category */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="flex flex-col space-y-2 bg-white p-2 rounded-md dark:bg-zinc-900"
      >
        <h4 className="text-lg font-medium">Category</h4>
        {filters.Categories.map((category) => (
          <label
            key={category.id}
            className="cursor-pointer capitalize relative flex items-center"
          >
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
              {category.categoryName}
            </span>
          </label>
        ))}
      </motion.div>

      {/* Price Range */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.74 }}
        className="flex flex-col space-y-2 bg-white p-2 rounded-md dark:bg-zinc-900"
      >
        <h4 className="text-lg font-medium">Price Range</h4>
        {filters.priceRanges.map((range) => (
          <label
            key={range.label}
            className="cursor-pointer capitalize relative flex items-center"
          >
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
      </motion.div>

      {/* Clear Filters */}
      <motion.button
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="bg-primary py-1 px-4 w-full rounded-md text-white hover:bg-primary-dark"
        onClick={clearFilters}
        type="button"
      >
        Clear All Filters
      </motion.button>
    </div>
  );
};

export default ShopFiltring;
