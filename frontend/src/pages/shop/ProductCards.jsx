import React from "react";
import { Link, useNavigate } from "react-router-dom"; // <-- ضفت useNavigate هنا
import RatingStars from "../../components/RatingStars";
import { useDispatch, useSelector } from "react-redux";
import { syncCartWithServer } from "../../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.products);
  const navigate = useNavigate(); // <-- استخدمته هنا

  const handleAddToCart = async (product) => {
    const existingItem = cartItems.find((item) => item.id === product.id);
    if (existingItem) return;

    const user = JSON.parse(localStorage.getItem("user"));
    const token = user?.token;
    if (!token) {
      navigate("/login"); // <-- هنا هينفيجيت للوجين
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

  // الباقي زي ما هو
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div key={index} className="product__card rounded-md overflow-hidden shadow-md hover:scale-105 transition-scale duration-300 dark:bg-zinc-800 dark:shadow-zinc-900">
          <div className="relative">
            <Link to={`/shop/${product.id}`}>
              <img src={product.imageURL} alt={product.name} className="w-full h-64 object-cover" />
            </Link>
            <div className="hover:block absolute top-3 right-3">
              <button onClick={(e) => { e.stopPropagation(); handleAddToCart(product); }}>
                <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark rounded-md"></i>
              </button>
            </div>
            <div className="flex items-center bg-white text-transparent hover:text-black group rounded-2xl p-0.5 absolute top-3 left-3 dark:bg-zinc-800 dark:text-zinc-50">
              <div>
                <img src={product.serviceProviderImage} alt={product.serviceProviderName} className="w-8 h-8 rounded-full object-cover" />
              </div>
              <div className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300">
                <span className="mx-1 text-sm whitespace-nowrap">{product.serviceProviderName}</span>
              </div>
            </div>
          </div>
          <div className="product__card__content rounded-lg">
            <h4>{product.name}</h4>
            <p className="dark:text-zinc-50">
              ${product.price}
              {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
