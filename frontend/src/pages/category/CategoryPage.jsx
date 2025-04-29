import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const PRODUCTS_API = "http://waseet.runasp.net/api/Product/ProductsCards";
const CATEGORIES_API = "http://waseet.runasp.net/api/Category/Categories";

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // fetch all categories
    const fetchCategories = async () => {
      try {
        const res = await fetch(CATEGORIES_API);
        const data = await res.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const matchedCategory = categories.find(
          (cat) => cat.categoryName.toLowerCase() === categoryName.toLowerCase()
        );
        const categoryId = matchedCategory?.id;

        const url = categoryId
          ? `${PRODUCTS_API}?categoryId=${categoryId}`
          : PRODUCTS_API;

        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    if (categories.length > 0) {
      fetchProducts();
    }
    window.scrollTo(0, 0);
  }, [categoryName, categories]);

  return (
    <div className="pt-24">
      {/* category header */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="section__container bg-primary-light rounded-md dark:bg-zinc-800"
      >
        <h2 className="section__header capitalize dark:text-zinc-50">
          {categoryName}
        </h2>
        <p className="section__subheader dark:text-zinc-400">
          Discover the best {categoryName} products available now.
        </p>
      </motion.section>

      {/* product cards */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="section__container"
      >
        <motion.h3
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="w-fit text-xl font-semibold mb-5 bg-white p-2 rounded-md dark:bg-zinc-800"
        >
          Available: <span className="text-primary">{products.length}</span>
        </motion.h3>

        {loading ? (
          <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900">
            <span className="text-orange-500">Loading...</span>
          </h4>
        ) : products.length > 0 ? (
          <ProductCards products={products} />
        ) : (
          <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900 dark:text-zinc-50">
            <span className="text-primary">No</span> products found
          </h4>
        )}
      </motion.div>
    </div>
  );
};

export default CategoryPage;
