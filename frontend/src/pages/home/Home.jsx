import React, { useEffect } from "react";
import Banner from "./Banner";
import Categories from "./Categories";
import TrendingProducts from "../shop/TrendingProducts";
import DealsSection from "./DealsSection";
import PromoBanner from "./PromoBanner";
import Blogs from "../blogs/Blogs";



const Home = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="pt-24">
      <Banner />
      <Categories />
      <TrendingProducts />
      <DealsSection />
      <PromoBanner />
      <Blogs />
    </div>
 );
};

export default Home;
