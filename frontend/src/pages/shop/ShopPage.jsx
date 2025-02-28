import React, { useEffect, useState } from "react";

import productsData from "../../data/products.json";
import ProductCards from "./ProductCards";
import ShopFiltring from "./ShopFiltring";

const filters = {
  Categories: [
    "all",
    "handicrafts",
    "food",
    "clothing",
    "automobiles",
    "electronics",
  ],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState(productsData);
  const [filtersState, setFiltersState] = useState({
    category: "all",
    priceRange: "",
  });

  // filtering function
  const applyFilters = () => {
    let filteredProducts = productsData;

    // filter by category
    if (filtersState.category && filtersState.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filtersState.category
      );
    }

    // filter by price
    if (filtersState.priceRange) {
      const [minPrice, maxPrice] = filtersState.priceRange
        .split("-")
        .map(Number);
      filteredProducts = filteredProducts.filter((product) => {
        const price = product.price;
        return (
          price >= minPrice &&
          (maxPrice === Infinity ? true : price <= maxPrice)
        );
      });
    }

    setProducts(filteredProducts);
  };

  useEffect(() => {
    applyFilters();
  }, [filtersState]);

  // clearing filters
  const clearFilters = () => {
    setFiltersState({
      category: "all",
      priceRange: "",
    });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-24">
      {/* category header */}
      <section className="section__container bg-primary-light rounded-md">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem natus
          inventore impedit vitae non repudiandae?
        </p>
      </section>

      <section className="section__container">
        <div className="flex flex-col-1 md:flex-row gap-8">
          {/* left side */}
          <div className="bg-primary-light p-4 rounded-md w-1/2 md:w-1/4">
            <ShopFiltring
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </div>

          {/* right side */}
          <div className="bg-primary-light p-4 rounded-md w-full">
            <h3 className="text-xl font-semibold mb-5 bg-white p-1 rounded-md">
              Available Services/Products : {products.length}
            </h3>
            {products.length === 0 ? (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md">
                <span className="text-primary">No</span> products found <br />
                <i className="ri-emotion-sad-line text-primary text-2xl"></i>
              </h4>
            ) : (
              <ProductCards products={products} />
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;
