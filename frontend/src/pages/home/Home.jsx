import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import Hero from "./Hero";
import TrendingProducts from "../shop/TrendingProducts";

const Home = () => {
  return (
    <div className="pt-24">
      <Banner />
      <Categories />
      <Hero />
      <TrendingProducts />
    </div>
  );
};

export default Home;
