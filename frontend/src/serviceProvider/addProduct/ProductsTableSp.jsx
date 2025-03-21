import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  const storedUser = JSON.parse(localStorage.getItem("user")) || null;
  const token = storedUser?.token;

  // ✅ Fetch products from API on component mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("http://waseet.runasp.net/api/Product/ProductsCards", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }

        const data = await response.json();
        console.log("Fetched products:", data); // ✅ فحص البيانات المسترجعة

        // ✅ تأكد أن `data` هو مصفوفة قبل التعيين
        if (Array.isArray(data)) {
          setProducts(data);
        } else {
          console.error("Unexpected response format:", data);
          setProducts([]); // تجنب الأخطاء بوضع مصفوفة فارغة
        }
      } catch (error) {
        console.error("Error fetching products:", error);
        setProducts([]); // تجنب الأخطاء بإرجاع مصفوفة فارغة
      }
    };

    fetchProducts();
  }, [token]);

  // ✅ Search function
  const handleSearch = (e) => {
    setSearchTerm(e.target.value.toLowerCase());
  };

  // ✅ Delete product from API
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://waseet.runasp.net/api/Product/DeleteProduct/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      } else {
        alert("Failed to delete product.");
      }
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  // ✅ Filter products based on search term (ensuring `products` is an array)
  const filteredProducts = Array.isArray(products)
    ? products.filter(
        (product) =>
          product.name?.toLowerCase().includes(searchTerm) || 
          product.serviceProviderName?.toLowerCase().includes(searchTerm)
      )
    : [];

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
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
            className="bg-primary-light text-gray-700 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
            onChange={handleSearch}
            value={searchTerm}
          />
          <Search className='absolute left-3 top-2.5 text-gray-400' size={18} />
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-300">
          <thead>
            <tr>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Product</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Description</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Price</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Service Provider</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Actions</th>
            </tr>
          </thead>

          <tbody className='divide-y divide-gray-300'>
            {filteredProducts.map((product) => (
              <motion.tr
                key={product.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              >
                {/* ✅ Product Name + Image */}
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 flex gap-2 items-center'>
                  <img src={product.image} alt={product.name} className='w-12 h-12 rounded-md object-cover' />
                  {product.name}
                </td>

                {/* ✅ Description */}
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{product.description}</td>

                {/* ✅ Category */}
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{product.category}</td>

                {/* ✅ Price */}
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>${product.price.toFixed(2)}</td>

                {/* ✅ Service Provider Name + Image */}
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600 flex items-center gap-2'>
                  <img 
                    src={product.serviceProviderImg} 
                    alt={product.serviceProviderName} 
                    className='w-8 h-8 rounded-full object-cover' 
                  />
                  {product.serviceProviderName}
                </td>

                {/* ✅ Actions (Edit & Delete) */}
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>
                  <button className='text-indigo-400 hover:text-indigo-300 mr-2'>
                    <Link to={`/dashboard/addProduct/edit/${product.id}`} ><Edit size={18} /></Link>
                  </button>
                  <button
                    className='text-red-400 hover:text-red-300'
                    onClick={() => handleDelete(product.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </motion.div>
  );
};

export default ProductsTable;
