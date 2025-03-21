import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../../data/products.json";
import ProductCards from "../shop/ProductCards";
const CategoryPage = () => {
  const { categoryName } = useParams();
  const [filteredProducts, setfilteredProducts] = useState([]);

  useEffect(() => {
    const filtered = products.filter(
      (product) => product.category === categoryName.toLowerCase()
    );

    setfilteredProducts(filtered);
  }, [categoryName]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24">
        {/* category header */}
      <section className="section__container bg-primary-light rounded-md dark:bg-zinc-800">
        <h2 className="section__header capitalize dark:text-zinc-50">{categoryName}</h2>
        <p className="section__subheader dark:text-zinc-400">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem natus
          inventore impedit vitae non repudiandae?
        </p>
      </section>

      {/* product cards */}
      <div className="section__container">
        <ProductCards products={filteredProducts} />
      </div>

    </div>
  );
};

export default CategoryPage;
