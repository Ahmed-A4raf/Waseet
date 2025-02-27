import React from "react";
import { Link } from "react-router-dom";
import RatingStars from "../../components/RatingStars";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";

const ProductCards = ({ products }) => {
  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
      {products.map((product, index) => (
        <div
          key={index}
          className="product__card rounded-md overflow-hidden shadow-md hover:scale-105 transition-scale duration-300"
        >
          <div className="relative">
            <Link to={`/shop/${product._id}`}>
              <img
                src={product.image}
                alt="product image"
                className="w-full h-64 object-cover"
              />
            </Link>
            <div className="hover:block absolute top-3 right-3">
              <button 
              onClick={(e) =>{
                e.stopPropagation();
                handleAddToCart(product);
              }}
              
              className="hover:block">
                <i className="ri-shopping-cart-2-line bg-primary p-1.5 text-white hover:bg-primary-dark rounded-md"></i>
              </button>
            </div>
            <div className="flex items-center bg-white text-transparent hover:text-black group rounded-2xl p-0.5 absolute top-3 left-3">
              <div>
                <img
                  src={product.serviceProviderImg}
                  alt="provider image"
                  className="w-8 h-8 rounded-full object-cover"
                />
              </div>
              <div className="overflow-hidden max-w-0 group-hover:max-w-xs transition-all duration-300">
                <span className="mx-1 text-sm whitespace-nowrap">
                  {product.serviceProviderName}
                </span>
              </div>
            </div>
          </div>

          {/* product description */}
          <div className="product__card__content rounded-lg">
            <h4>{product.name}</h4>
            <p>
              ${product.price}
              {product.oldPrice ? <s>${product?.oldPrice}</s> : null}
            </p>
            <RatingStars rating={product.rating} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductCards;
