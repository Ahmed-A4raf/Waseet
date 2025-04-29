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
      className="section__container header__container rounded-md shadow-sm dark:bg-zinc-800"
    >
      {/* header content */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="header__content z-30"
      >
        <h4 className="uppercase">Search Your one From Thousand of Products</h4>
        <h1 className="dark:text-zinc-50">
          Your <span className="text-primary">Service</span>
        </h1>
        <p className="dark:text-zinc-400">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Non omnis
          illo id deleniti dolor perferendis quasi doloribus aut, a maxime nam
          nisi. Doloremque tempore corrupti culpa, hic accusantium libero non!
        </p>
        <button className="btn">
          <Link to="/shop">EXPLORE NOW</Link>
        </button>
      </motion.div>

      {/* header image */}
      <motion.div
        variants={fadeIn("left", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="header__image"
      >
        <img src={bannerImg} alt="bannerImg" />
      </motion.div>
    </motion.div>
  );
};

export default Banner;
