import React, { useEffect, useState } from "react";
import HeaderSp from "../../serviceProvider/commenSp/HeaderSp";
import { useParams, useNavigate } from "react-router-dom";

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
    fetch(`http://waseet.runasp.net/api/Category/CategoryById/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setCategory({
          categoryName: data.categoryName,
          image: null,
          imageUrl: data.imageUrl
        });
        setPreview(data.imageUrl);
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
    formData.append("categoryName", category.categoryName);
    if (category.image) formData.append("image", category.image);

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    try {
      const res = await fetch(
        `http://waseet.runasp.net/api/Category/UpdateCategory/${id}`,
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
        alert("Failed to update category.");
      }
    } catch (error) {
      console.error("Error updating category:", error);
      alert("An error occurred while updating.");
    }
  };

  return (
    <div className="flex-1 overflow-auto relative z-10">
      <HeaderSp title="Edit Category" />
      <main className="flex items-start space-x-8 max-w-7xl mx-auto py-6 px-4 lg:px-8">
        <form onSubmit={handleSubmit} className="w-1/2 space-y-4">
          <div>
            <label className="block font-semibold">Category Name</label>
            <input
              type="text"
              name="categoryName"
              value={category.categoryName}
              onChange={handleChange}
              className="w-full text-gray-700 placeholder-gray-400 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
              required
            />
          </div>

          <div>
            <label className="block font-semibold">Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full bg-white text-gray-700 rounded-lg px-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
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
            <div className="w-80 h-80 flex items-center justify-center border rounded-md bg-gray-100 text-gray-500">
              Image Preview
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default EditCategoriesAdmin;
