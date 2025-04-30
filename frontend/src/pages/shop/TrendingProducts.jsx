import { useState, useEffect } from "react";
import ProductCards from "./ProductCards";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "http://waseet.runasp.net/api/Product/ProductsCards"
        );
        const data = await response.json();
        if (Array.isArray(data.products)) {
          setProducts(data.products);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const loadMoreProducts = () => {
    setVisibleProducts((prevCount) => prevCount + 4);
  };

  return (
    <section className="section__container product__container">
      <motion.div
       variants={fadeIn("up", 0.2)}
       initial="hidden"
       whileInView={"show"}
       viewport={{ once: true, amount: 0.7 }}
      >
        <h2 className="section__header dark:text-zinc-50">Trending Products</h2>
        <p className="section__subheader dark:text-zinc-400">
        Browse our most popular items this week — handpicked by shoppers just like you. Don't miss out!
        </p>
      </motion.div>

      {/* products card*/}
      <div className="my-12">
        <ProductCards products={products.slice(0, visibleProducts)} />
      </div>

      {/* load more button */}
      <div className="product__btn">
        {visibleProducts < products.length && (
          <button className="btn" onClick={loadMoreProducts}>
            Load More
          </button>
        )}
      </div>
    </section>
  );
};

export default TrendingProducts;
