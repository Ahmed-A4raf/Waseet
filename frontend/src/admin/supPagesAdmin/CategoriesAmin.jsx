import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { Plus, Edit, Trash2 } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const CategoriesAmin = () => {
  const [categories, setCategories] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetch("http://waseet.runasp.net/api/Category/Categories")
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Failed to fetch categories:", err));
  }, []);

  const handleDelete = async (id) => {
    const confirm = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirm) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const res = await fetch(
        `http://waseet.runasp.net/api/Category/DeleteCategory/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        alert("Category deleted successfully.");
        setCategories((prev) => prev.filter((c) => c.id !== id));
      } else {
        alert("Failed to delete category.");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      alert("An error occurred while deleting the category.");
    }
  };

  const totalPages = Math.ceil(categories.length / itemsPerPage);
  const paginatedCategories = categories.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Categories Management" />

      <main className="max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <motion.div
          className="bg-white bg-opacity-50 backdrop-blur-md overflow-hidden shadow-lg rounded-xl border border-gray-300 mb-1"
          whileHover={{
            y: -5,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.2)",
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link to="/admin/categories/create">
            <div className="px-4 py-5 sm:p-6">
              <span className="flex items-center text-xl font-medium">
                <Plus size={20} className="mr-2" />
                Create Category
              </span>
            </div>
          </Link>
        </motion.div>

        <motion.div
          className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-100 text-gray-700">
                <tr>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                    ID
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                    Category Name
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                    Image
                  </th>
                  <th className="py-3 px-4 text-left text-xs font-medium uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {paginatedCategories.map((category) => (
                  <motion.tr
                    key={category.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="hover:bg-gray-50"
                  >
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {category.id}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      {category.categoryName}
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <img
                        src={category.imageUrl}
                        alt={category.categoryName}
                        className="h-16 w-24 object-cover rounded"
                      />
                    </td>
                    <td className="py-3 px-4 text-sm text-gray-700">
                      <button className="text-indigo-500 hover:text-indigo-600 mr-2">
                        <Link to={`/admin/categories/edit/${category.id}`}>
                          <Edit size={18} />
                        </Link>
                      </button>
                      <button
                        className="text-red-500 hover:text-red-600"
                        onClick={() => handleDelete(category.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </motion.tr>
                ))}

                {paginatedCategories.length === 0 && (
                  <tr>
                    <td
                      colSpan="4"
                      className="text-center font-semibold text-lg py-6"
                    >
                      <span className="text-primary">No </span>
                      categories found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
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
      </main>
    </div>
  );
};

export default CategoriesAmin;
