import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltring from "./ShopFiltring";

const API_URL = "http://waseet.runasp.net/api/Product/ProductsCards";
const PRODUCTS_PER_PAGE = 8;

const filters = {
  Categories: [
    { id: 0, name: "All" },
    { id: 1, name: "Handicrafts" },
    { id: 2, name: "Food" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Automobiles" },
    { id: 5, name: "Electronics" },
  ],
  priceRanges: [
    { label: "Under $50", min: 0, max: 50 },
    { label: "$50 - $100", min: 50, max: 100 },
    { label: "$100 - $200", min: 100, max: 200 },
    { label: "$200 and above", min: 200, max: Infinity },
  ],
};

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [filtersState, setFiltersState] = useState({
    categoryId: 0, // Default to "All"
    min: null, // Default to no minimum price
    max: null, // Default to no maximum price
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
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
        if (filtersState.max !== null) {
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
      <section className="section__container bg-primary-light rounded-md dark:bg-zinc-800">
        <h2 className="section__header capitalize dark:text-zinc-50">Shop Page</h2>
        <p className="section__subheader dark:text-zinc-400">
          Browse our latest products and find the best deals.
        </p>
      </section>

      <section className="section__container">
        <div className="flex md:flex-row gap-8">
          <div className="bg-primary-light p-4 rounded-md w-1/2 md:w-1/5 dark:bg-zinc-800">
            <ShopFiltring
              filters={filters}
              filtersState={filtersState}
              setFiltersState={setFiltersState}
              clearFilters={clearFilters}
            />
          </div>

          <div className="bg-primary-light p-4 rounded-md w-full dark:bg-zinc-800">
            <h3 className="text-xl font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900">
              Available: <span className="text-primary">{totalProducts}</span>
            </h3>

            {loading ? (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900">
                <span className="text-orange-500">Loading...</span>
              </h4>
            ) : products.length > 0 ? (
              <>
                <ProductCards products={products} />
                <div className="flex justify-center mt-6">
                  <button
                    className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    <i className="ri-arrow-left-wide-line"></i>
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`p-1 w-10 h-10 mx-1 rounded-full ${
                        currentPage === index + 1
                          ? "bg-primary text-zinc-900"
                          : "bg-white dark:bg-zinc-700"
                      }`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    <i className="ri-arrow-right-wide-line"></i>
                  </button>
                </div>
              </>
            ) : (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md dark:bg-zinc-900 dark:text-zinc-50">
                <span className="text-primary">No</span> products found <br />
                <i className="ri-emotion-sad-line text-primary text-2xl"></i>
              </h4>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ShopPage;