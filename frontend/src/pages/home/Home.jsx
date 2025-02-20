import React from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import Hero from "./Hero";
import TrendingProducts from "../shop/TrendingProducts";
import DealsSection from "./DealsSection";
import PromoBanner from "./PromoBanner";
import Blogs from "../blogs/Blogs";


const Home = () => {
  return (
    <div className="pt-24">
      <Banner />
      <Categories />
      <Hero />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </div>
 );
};

export default Home;
