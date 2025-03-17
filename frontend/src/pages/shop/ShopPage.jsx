import React, { useEffect, useState } from "react";
import ProductCards from "./ProductCards";
import ShopFiltring from "./ShopFiltring";

const API_URL = "http://waseet.runasp.net/api/Product/ProductsCards";
const PRODUCTS_PER_PAGE = 8;  

const filters = {
  Categories: ["all", "handicrafts", "food", "clothing", "automobiles", "electronics"],
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
  const [filtersState, setFiltersState] = useState({ category: "all", priceRange: "" });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`${API_URL}?pageIndex=${currentPage}&pageSize=${PRODUCTS_PER_PAGE}`);
        const data = await response.json();
        setProducts(data.products || []);
        setTotalProducts(data.count || 0);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, [currentPage]); 

  const totalPages = Math.ceil(totalProducts / PRODUCTS_PER_PAGE);

  return (
    <div className="pt-24">
      <section className="section__container bg-primary-light rounded-md">
        <h2 className="section__header capitalize">Shop Page</h2>
        <p className="section__subheader">Browse our latest products and find the best deals.</p>
      </section>

      <section className="section__container">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="bg-primary-light p-4 rounded-md w-1/2 md:w-1/4">
            <ShopFiltring filters={filters} filtersState={filtersState} setFiltersState={setFiltersState} />
          </div>

          <div className="bg-primary-light p-4 rounded-md w-full">
            <h3 className="text-xl font-semibold mb-5 bg-white p-1 rounded-md">
              Available: <span className="text-primary">{totalProducts}</span>
            </h3>

            {products.length > 0 ? (
              <>
                <ProductCards products={products} />
                <div className="flex justify-center mt-6">
                  <button
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === 1 ? 'bg-gray-300' : 'bg-primary text-white'}`}
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage(currentPage - 1)}
                  >
                    &lt;
                  </button>

                  {Array.from({ length: totalPages }, (_, index) => (
                    <button
                      key={index}
                      className={`px-4 py-2 mx-1 rounded-md ${currentPage === index + 1 ? 'bg-primary text-white' : 'bg-white'}`}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </button>
                  ))}

                  <button
                    className={`px-4 py-2 mx-1 rounded-md ${currentPage === totalPages ? 'bg-gray-300' : 'bg-primary text-white'}`}
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage(currentPage + 1)}
                  >
                    &gt;
                  </button>
                </div>
              </>
            ) : (
              <h4 className="text-xl text-center font-semibold mb-5 bg-white p-1 rounded-md">
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
