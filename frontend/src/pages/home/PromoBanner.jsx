import React from "react";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <div className="banner__card">
        <span className="bg-primary- w-fit h-fit light rounded-full border-4 border-primary animate-pulse">
          <i className="ri-truck-line p-4"></i>
        </span>
        <h4>Free Delivery</h4>
        <p>
          Free Delivery Offers convenience and the ability to shop from
          anywhere, anytime.
        </p>
      </div>

      <div className="banner__card">
        <span className="bg-primary-light w-fit h-fit rounded-full border-4 border-primary animate-pulse">
          <i className="ri-money-dollar-circle-line p-4"></i>
        </span>
        <h4>100% Money Back Guaranty</h4>
        <p>
          E-commerce have a review system where customers can share feedback.
        </p>
      </div>

      <div className="banner__card">
        <span className="bg-primary-light w-fit h-fit rounded-full border-4 border-primary animate-pulse">
          <i className="ri-user-voice-fill p-4"></i>
        </span>
        <h4>Strong Support</h4>
        <p>
          Offer customer support services to assist customers with queries and
          issues.
        </p>
      </div>
    </section>
  );
};

export default PromoBanner;
