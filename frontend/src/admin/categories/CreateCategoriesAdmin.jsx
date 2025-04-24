import React, { useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CreateCategoriesAdmin = () => {
  const [categoryName, setCategoryName] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("CategoryName", categoryName);
    formData.append("ImageUrl", imageFile);

    try {
      const response = await fetch("http://waseet.runasp.net/api/Category/AddCategory", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        alert("Category created successfully ✅");
        navigate("/admin/categories");
      } else {
        const errorText = await response.text();
        console.error("Server error:", errorText);
        alert("Failed to create category ❌");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An unexpected error occurred ❌");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Create Category" />
      <motion.main
        className="flex items-start space-x-8 max-w-4xl mx-auto py-6 px-4 lg:px-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        {/* Left Side: Form */}
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
          <div>
            <label className="block font-semibold">Category Name</label>
            <input
              type="text"
              value={categoryName}
              onChange={(e) => setCategoryName(e.target.value)}
              className="w-full text-gray-700 rounded-lg pl-3 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Upload Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white text-gray-700 rounded-lg pl-3 pr-4 py-2 focus:outline-none focus:ring-1  focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 hover:bg-primary-dark transition-all duration-300 ease-in-out rounded-md"
          >
            Create Category
          </button>
        </form>

        {/* Right Side: Image Preview */}
        <div className="w-1/2 flex items-center justify-center rounded-md p-4">
          {imagePreview ? (
            <img
              src={imagePreview}
              alt="Preview"
              className="w-80 h-80 object-cover border rounded-md shadow-lg"
            />
          ) : (
            <div className="w-80 h-80 flex items-center justify-center border rounded-md bg-gray-100 text-gray-500">
              Image Preview
            </div>
          )}
        </div>
      </motion.main>
    </div>
  );
};

export default CreateCategoriesAdmin;
