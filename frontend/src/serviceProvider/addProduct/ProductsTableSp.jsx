import { motion } from "framer-motion";
import { Edit, Search, Trash2 } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

const PRODUCT_DATA = [
  {
    id: 1,
    name: "Wireless Earbuds",
    dscription: "Stylish leather handbag.",
    category: "Electronics",
    price: 59.99,
    image:"/src/assets/handicraft1.jpg",
  },
  {
    id: 2,
    name: "Leather Wallet",
    dscription: "Stylish leather handbag.",
    category: "Accessories",
    price: 39.99,
    image:"/src/assets/handicraft1.jpg",
  },
  {
    id: 3,
    name: "Smart Watch",
    dscription: "Stylish leather handbag.",
    category: "Electronics",
    price: 199.99,
    image:"/src/assets/handicraft1.jpg",
  },
  {
    id: 4,
    name: "Yoga Mat",
    dscription: "Stylish leather handbag.",
    category: "Fitness",
    price: 29.99,
    image:"/src/assets/handicraft1.jpg",
  },
  {
    id: 5,
    name: "Coffee Maker",
    dscription: "Stylish leather handbag.",
    category: "Home",
    price: 79.99,
    image:"/src/assets/handicraft1.jpg",
  },
];

const ProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(PRODUCT_DATA);

  const handleSearch = (e) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    const filtered = PRODUCT_DATA.filter(
      (product) => product.name.toLowerCase().includes(term) || product.category.toLowerCase().includes(term)
    );
    setFilteredProducts(filtered);
  };

  const handleDelete = (id) => {
    const updatedProducts = filteredProducts.filter((product) => product.id !== id);
    setFilteredProducts(updatedProducts);
  };

  return (
    <motion.div
      className="bg-white bg-opacity-50 backdrop-blur-md shadow-lg rounded-xl p-6 border border-gray-300 mb-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
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
            <tr >
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Name</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Description</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Category</th>
              <th className='px-6 py-3 text-left text-xs font-medium uppercase tracking-wider'>Price</th>
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
                <td className='px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-700 flex gap-2 items-center'>
                  <img src={product.image} alt='Product img' className='size-10 rounded-full' />
                  {product.name}
                </td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{product.dscription}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>{product.category}</td>
                <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-600'>${product.price.toFixed(2)}</td>
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
