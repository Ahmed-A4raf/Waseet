import React, { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import RatingStars from "../../../components/RatingStars";
import ReviewsCard from "../reviews/ReviewsCard";
const SingleProduct = () => {
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          <span className="hover:text-primary">Product Name</span>
        </div>
      </section>

      {/* Single product */}
      <section className="section__container mt-8">
        <div className="flex flex-col md:flex-row gap-8 p-4 rounded-md">
          {/* Single product image */}
          <div className="md:w-3/2 lg:w-1/2 w-full">
            <img
              src="/src/assets/car1.jpg"
              alt="Single Product img"
              className="w-full h-full rounded-md"
            />
          </div>

          {/* Single product details */}
          <div className="md:w-3/2 lg:w-1/2 w-full rounded-md p-2">
            <div className="flex items-center gap-2 mb-4">
              <img
                src="/src/assets/p7.jpg"
                alt="Single Product img"
                className="w-12 h-12 rounded-md object-cover"
              />
              <p>3sam Sasa</p>
            </div>
            <h3 className="text-3xl font-semibold mb-4 ">Product Name</h3>
            <p className="text-xl text-primary mb-4">
              $100 <s>$130</s>
            </p>
            <p className="text-gray-700 mb-4">
              This is a product description: Lorem ipsum dolor sit amet
              consectetur adipisicing elit. Est aspernatur dignissimos dolorum
              obcaecati mollitia assumenda asperiores voluptas, et, magni quis
              ullam doloribus rerum quos, ipsum perferendis repellat iusto
              aperiam reprehenderit.
            </p>
            <hr />
            {/* aditional info */}
            <div className="mt-4">
              <p>
                <strong>Category: </strong>Handicrafts
              </p>
              <div className="flex gap-1">
                <div>
                  <strong>Rating: </strong>
                </div>
                <div className="pt-1">
                  <RatingStars rating={4} />
                </div>
              </div>
            </div>

            <button className="w-full mt-6 px-6 py-3 bg-primary hover:bg-primary-dark text-white rounded-md transition-all duration-200">
              Add to cart
              <i className="ri-shopping-cart-line pl-1"></i>
            </button>
          </div>
        </div>
      </section>

      {/* Display reviews */}
      {/* waiting for api */}
      <section className="section__container mt-4">
        {/* need props inside the component (ProductReviews) */}
        <ReviewsCard /> 
        
      </section>
    </div>
  );
};

export default SingleProduct;
