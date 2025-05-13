import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const [categories, setCategories] = useState([]);
  const [popupMessage, setPopupMessage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://waseet.runasp.net/api/Category/Categories");
        if (response.ok) {
          const data = await response.json();
          setCategories(data);
        } else {
          console.error("Failed to fetch categories");
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

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

    const aiFormData = new FormData();
    aiFormData.append("image", product.image);

    let aiAccepted = true;

    try {
      const aiResponse = await fetch("https://09ea-102-189-87-56.ngrok-free.app/predict", {
        method: "POST",
        body: aiFormData,
      });

      if (aiResponse.ok) {
        const aiResult = await aiResponse.json();
        if (aiResult.overall_status !== "accepted") {
          setPopupMessage("❌ The image was rejected by the AI due to inappropriate content.");
          return;
        }
      } else {
        setPopupMessage("⚠️ AI server responded with error, skipping AI check...");
      }
    } catch (error) {
      setPopupMessage("⚠️ AI server is not reachable, skipping AI check...");
    }

    // Upload product normally
    try {
      const formData = new FormData();
      formData.append("name", product.name);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("image", product.image);
      formData.append("category", product.category);

      const response = await fetch("http://waseet.runasp.net/api/Product/AddProduct", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        alert("✅ Product created successfully!");
        navigate("/dashboard/addProduct");
      } else {
        alert("❌ Failed to create product.");
      }
    } catch (error) {
      console.error("Error submitting product:", error);
      alert("❌ An error occurred while submitting the product.");
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Create Product" />
      <motion.main
        className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8 dark:text-zinc-50"
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
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={product.description}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 resize-y min-h-16 max-h-32 focus:outline-none focus:ring-1 focus:ring-primary focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
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
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              value={product.category}
              onChange={handleChange}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              required
            >
              <option value="">-- Select Category --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.categoryName}
                </option>
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
            <div className="w-80 h-80 flex items-center justify-center border rounded-md bg-gray-100 text-gray-500 dark:bg-zinc-800 dark:text-zinc-50">
              Image Preview
            </div>
          )}
        </div>
      </motion.main>

      {/* Popup Modal */}
      {popupMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40"
        >
          <div className="bg-white dark:bg-zinc-900 text-black dark:text-white p-6 rounded-xl shadow-lg text-center max-w-md mx-auto">
            <p className="mb-4">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="mt-2 bg-primary text-white px-6 py-2 rounded hover:bg-primary-dark transition-all"
            >
              OK
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default CreateProduct;
