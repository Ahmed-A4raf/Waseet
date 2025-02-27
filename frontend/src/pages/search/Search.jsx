import React, { useEffect, useState } from "react";
import productsData from "../../data/products.json";
import ProductCards from "../shop/ProductCards";
const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  const handleSearch = () => {
    const query = searchQuery.toLowerCase();

    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(query) ||
        product.category.toLowerCase().includes(query) ||
        product.description.toLowerCase().includes(query)
    );
    setFilteredProducts(filtered);
  };

   useEffect(() => {
      window.scrollTo(0, 0);
    }, []);

  return (
    <div className="pt-24">
      {/* search header */}
      <section className="section__container bg-primary-light rounded-md">
        <h2 className="section__header capitalize">Search Page</h2>
        <p className="section__subheader">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem natus
          inventore impedit vitae non repudiandae?
        </p>
      </section>

      {/* search */}
      <section className="section__container">
        <div className="w-full mb-12 flex flex-col md:flex-row items-center justify-center gap-4">
          <input
            type="text"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            className="search-bar w-full max-w-4xl p-2 border-2 rounded-md focus:outline-none
                focus:border-primary focus:bg-primary-light"
            placeholder="Search..."
          />
          <button
            onClick={handleSearch}
            className="search-button w-full md:w-auto py-2 px-8 bg-primary text-white rounded-md
                hover:bg-primary-dark transition-all duration-300"
          >
            Search
          </button>
        </div>

        {/* if no results */}
        {
          filteredProducts.length === 0 ? (
            <p className="text-center text-2xl font-semibold">
              <span className="text-primary">No</span> results found.
            </p>
          ) : <ProductCards products={filteredProducts} />
        }
  
      </section>
    </div>
  );
};

export default Search;
