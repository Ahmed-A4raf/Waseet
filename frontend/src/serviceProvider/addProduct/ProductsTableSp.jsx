import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [allProducts, setAllProducts] = useState([]); // ✅ كل المنتجات
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const token = storedUser?.token;

  const fetchAllProducts = async () => {
    try {
      const response = await fetch(
        `http://waseet.runasp.net/api/Product/ProductsCards?pageIndex=1&pageSize=10000`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Failed to fetch products");

      const result = await response.json();
      console.log("Fetched all products:", result);

      if (Array.isArray(result.products)) {
        setAllProducts(result.products);
      } else {
        setAllProducts([]);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setAllProducts([]);
    }
  };

  useEffect(() => {
    fetchAllProducts();
  }, [token]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
    setCurrentPage(1); // ✅ نرجع لأول صفحة لما نبحث
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(
        `http://waseet.runasp.net/api/Product/DeleteProduct/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.ok) {
        fetchAllProducts(); // ✅ تحديث بعد الحذف
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const filteredProducts = allProducts.filter((product) => {
    const search = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(search) ||
      product.description?.toLowerCase().includes(search) ||
      product.category?.toLowerCase().includes(search) ||
      product.serviceProviderName?.toLowerCase().includes(search) ||
      product.price?.toString().toLowerCase().includes(search)
    );
  });

  // ✅ Pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8  dark:bg-zinc-900 dark:border-zinc-600 dark:text-zinc-50"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Product List</h2>
        <div className="relative">
          <input
            type="text"
            placeholder="Search products..."
            className="bg-primary-light text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent  dark:bg-zinc-800 dark:text-zinc-50"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Product
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Description
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Category
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Price
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Service Provider
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-300">
            {paginatedProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 flex gap-2 items-center dark:text-zinc-50">
                  <img
                    src={product.imageURL}
                    alt={product.name}
                    className="w-12 h-12 rounded-md object-cover"
                  />
                  {product.name}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-50">
                  {product.description}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-50">
                  {product.category}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-50">
                  ${product.price?.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-50">
                  {product.serviceProviderName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-zinc-50">
                  <button className="text-indigo-400 hover:text-indigo-300 mr-2">
                    <Link to={`/dashboard/addProduct/edit/${product.id}`}>
                      <Edit size={18} />
                    </Link>
                  </button>
                  <button
                    className="text-red-400 hover:text-red-300"
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}

            {paginatedProducts.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center py-6 text-gray-600 font-medium dark:text-zinc-50">
                 <span className="text-primary">No</span> products found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* ✅ Pagination Controls */}
      <div className="flex justify-center mt-6 space-x-2">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 rounded-md text-sm border ${
              currentPage === index + 1
                ? "bg-primary text-white border-primary"
                : "bg-white text-gray-700 border-gray-300"
            } hover:bg-primary hover:text-white transition`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductsTable;
