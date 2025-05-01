import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const Forgetpass = () => {
  const [email, setEmail] = useState("");

  const handleResetPass = async (e) => {
    e.preventDefault();
    const data = { email };
    // send reset request here
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-primary/5 dark:bg-zinc-900 overflow-hidden">
      {/* Background SVG Wave */}
      <motion.svg
        variants={fadeIn("up", 0.7)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.5 }}
        className="absolute bottom-0 left-0 w-full"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 1440 320"
      >
        <path
          fill="#fd7e14"
          fillOpacity="0.5"
          d="M0,64L48,58.7C96,53,192,43,288,74.7C384,107,480,181,576,224C672,267,768,277,864,272C960,267,1056,245,1152,202.7C1248,160,1344,96,1392,64L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        ></path>
      </motion.svg>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="max-w-sm shadow bg-white mx-auto p-8 rounded-md dark:bg-zinc-800 z-10"
      >
        <h2 className="text-3xl text-center font-bold pt-5 dark:text-zinc-50">
          Reset your password
        </h2>
        <p className="text-center text-gray-700 my-2 dark:text-zinc-400">
          If the account exists, we'll email you instructions to reset it.
        </p>
        <hr />
        <form
          onSubmit={handleResetPass}
          className="space-y-4 max-w-sm mx-auto pt-8"
        >
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-zinc-50"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            required
          />

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            Reset password
          </button>

          <div className="text-center space-y-2">
            <Link to="/login" className="text-primary hover:underline">
              Return to login
            </Link>
          </div>
        </form>
      </motion.div>
    </section>
  );
};

export default Forgetpass;
