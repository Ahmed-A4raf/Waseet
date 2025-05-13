import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import HeaderSp from "../commenSp/HeaderSp";
import { motion } from "framer-motion";

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [updatedProduct, setUpdatedProduct] = useState({
    name: "",
    description: "",
    price: "",
    oldPrice: "",
    category: "",
    image: null,
  });
  const [categories, setCategories] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [error, setError] = useState(null);
  const [initialPrice, setInitialPrice] = useState("");

  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const token = storedUser?.token;

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch("http://waseet.runasp.net/api/Category/Categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!response.ok) throw new Error("Failed to fetch categories");
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        console.error("Category fetch error:", err);
      }
    };

    fetchCategories();
  }, [token]);

  // Fetch existing product data
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://waseet.runasp.net/api/Product/GetProductById/${id}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        if (!response.ok) throw new Error("Failed to fetch product");

        const data = await response.json();
        setUpdatedProduct({
          name: data.name || "",
          description: data.description || "",
          price: data.price ?? "",
          oldPrice: data.price ?? "",
          category: String(data.category) || "",
          image: null,
        });
        setImagePreview(data.imageURL || null);
        setInitialPrice(data.price ?? "");
      } catch (err) {
        console.error(err);
        setError("Error loading product.");
      } finally {
        setFetching(false);
      }
    };
    fetchProduct();
  }, [id, token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedProduct((prev) => ({ ...prev, image: file }));
      setImagePreview(URL.createObjectURL(file));
    }
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    // Check image using AI only if the user has uploaded a new one
    if (updatedProduct.image) {
      try {
        const aiFormData = new FormData();
        aiFormData.append("image", updatedProduct.image);

        const aiResponse = await fetch("https://b6bf-102-189-85-35.ngrok-free.app/predict", {
          method: "POST",
          body: aiFormData,
        });

        if (aiResponse.ok) {
          const aiResult = await aiResponse.json();

          if (aiResult.overall_status !== "accepted") {
            alert("❌ The image was rejected by the AI due to inappropriate content.");
            setLoading(false);
            return;
          }
        } else {
          alert("⚠️ AI server responded with error, skipping AI check...");
        }
      } catch (error) {
        alert("⚠️ AI server is not reachable, skipping AI check...");
      }
    }

    // Build form data for update
    const formData = new FormData();
    formData.append("id", id);
    formData.append("name", updatedProduct.name);
    formData.append("description", updatedProduct.description);
    formData.append("price", String(updatedProduct.price));
    formData.append("category", String(updatedProduct.category));

    if (updatedProduct.price !== initialPrice) {
      formData.append("oldPrice", String(initialPrice));
    }

    if (updatedProduct.image) {
      formData.append("image", updatedProduct.image);
    }

    const response = await fetch(`http://waseet.runasp.net/api/Product/UpdateProduct`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Update failed");

    alert("✅ Product updated successfully!");
    setInitialPrice(updatedProduct.price);
    navigate("/dashboard/addProduct");
  } catch (err) {
    console.error("Update Error:", err);
    alert("❌ Failed to update product.");
  } finally {
    setLoading(false);
  }
};



  if (fetching) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Edit Product" />
      <motion.main
        className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8 dark:text-zinc-50"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
          <div>
            <label className="block font-semibold">Product Name</label>
            <input
              type="text"
              name="name"
              value={updatedProduct.name}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            />
          </div>

          <div>
            <label className="block font-semibold">Description</label>
            <textarea
              name="description"
              value={updatedProduct.description}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full resize-y min-h-16 max-h-32  pl-4 pr-4 focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            />
          </div>

          <div className="flex space-x-4">
            <div className="w-1/2">
              <label className="block font-semibold">Price</label>
              <input
                type="number"
                name="price"
                value={updatedProduct.price}
                onChange={handleChange}
                required
                disabled={loading}
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              />
            </div>

            <div className="w-1/2">
              <label className="block font-semibold">Old Price</label>
              <input
                type="number"
                name="oldPrice"
                value={initialPrice}
                disabled
                className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              disabled={loading}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
            />
          </div>

          <div>
            <label className="block font-semibold">Category</label>
            <select
              name="category"
              value={updatedProduct.category}
              onChange={handleChange}
              required
              disabled={loading}
              className="w-full focus:outline-primary bg-primary-light hover:border px-5 py-3 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-800 dark:focus:outline-zinc-900"
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
            disabled={loading}
            className={`bg-primary text-white px-8 py-2 rounded-md ${
              loading ? "opacity-50 cursor-not-allowed" : "hover:bg-primary-dark"
            }`}
          >
            {loading ? "Updating..." : "Update"}
          </button>
        </form>

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
    </div>
  );
};

export default EditProduct;
