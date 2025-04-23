import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import ReviewsCard from "../reviews/ReviewsCard";
import { syncCartWithServer } from "../../../redux/features/cart/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch(); 
  const cartItems = useSelector((state) => state.cart.products);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://waseet.runasp.net/api/Product/GetProductById/${id}`);
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
    if (!token) return;

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
    return <div className="pt-24 text-center">Loading...</div>;
  }

  return (
    <div className="pt-24">
      {/* shop header */}
      <section className="section__container bg-primary-light rounded-md dark:bg-zinc-800">
        <h2 className="section__header capitalize dark:text-zinc-50">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary dark:text-zinc-400 hover:dark:text-primary">{product.name}</span>
        </div>
      </section>

      {/* Single product */}
      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-8 p-4 rounded-md">
          {/* Single product image */}
          <div className="md:w-3/2 lg:w-1/2 w-full h-full">
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-96 rounded-md object-cover"
            />
          </div>

          {/* Single product details */}
          <div className="md:w-3/2 lg:w-1/2 w-full rounded-md px-2 py-6">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={product.serviceProviderImage}
                alt={product.serviceProviderName}
                className="w-12 h-12 rounded-md object-cover"
              />
              <p>{product.serviceProviderName}</p>
            </div>
            <h3 className="text-3xl font-semibold mb-4 dark:text-zinc-50">{product.name}</h3>
            <p className="text-xl mb-4 dark:text-zinc-50">
              ${product.price} {product.oldPrice ? <s className=" text-primary">${product.oldPrice}</s> : null}
            </p>
            <p className="text-gray-700 mb-4 dark:text-zinc-400">{product.description}</p>
            <hr />
            {/* additional info */}
            <div className="mt-4">
              <p>
                <strong>Category: </strong>{product.category}
              </p>
              <div className="flex gap-1">
                <div className="dark:text-zinc-50">
                  <strong>Rating: </strong>
                </div>
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
              className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-200">
              Add to cart
              <i className="ri-shopping-cart-line pl-1"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Display reviews */}
      <section className="section__container">
        <ReviewsCard productId={id} /> {/* Pass the product ID to ReviewsCard */}
      </section>
    </div>
  );
};

export default SingleProduct;
