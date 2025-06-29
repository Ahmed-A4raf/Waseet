import React, { useEffect, useState } from "react";
import ProductCards from "../shop/ProductCards";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";
import Loading from "../../components/common/Loading";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchAllProducts();
  }, []);

  const fetchAllProducts = async () => {
    setLoading(true);
    try {
      let page = 1;
      let allProducts = [];
      let keepFetching = true;

      while (keepFetching) {
        const response = await fetch(
          `http://waseet.runasp.net/api/Product/ProductsCards?pageIndex=${page}&pageSize=50`
        );
        const data = await response.json();

        if (Array.isArray(data.products) && data.products.length > 0) {
          allProducts = [...allProducts, ...data.products];
          page += 1;
        } else {
          keepFetching = false;
        }
      }

      setProducts(allProducts);
      setFilteredProducts(allProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      const lowerQuery = searchQuery.toLowerCase();
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(lowerQuery) ||
          product.description?.toLowerCase().includes(lowerQuery) ||
          product.category?.toLowerCase().includes(lowerQuery) ||
          product.serviceProviderName?.toLowerCase().includes(lowerQuery) ||
          product.price?.toString().includes(lowerQuery)
      );
      setFilteredProducts(filtered);
    }, 300); // Debounce

    return () => clearTimeout(timer);
  }, [searchQuery, products]);

  return (
    <div className="pt-24">
      {/* search header */}
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
            Search Page
          </h2>
          <p className="section__subheader dark:text-zinc-400">
            Find the best products for your needs.
          </p>
        </div>
      </motion.div>

      {/* search input */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: "some" }}
        className="section__container"
      >
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: "some" }}
          className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4"
        >
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-bar w-full max-w-4xl p-2 border-2 rounded-md focus:outline-none
              focus:border-primary focus:bg-primary-light dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-600"
            placeholder="Search for products..."
          />
        </motion.div>

        {loading ? (
          <p className="text-center text-2xl font-semibold text-primary">
            <Loading />
          </p>
        ) : filteredProducts.length === 0 ? (
          <p className="text-center text-2xl font-semibold">
            <span className="text-primary">No</span> results found.
          </p>
        ) : (
          <>
            <motion.h3
              variants={fadeIn("right", 0.2)}
              initial="hidden"
              whileInView={"show"}
              viewport={{ once: true, amount: 0.7 }}
              className="w-fit text-xl font-semibold mb-5 bg-white p-2 rounded-md dark:bg-zinc-800"
            >
              Available: <span className="text-primary">{products.length}</span>
            </motion.h3>
            <ProductCards products={filteredProducts} />
          </>
        )}
      </motion.section>
    </div>
  );
};

export default Search;
