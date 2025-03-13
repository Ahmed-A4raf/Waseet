import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSp from "../commenSp/HeaderSp";
import { motion } from "framer-motion";

// Mock product data (Replace with API call later)
const PRODUCT_DATA = [
  {
    id: 1,
    name: "Wireless Earbuds",
    description: "High-quality earbuds with noise cancellation.",
    category: "electronics",
    price: 59.99,
    oldPrice: 79.99,
    image: "/src/assets/handicraft1.jpg",
  },
  {
    id: 2,
    name: "Leather Wallet",
    description: "Stylish and durable leather wallet.",
    category: "accessories",
    price: 39.99,
    oldPrice: 49.99,
    image: "/src/assets/handicraft1.jpg",
  },
];

const EditProduct = () => {
  const { id } = useParams(); // Get product ID from URL
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    image: null,
  });

  const token = storedUser?.token; //! get token from localStorage

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const foundProduct = PRODUCT_DATA.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
      setUpdatedProduct({
        name: foundProduct.name,
        description: foundProduct.description,
        price: foundProduct.price,
        oldPrice: foundProduct.oldPrice || "", // Ensure oldPrice is handled
        category: foundProduct.category,
        image: foundProduct.image,
      });
      setImagePreview(foundProduct.image);
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct({ ...updatedProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProduct({ ...updatedProduct, image: file });
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", updatedProduct.name);
    formData.append("description", updatedProduct.description);
    formData.append("price", updatedProduct.price);
    formData.append("oldPrice", updatedProduct.oldPrice);
    formData.append("category", updatedProduct.category);
    if (updatedProduct.image) {
      formData.append("image", updatedProduct.image);
    }

    try {
      const response = await fetch(`http://waseet.runasp.net/api/Product/AddProduct/${id}`, {
        method: "PUT",
        headers: {
            Authorization: `Bearer ${token}`,
          },
        body: formData,
      });

      if (response.ok) {
        alert("Product updated successfully!");
        navigate("/dashboard");
      } else {
        alert("Failed to update product.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred.");
    }
  };

  if (!product) return <p>Loading...</p>;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Edit Product" />
      <motion.main
        className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8"
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
              value={updatedProduct.name}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 resize-y min-h-16 max-h-32 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">Current Price</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                required
              />
            </div>

            <div className="w-1/2">
              <label className="block font-semibold">Old Price</label>
              <input
                type="number"
                name="oldPrice"
                value={updatedProduct.oldPrice}
                onChange={handleChange}
                className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            >
              <option value="">-- Select Category --</option>
              <option value="handicrafts">Handicrafts</option>
              <option value="food">Food</option>
              <option value="clothing">Clothing</option>
              <option value="automobiles">Automobiles</option>
              <option value="electronics">Electronics</option>
            </select>
          </div>

          <button
            type="submit"
            className="bg-primary text-white px-8 py-2 hover:bg-primary-dark transition-all duration-300 ease-in-out rounded-md"
          >
            Update
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

export default EditProduct;
