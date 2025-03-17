import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import ReviewsCard from "../reviews/ReviewsCard";
import { addToCart } from "../../../redux/features/cart/cartSlice";
import { useDispatch } from "react-redux";

const SingleProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const dispatch = useDispatch(); 

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

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (!product) {
    return <div className="pt-24 text-center">Loading...</div>;
  }

  return (
    <div className="pt-24">
      {/* shop header */}
      <section className="section__container bg-primary-light rounded-md">
        <h2 className="section__header capitalize">Single Product Page</h2>
        <div className="section__subheader space-x-2">
          <span className="hover:text-primary">
            <Link to="/">Home</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">
            <Link to="/shop">Shop</Link>
          </span>
          <i className="ri-arrow-right-s-line"></i>
          <span className="hover:text-primary">{product.name}</span>
        </div>
      </section>

      {/* Single product */}
      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-8 p-4 rounded-md">
          {/* Single product image */}
          <div className="md:w-3/2 lg:w-1/2 w-full">
            <img
              src={product.imageURL}
              alt={product.name}
              className="w-full h-full rounded-md object-cover"
            />
          </div>

          {/* Single product details */}
          <div className="md:w-3/2 lg:w-1/2 w-full rounded-md p-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src={product.serviceProviderImage}
                alt={product.serviceProviderName}
                className="w-12 h-12 rounded-md object-cover"
              />
              <p>{product.serviceProviderName}</p>
            </div>
            <h3 className="text-3xl font-semibold mb-4">{product.name}</h3>
            <p className="text-xl text-primary mb-4">
              ${product.price} {product.oldPrice ? <s>${product.oldPrice}</s> : null}
            </p>
            <p className="text-gray-700 mb-4">{product.description}</p>
            <hr />
            {/* additional info */}
            <div className="mt-4">
              <p>
                <strong>Category: </strong>{product.category}
              </p>
              <div className="flex gap-1">
                <div>
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
      <section className="section__container mt-4">
        <ReviewsCard />
      </section>
    </div>
  );
};

export default SingleProduct;
