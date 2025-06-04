import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import ReviewsCard from "../reviews/ReviewsCard";
import { syncCartWithServer } from "../../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import { motion } from "framer-motion";
import { fadeIn } from "../../../utils/animationVariants";
import Loading from "../../../components/common/Loading";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [popupMessage, setPopupMessage] = useState(null); // حالة الرسالة
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProduct = async () => {
      try {
        const response = await fetch(
          `http://waseet.runasp.net/api/Product/GetProductById/${id}`
        );
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;

    if (!token) {
      navigate("/login");
      return;
    }

    if (user?.role !== "customer") {
      setPopupMessage("You must be logged in as a customer to add items to your cart.");
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

  if (!product) {
    return <div className="pt-24 text-center"><Loading /></div>;
  }

  return (
    <div className="pt-24">
      {/* Popup message */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-center p-6 rounded-xl shadow-xl max-w-xs dark:bg-zinc-800">
            <p className="text-red-600 font-semibold mb-4 dark:text-red-400">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* باقي الصفحة */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="section__container bg-primary-light rounded-md dark:bg-zinc-800"
      >
        <h2 className="section__header capitalize dark:text-zinc-50">
          Single Product Page
        </h2>
        <div className="section__subheader space-x-2">
          <Link to="/" className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">
            Home
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <Link to="/shop" className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">
            Shop
          </Link>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">
            {product.name}
          </span>
        </div>
      </motion.section>

      {/* تفاصيل المنتج */}
      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-8 p-4 rounded-md">
          <motion.div
            variants={fadeIn("right", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="md:w-3/2 lg:w-1/2 w-full h-full"
          >
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-96 rounded-md object-cover"
            />
          </motion.div>

          <motion.div
            variants={fadeIn("left", 0.2)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="md:w-3/2 lg:w-1/2 w-full rounded-md px-2 py-6"
          >
            <div className="flex items-center gap-2 mb-4">
              <img
                src={product.serviceProviderImage}
                alt={product.serviceProviderName}
                className="w-12 h-12 rounded-md object-cover"
              />
              <p>{product.serviceProviderName}</p>
            </div>
            <h3 className="text-3xl font-semibold mb-4 dark:text-zinc-50">
              {product.name}
            </h3>
            <p className="text-xl mb-4 dark:text-zinc-50">
              ${product.price}{" "}
              {product.oldPrice ? (
                <s className="text-primary">${product.oldPrice}</s>
              ) : null}
            </p>
            <p className="text-gray-700 mb-4 dark:text-zinc-400">
              {product.description}
            </p>
            <hr />
            <div className="mt-4">
              <p><strong>Category: </strong>{product.category}</p>
              <div className="flex gap-1">
                <strong className="dark:text-zinc-50">Rating: </strong>
                <div className="pt-1">
                  <RatingStars rating={product.rating} />
                </div>
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAddToCart(product);
              }}
              className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-200"
            >
              Add to cart
              <i className="ri-shopping-cart-line pl-1"></i>
            </button>
          </motion.div>
        </div>
      </section>

      {/* المراجعات */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.2 }}
        className="section__container"
      >
        <ReviewsCard productId={id} />
      </motion.section>
    </div>
  );
};

export default SingleProduct;
