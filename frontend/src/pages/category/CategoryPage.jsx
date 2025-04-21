import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductCards from "../shop/ProductCards";

const API_URL = "http://waseet.runasp.net/api/Product/ProductsCards";

const categoriesMap = {
  all: 0,
  handicrafts: 1,
  food: 2,
  clothing: 3,
  automobiles: 4,
  electronics: 5,
};

const CategoryPage = () => {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const lowerCaseCategory = categoryName.toLowerCase();
        const id = categoriesMap[lowerCaseCategory] ?? 0;

        let url = id !== 0 ? `${API_URL}?categoryId=${id}` : `${API_URL}`;
        const response = await fetch(url);
        const data = await response.json();
        setProducts(data.products || []);
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, [categoryName]);

  return (
    <div className="pt-24">
      {/* category header */}
      <section className="section__container bg-primary-light rounded-md dark:bg-zinc-800">
        <h2 className="section__header capitalize dark:text-zinc-50">
          {categoryName}
        </h2>
        <p className="section__subheader dark:text-zinc-400">
          Discover the best {categoryName} products available now.
        </p>
      </section>

      {/* product cards */}
      <div className="section__container">
        <h3 className="text-xl font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900">
          Available:{" "}
          <span className="text-primary">{products.length}</span>
        </h3>

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
      </div>
    </div>
  );
};

export default CategoryPage;
