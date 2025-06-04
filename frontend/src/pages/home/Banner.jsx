import React from "react";
import { Link } from "react-router-dom";
import bannerImg from "../../assets/header.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const Banner = () => {
  return (
    <motion.div
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.7 }}
      className="section__container header__container rounded-xl shadow-xl bg-white dark:bg-zinc-800/90 relative overflow-hidden"
    >
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
        <div className="absolute bottom-0 left-0 w-full h-full bg-[radial-gradient(circle_at_bottom_left,rgba(var(--primary-rgb),0.05),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC4wMSI+PHBhdGggZD0iTTM2IDM0aDR2NGgtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-40"></div>
      </div>

      {/* header content */}
      <motion.div
        variants={fadeIn("up", 0.3)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="header__content z-10 relative"
      >
        <div className="max-w-xl">
          <div className="inline-block">
            <h4 className="uppercase text-sm font-medium tracking-wider text-primary mb-4 relative inline-flex items-center">
              <span className="w-8 h-[1px] bg-primary mr-3"></span>
              Search Your One From Thousand of Products
              <span className="w-8 h-[1px] bg-primary ml-3"></span>
            </h4>
          </div>
          
          <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white tracking-tight">
            Your{" "}
            <span className="relative inline-block">
              <span className="relative z-10 text-primary">Service</span>
              <div className="absolute bottom-1 left-0 w-full h-2 bg-primary/10"></div>
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Discover top-quality products & services crafted to meet your daily needs. Shop the latest trends in fashion, electronics, and home essentials — all delivered with fast shipping and trusted service.
          </p>

          <Link to="/shop">
            <button className="btn bg-primary text-white transition-all duration-300 group relative overflow-hidden">
              <span className="relative z-10 inline-flex items-center">
                EXPLORE NOW
                <svg 
                  className="w-4 h-4 ml-2 transform transition-transform duration-300 group-hover:translate-x-1" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark transition-opacity opacity-0 group-hover:opacity-100"></div>
            </button>
          </Link>
        </div>
      </motion.div>

      {/* header image */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="header__image relative"
      >
        {/* New decorative background for image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 to-transparent"></div>
          <div className="absolute top-[10%] right-[10%] w-32 h-32 bg-primary/3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-primary/3 rounded-full blur-3xl"></div>
          <div className="absolute top-[40%] left-[10%] w-24 h-24 bg-primary/3 rounded-full blur-xl"></div>
          
          {/* Decorative lines */}
          <div className="absolute top-[15%] right-[15%] w-40 h-[1px] bg-primary/10 transform rotate-45"></div>
          <div className="absolute bottom-[25%] left-[10%] w-32 h-[1px] bg-primary/10 transform -rotate-45"></div>
          
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent"></div>
        </div>

        <img 
          src={bannerImg} 
          alt="bannerImg" 
          className="relative z-10"
        />
      </motion.div>

      {/* Elegant border accent */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
    </motion.div>
  );
};

export default Banner;