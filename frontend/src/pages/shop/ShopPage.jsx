import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltring from "./ShopFiltring";
import Loading from "../../components/common/Loading";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const API_URL = "http://waseet.runasp.net/api/Product/ProductsCards";
const CATEGORY_API = "http://waseet.runasp.net/api/Category/Categories";
const PRODUCTS_PER_PAGE = 8;

const priceRanges = [
  { label: "Under $50", min: 0, max: 50 },
  { label: "$50 - $100", min: 50, max: 100 },
  { label: "$100 - $200", min: 100, max: 200 },
  { label: "$200 and above", min: 200, max: Infinity },
];

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([
    { id: 0, categoryName: "All" },
  ]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersState, setFiltersState] = useState({
    categoryId: 0,
    min: null,
    max: null,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [filtersState]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORY_API);
        const data = await res.json();
        const allCategory = { id: 0, categoryName: "All" };
        setCategories([allCategory, ...data]);
      } catch (err) {
        console.error("Failed to fetch categories:", err);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        let url = `${API_URL}?pageIndex=${currentPage}&pageSize=${PRODUCTS_PER_PAGE}`;
        if (filtersState.categoryId !== 0) {
          url += `&categoryId=${filtersState.categoryId}`;
        }
        if (filtersState.min !== null) {
          url += `&min=${filtersState.min}`;
        }
        if (filtersState.max !== null && filtersState.max !== Infinity) {
          url += `&max=${filtersState.max}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
        setTotalProducts(data.count || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [currentPage, filtersState]);

  const clearFilters = () => {
    setFiltersState({ categoryId: 0, min: null, max: null });
  };

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="pt-24">
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

        <div className="relative section__container">
          <h2 className="section__header capitalize dark:text-zinc-50">
            Shop Page
          </h2>
          <p className="section__subheader dark:text-zinc-400">
            Browse our latest products and find the best deals.
          </p>
        </div>
      </motion.div>

      <section className="section__container">
        <div className="flex sm:flex-row flex-col gap-8">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: "some"}}
            className="bg-primary-light p-4 rounded-md md:w-1/5 h-fit sticky top-24 dark:bg-zinc-800"
          >
            <ShopFiltring
              filters={{ Categories: categories, priceRanges }}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: "some" }}
            className="bg-primary-light p-4 rounded-md md:w-3/4 dark:bg-zinc-800"
          >
            <motion.h3
              variants={fadeIn("left", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              className="text-xl font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900"
            >
              Available: <span className="text-primary">{totalProducts}</span>
            </motion.h3>

            {loading ? (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-800">
                <Loading size="large" />
              </h4>
            ) : products.length > 0 ? (
              <div>
                <ProductCards products={products} />
                <div className="flex justify-center mt-6 flex-wrap">
                  <motion.button
                    variants={fadeIn("right", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="ri-arrow-left-wide-line"></i>
                  </motion.button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <motion.button
                      variants={fadeIn("up", 0.2)}
                      initial="hidden"
                      whileInView={"show"}
                      viewport={{ once: true, amount: 0.5 }}
                      key={index}
                      className={`p-1 w-10 h-10 mx-1 rounded-full ${
                        currentPage === index + 1
                          ? "bg-primary text-zinc-900"
                          : "bg-white dark:bg-zinc-700"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </motion.button>
                  ))}

                  <motion.button
                    variants={fadeIn("left", 0.2)}
                    initial="hidden"
                    whileInView={"show"}
                    viewport={{ once: true, amount: 0.7 }}
                    className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="ri-arrow-right-wide-line"></i>
                  </motion.button>
                </div>
              </div>
            ) : (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900 dark:text-zinc-50">
                <span className="text-primary">No</span> products found <br />
                <i className="ri-emotion-sad-line text-primary text-2xl"></i>
              </h4>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
