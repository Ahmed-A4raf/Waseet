import React, { useEffect, useState } from "react";
import dealImg from "../../assets/deals.png";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const DealsSection = () => {
  const [timeLeft, setTimeLeft] = useState({});
  const dealEndDate = new Date("2025-06-13T23:59:59");

  useEffect(() => {
    const updateCountdown = () => {
      const now = new Date();
      const diff = dealEndDate - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hours: 0, mins: 0, secs: 0 });
        return;
      }

      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      const secs = Math.floor((diff / 1000) % 60);

      setTimeLeft({ days, hours, mins, secs });
    };

    updateCountdown(); // Run immediately
    const timer = setInterval(updateCountdown, 1000);

    return () => clearInterval(timer); // Cleanup
  }, []);

  return (
    <motion.section
      variants={fadeIn("up", 0.2)}
      initial="hidden"
      whileInView={"show"}
      viewport={{ once: true, amount: 0.5 }}
      className="section__container deals__container dark:bg-zinc-800"
    >
      {/* Deals Image */}
      <motion.div
        variants={fadeIn("right", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="deals__image relative"
      >
        <img src={dealImg} alt="Deals" className="w-full absolute inset-0" />
      </motion.div>

      {/* Deals Content */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="deals__content"
      >
        <h5>Your one From Thousand of Products</h5>
        <h4 className="dark:text-zinc-50">Deals of the Month</h4>
        <p className="dark:text-zinc-400">
          Get exclusive limited-time offers you won't find anywhere else. Shop before they're gone!
        </p>

        {/* Countdown Timer */}
        <div className="deals__countdown flex-wrap">
          {["days", "hours", "mins", "secs"].map((unit) => (
            <div key={unit} className="deals__countdown__card dark:bg-zinc-900">
              <h4 className="dark:text-zinc-50">{timeLeft[unit] ?? "--"}</h4>
              <p className="dark:text-zinc-400">
                {unit.charAt(0).toUpperCase() + unit.slice(1)}
              </p>
            </div>
          ))}
        </div>
      </motion.div>
    </motion.section>
  );
};

export default DealsSection;
