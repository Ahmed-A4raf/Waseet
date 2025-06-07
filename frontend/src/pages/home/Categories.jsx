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
      className="relative py-8 sm:py-12"
    >
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none section__container rounded-3xl my-4">
        <div className="absolute -top-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Navigation Button */}
          <motion.button
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            onClick={handlePrev}
            disabled={page === 0}
            className="relative group disabled:opacity-50 shrink-0"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-lg sm:rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative p-2 sm:p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300">
              <ChevronLeft className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary" />
            </div>
          </motion.button>

          {/* Categories */}
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6">
            {currentCategories.map((category, idx) => (
              <Link
                key={category.id}
                to={`/categories/${category.categoryName}`}
                className="group relative"
              >
                <motion.div
                  variants={fadeIn("up", 0.1 * idx)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.7 }}
                  className="flex flex-col items-center"
                >
                  {/* Image Container */}
                  <div className="relative w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 mb-2 sm:mb-3 group-hover:translate-y-[-2px] transition-transform duration-300">
                    {/* Glow Effect */}
                    <div className="absolute inset-0 bg-primary/30 rounded-xl blur-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    
                    {/* Main Image Container */}
                    <div className="relative bg-white dark:bg-zinc-900 rounded-xl p-0.5 sm:p-1 shadow-sm group-hover:shadow-md transition-shadow duration-300">
                      {/* Border */}
                      <div className="absolute inset-0 bg-primary rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      
                      {/* Image */}
                      <div className="relative bg-white dark:bg-zinc-900 rounded-lg overflow-hidden aspect-square">
                        <img
                          src={category.imageUrl}
                          alt={category.categoryName}
                          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Category Name */}
                  <div className="relative text-center">
                    <span className="block text-sm sm:text-base font-medium text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-primary transition-colors duration-300">
                      {category.categoryName}
                    </span>
                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300"></div>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>

          {/* Navigation Button */}
          <motion.button
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            onClick={handleNext}
            disabled={page >= totalPages - 1}
            className="relative group disabled:opacity-50 shrink-0"
          >
            <div className="absolute inset-0 bg-primary/20 rounded-lg sm:rounded-xl blur-lg group-hover:blur-xl transition-all duration-300"></div>
            <div className="relative p-2 sm:p-3 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-sm rounded-lg sm:rounded-xl group-hover:scale-105 transition-transform duration-300">
              <ChevronRight className="w-5 h-5 sm:w-6 sm:h-6 text-primary dark:text-primary" />
            </div>
          </motion.button>
        </div>

        {/* Pagination Dots */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-1.5 mt-4 sm:mt-6">
            {Array.from({ length: totalPages }).map((_, idx) => (
              <button
                key={idx}
                onClick={() => setPage(idx)}
                className={`relative group ${page === idx ? 'scale-110' : ''}`}
              >
                <div className={`w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full transition-all duration-300 ${
                  page === idx 
                    ? 'bg-primary scale-150'
                    : 'bg-gray-300 dark:bg-zinc-700 group-hover:bg-primary/50'
                }`}></div>
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default Categories;
