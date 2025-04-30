import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [page, setPage] = useState(0);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://waseet.runasp.net/api/Category/Categories");
        const data = await res.json();
        setCategories(data);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const currentCategories = categories.slice(page * itemsPerPage, page * itemsPerPage + itemsPerPage);

  const handleNext = () => {
    if (page < totalPages - 1) setPage(page + 1);
  };

  const handlePrev = () => {
    if (page > 0) setPage(page - 1);
  };

  return (
    <motion.div
    variants={fadeIn("up", 0.2)}
    initial="hidden"
    whileInView={"show"}
    viewport={{ once: true, amount: 0.7 }}
    className="flex items-center justify-center space-x-4 mt-8">
      {/* Left Arrow */}
      <motion.button
       variants={fadeIn("right", 0.2)}
       initial="hidden"
       whileInView={"show"}
       viewport={{ once: true, amount: 0.7 }}
        onClick={handlePrev}
        disabled={page === 0}
        className="p-2 bg-gray-100 dark:bg-zinc-700 text-black dark:text-white rounded-full disabled:opacity-30"
      >
        <ChevronLeft size={24} />
      </motion.button>

      {/* Categories */}
      <div className="flex gap-6">
        {currentCategories.map((category) => (
          <Link
            key={category.id}
            to={`/categories/${category.categoryName}`}
            className="categories__card bg-white dark:bg-zinc-900 p-4 rounded-md hover:scale-105 transition-all duration-300"
          >
            <div className="relative rounded-full mx-auto w-24 h-24">
              <div className="absolute inset-0 border-8 rounded-full border-white dark:border-zinc-800 animate-pulse"></div>
              <img
                src={category.imageUrl}
                alt={category.categoryName}
                className="object-cover rounded-full w-24 h-24"
              />
            </div>
            <h4 className="text-center mt-2 font-semibold">
              {category.categoryName}
            </h4>
          </Link>
        ))}
      </div>

      {/* Right Arrow */}
      <motion.button
       variants={fadeIn("left", 0.2)}
       initial="hidden"
       whileInView={"show"}
       viewport={{ once: true, amount: 0.7 }}
        onClick={handleNext}
        disabled={page >= totalPages - 1}
        className="p-2 bg-gray-100 dark:bg-zinc-700 text-black dark:text-white rounded-full disabled:opacity-30"
      >
        <ChevronRight size={24} />
      </motion.button>
    </motion.div>
  );
};

export default Categories;
