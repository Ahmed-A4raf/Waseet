import { useState, useEffect } from "react";
import ProductCards from "./ProductCards";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const TrendingProducts = () => {
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(8); // نبدأ بـ 8 منتجات

  useEffect(() => {
    const fetchProducts = async () => {
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

        // ✅ فلترة المنتجات اللي عندها rating رقمي وأكبر من 0، ثم ترتيبهم
        const filteredAndSorted = allProducts
          .filter((product) => typeof product.rating === "number" && product.rating > 0)
          .sort((a, b) => b.rating - a.rating);

        setProducts(filteredAndSorted.slice(0, 50)); // ممكن تغير الحد الأعلى حسب احتياجك
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + 4); // عرض 4 إضافيين كل مرة
  };

  return (
    <section className="section__container product__container mb-8 rounded-3xl">
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
      >
        <h2 className="section__header dark:text-zinc-50"><span className="text-primary">Trending</span> Products</h2>
        <p className="section__subheader dark:text-zinc-400">
          Check out our top-rated products – chosen by customers like you!
        </p>
      </motion.div>

      {/* عرض المنتجات */}
      <div className="my-12">
        <ProductCards products={products.slice(0, visibleCount)} />
      </div>

      {visibleCount < products.length && (
        <div className="text-center">
          <button className="btn" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}
    </section>
  );
};

export default TrendingProducts;
