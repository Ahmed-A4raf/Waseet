import { m } from "framer-motion";
import React from "react";

import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const PromoBanner = () => {
  return (
    <section className="section__container banner__container">
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="banner__card"
      >
        <span className="bg-primary-light dark:bg-zinc-800 w-fit h-fit light rounded-full border-4 border-primary animate-pulse">
          <i className="ri-truck-line p-4"></i>
        </span>
        <h4 className="dark:text-zinc-50">Free Delivery</h4>
        <p className="dark:text-zinc-400">
          Free Delivery Offers convenience and the ability to shop from
          anywhere, anytime.
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="banner__card"
      >
        <span className="bg-primary-light dark:bg-zinc-800 w-fit h-fit rounded-full border-4 border-primary animate-pulse">
          <i className="ri-money-dollar-circle-line p-4"></i>
        </span>
        <h4 className="dark:text-zinc-50">100% Money Back Guaranty</h4>
        <p className="dark:text-zinc-400">
          E-commerce have a review system where customers can share feedback.
        </p>
      </motion.div>

      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="banner__card"
      >
        <span className="bg-primary-light dark:bg-zinc-800 w-fit h-fit rounded-full border-4 border-primary animate-pulse">
          <i className="ri-user-voice-fill p-4"></i>
        </span>
        <h4 className="dark:text-zinc-50">Strong Support</h4>
        <p className="dark:text-zinc-400">
          Offer customer support services to assist customers with queries and
          issues.
        </p>
      </motion.div>
    </section>
  );
};

export default PromoBanner;
