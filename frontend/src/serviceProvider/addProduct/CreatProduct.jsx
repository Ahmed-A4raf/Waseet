import React, { useState } from "react";
import HeaderSp from "../commenSp/HeaderSp";
import { motion } from "framer-motion";

const CreateProduct = () => {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: 0.0,
    image: null,
    category: "",
  });

  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const token = storedUser?.token;
  
  const [imagePreview, setImagePreview] = useState(null);

  const categories = [
    { id: 1, name: "Handicrafts" },
    { id: 2, name: "Food" },
    { id: 3, name: "Clothing" },
    { id: 4, name: "Automobiles" },
    { id: 5, name: "Electronics" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProduct({ ...product, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", product.name);
    formData.append("description", product.description);
    formData.append("price", product.price);
    formData.append("image", product.image);
    formData.append("category", product.category);

    try {
      const response = await fetch("http://waseet.runasp.net/api/Product/AddProduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("Product created successfully!");
      } else {
        alert("Failed to create product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };
  

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Create Product" />
      <motion.main className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
      >
        {/* Left Side: Form */}
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
          <div>
            <label className="block font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={product.name}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 resize-y min-h-16 max-h-32 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Price</label>
            <input
              type="number"
              name="price"
              value={product.price}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 hover:bg-primary-dark transition-all duration-300 ease-in-out rounded-md"
          >
            Create
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

export default CreateProduct;