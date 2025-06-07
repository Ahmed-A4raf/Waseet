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
      className="section__container header__container rounded-xl shadow-xl bg-primary-light dark:bg-zinc-800/90 relative overflow-hidden"
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
          {/* Enhanced Subtitle with Animation */}
          <div className="inline-block relative">
            <h4 className="uppercase text-sm font-medium tracking-wider text-primary mb-4 relative inline-flex items-center bg-primary/10 px-6 py-2 rounded-full">
              <motion.span
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                className="absolute inset-0 bg-primary/5 rounded-full"
                transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
              />
              <span className="relative flex items-center gap-3">
                <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
                Search Your One From Thousand of Products
              </span>
            </h4>
          </div>

          {/* Enhanced Title with Better Animation */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 dark:text-white tracking-tight">
            Your{" "}
            <span className="relative inline-block group">
              <span className="relative z-10 text-primary">Service</span>
              <motion.div
                initial={{ width: "0%" }}
                whileInView={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="absolute bottom-1 left-0 h-2 bg-primary/10 group-hover:bg-primary/20 transition-colors duration-300"
              />
            </span>
          </h1>

          <p className="text-gray-600 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Discover top-quality products & services crafted to meet your daily needs. Shop the latest trends in fashion, electronics, and home essentials — all delivered with fast shipping and trusted service.
          </p>

          {/* Enhanced Button with Better Animation */}
          <div className="flex items-center gap-4">
            <Link to="/shop">
              <button className="btn bg-primary text-white transition-all duration-300 group relative overflow-hidden rounded-xl px-8">
                <span className="relative z-10 inline-flex items-center">
                  EXPLORE NOW
                  <motion.svg
                    className="w-5 h-5 ml-2"
                    initial={{ x: 0 }}
                    animate={{ x: [0, 5, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </motion.svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-primary to-primary-dark transition-opacity opacity-0 group-hover:opacity-100"></div>
              </button>
            </Link>

            {/* Trust Badges */}
            <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Trusted Shop</span>
              </div>
              <div className="flex items-center gap-1">
                <svg className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* header image with enhanced effects */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="header__image relative flex items-center justify-center h-full"
      >
        {/* Enhanced Background Effects */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/3 to-transparent"></div>
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute top-[10%] right-[10%] w-32 h-32 bg-primary/50 rounded-full blur-2xl"
          />
          <motion.div
            animate={{ scale: [1.2, 1, 1.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="absolute bottom-[20%] left-[20%] w-40 h-40 bg-primary/3 rounded-full blur-3xl"
          />

          {/* Animated Decorative Lines */}
          <motion.div
            animate={{ rotate: [45, 50, 45] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-[15%] right-[15%] w-40 h-[1px] bg-primary/20"
          />
          <motion.div
            animate={{ rotate: [-45, -40, -45] }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute bottom-[25%] left-[10%] w-32 h-[1px] bg-primary/20"
          />
          
        </div>

        {/* Enhanced Image with Hover Effect */}
        <motion.img
          src={bannerImg}
          alt="Banner"
          className="relative z-10 w-[100%] h-auto object-contain transform transition-transform duration-700 hover:scale-105 mx-auto my-auto"
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
        />
      </motion.div>

      {/* Enhanced Border Accent */}
      <div className="absolute bottom-0 left-0 w-full">
        <div className="h-1 bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      </div>
    </motion.div>
  );
};

export default Banner;