import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { syncCartWithServer } from "../../redux/features/cart/cartSlice";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  const [popupMessage, setPopupMessage] = useState(null);

  const handleAddToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    // تحقق من نوع المستخدم
    if (user?.role !== "customer") {
      setPopupMessage(
        "You must be logged in as a customer to add items to your cart."
      );
      return;
    }

    const basketItems = [
      ...cartItems.map((item) => ({
        productId: item.id,
        quantity: item.quantity,
      })),
      {
        productId: product.id,
        quantity: 1,
      },
    ];

    try {
      const res = await fetch("http://waseet.runasp.net/api/Cart/basket", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(basketItems),
      });

      if (!res.ok) return;

      const data = await res.json();
      dispatch(syncCartWithServer(data));
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      {/* Popup message */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-center p-6 rounded-xl shadow-xl max-w-xs dark:bg-zinc-800">
            <p className="text-red-600 font-semibold mb-4 dark:text-red-400">
              {popupMessage}
            </p>
            <button
              onClick={() => setPopupMessage(null)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: "some" }}
        className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
      >
        {products.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ y: -5 }}
            className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 relative dark:bg-zinc-800/90 border border-gray-100/10 dark:border-zinc-700/30 "
          >
            {/* Product Image Container */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <Link to={`/shop/${product.id}`}>
                <img
                  src={product.imageURL}
                  alt={product.name}
                  className="w-full h-full object-cover transform hover:scale-110 transition-transform duration-700"
                />
              </Link>

              {/* Discount Badge */}
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="absolute top-4 left-4">
                  <div className="bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-lg">
                    -
                    {Math.round(
                      ((product.oldPrice - product.price) / product.oldPrice) *
                        100
                    )}
                    %
                  </div>
                </div>
              )}

              {/* Cart Button */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
                className="absolute top-4 right-4 bg-white w-9 h-9 rounded-full flex items-center justify-center shadow-md hover:bg-primary hover:text-white transition-all duration-300 dark:bg-zinc-700 dark:hover:bg-primary"
              >
                <i className="ri-shopping-cart-2-line text-lg"></i>
              </button>
            </div>

            {/* Product Info */}
            <div className="p-4">
              {/* Service Provider */}
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <img
                    src={product.serviceProviderImage}
                    alt={product.serviceProviderName}
                    className="w-8 h-8 rounded-full object-cover ring-2 ring-primary/20"
                  />
                  <div className="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-800"></div>
                </div>
                <span className="text-sm text-gray-600 font-medium dark:text-zinc-400 truncate">
                  {product.serviceProviderName}
                </span>
              </div>

              {/* Product Name */}
              <Link to={`/shop/${product.id}`}>
                <h3 className="font-semibold text-gray-800 mb-2 hover:text-primary transition-colors duration-300 line-clamp-2 min-h-[48px] dark:text-zinc-100">
                  {product.name}
                </h3>
              </Link>

              {/* Rating */}
              <div className="flex items-center gap-2 mb-3">
                <RatingStars rating={product.rating} />
                <span className="text-xs text-gray-500 dark:text-zinc-400">
                  ({product.rating})
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-2">
                <span className="text-xl font-bold text-primary">
                  ${product.price}
                </span>
                {typeof product.oldPrice === "number" &&
                  product.oldPrice > product.price && (
                    <span className="text-sm text-gray-400 line-through dark:text-zinc-500">
                      ${product.oldPrice}
                    </span>
                  )}
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </>
  );
};

export default ProductCards;
