import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const EditCategoriesAdmin = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [category, setCategory] = useState({
    categoryName: "",
    image: null,
    imageUrl: ""
  });

  const [preview, setPreview] = useState(null);

  useEffect(() => {
    fetch("http://waseet.runasp.net/api/Category/Categories")
      .then((res) => res.json())
      .then((data) => {
        const target = data.find((cat) => cat.id === parseInt(id));
        if (target) {
          setCategory({
            categoryName: target.categoryName,
            image: null,
            imageUrl: target.imageUrl
          });
          setPreview(target.imageUrl);
        }
      })
      .catch((err) => console.error("Failed to fetch category:", err));
  }, [id]);

  const handleChange = (e) => {
    setCategory({ ...category, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCategory({ ...category, image: file });
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("Id", id); 
    formData.append("CategoryName", category.categoryName);
    if (category.image) {
      formData.append("ImageUrl", category.image); 
    }

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const res = await fetch(
        `http://waseet.runasp.net/api/Category/UpdateCategory`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formData,
        }
      );

      if (res.ok) {
        alert("Category updated successfully.");
        navigate("/admin/categories");
      } else {
        const errorData = await res.json();
        alert(`Failed to update category: ${errorData.message || "Unknown error"}`);
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating.");
    }
  };
  
  

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Edit Category" />

      <motion.main
        className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4 dark:text-zinc-50">
          <div>
            <label className="block font-semibold">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={category.categoryName}
              onChange={handleChange}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 hover:bg-primary-dark transition-all duration-300 ease-in-out rounded-md"
          >
            Update
          </button>
        </form>

        {/* Image Preview */}
        <div className="w-1/2 flex items-center justify-center rounded-md p-4">
          {preview ? (
            <img
              src={preview}
              alt="Preview"
              className="w-80 h-80 object-cover border rounded-md shadow-lg"
            />
          ) : (
            <div className="w-80 h-80 flex items-center justify-center border rounded-md bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-50">
              Image Preview
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default EditCategoriesAdmin;
