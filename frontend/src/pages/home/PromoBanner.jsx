import React from "react";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const PromoBanner = () => {
  return (
    <section className="section__container py-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Free Delivery Card */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="mb-5 relative">
              <span className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-45 transition-transform duration-300 group-hover:rotate-90"></span>
              <span className="relative flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
                <i className="ri-truck-line text-2xl text-primary"></i>
              </span>
            </div>

            {/* Content */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Free Delivery
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Free Delivery Offers convenience and the ability to shop from anywhere, anytime.
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="h-1 w-0 group-hover:w-full bg-primary/20 mt-6 mx-auto transition-all duration-300 rounded-full"></div>
        </motion.div>

        {/* Money Back Card */}
        <motion.div
          variants={fadeIn("up", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="mb-5 relative">
              <span className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-45 transition-transform duration-300 group-hover:rotate-90"></span>
              <span className="relative flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
                <i className="ri-money-dollar-circle-line text-2xl text-primary"></i>
              </span>
            </div>

            {/* Content */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Money Back
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                E-commerce have a review system where customers can share feedback.
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="h-1 w-0 group-hover:w-full bg-primary/20 mt-6 mx-auto transition-all duration-300 rounded-full"></div>
        </motion.div>

        {/* Support Card */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="group bg-white dark:bg-zinc-900 p-6 rounded-2xl hover:-translate-y-1 transition-all duration-300"
        >
          <div className="flex flex-col items-center">
            {/* Icon */}
            <div className="mb-5 relative">
              <span className="absolute inset-0 bg-primary/10 rounded-xl transform rotate-45 transition-transform duration-300 group-hover:rotate-90"></span>
              <span className="relative flex items-center justify-center w-16 h-16 bg-primary/10 rounded-xl">
                <i className="ri-user-voice-fill text-2xl text-primary"></i>
              </span>
            </div>

            {/* Content */}
            <div className="text-center">
              <h4 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                Strong Support
              </h4>
              <p className="text-gray-600 dark:text-gray-400">
                Offer customer support services to assist customers with queries and issues.
              </p>
            </div>
          </div>

          {/* Bottom Border */}
          <div className="h-1 w-0 group-hover:w-full bg-primary/20 mt-6 mx-auto transition-all duration-300 rounded-full"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default PromoBanner;
