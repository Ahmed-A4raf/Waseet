import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../../utils/animationVariants";

const Contact = () => {
  const navigate = useNavigate();
  const formRef = useRef();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSubmit = (e) => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user?.token) {
      e.preventDefault();
      navigate("/login");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-zinc-900 dark:to-zinc-800 pt-24">
      {/* Hero Section */}
      <motion.section
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            Get in Touch
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're here to help and answer any questions you might have.
            We look forward to hearing from you.
          </p>
        </div>
      </motion.section>

      {/* Main Content */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Contact Information */}
          <motion.div
            variants={fadeIn("right", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
            className="space-y-8"
          >
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8 transform transition-all hover:scale-105">
              <div className="space-y-6">
                <div className="flex items-center space-x-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <i className="ri-map-pin-line text-2xl text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">Visit Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">213 Lane, Shebeen El-Kom, Egypt</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <i className="ri-phone-line text-2xl text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">Call Us</h3>
                    <p className="text-gray-600 dark:text-gray-300">+1 234 567 890</p>
                  </div>
                </div>

                <div className="flex items-center space-x-6">
                  <div className="bg-primary/10 p-4 rounded-full">
                    <i className="ri-global-line text-2xl text-primary"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold dark:text-white">Website</h3>
                    <p className="text-gray-600 dark:text-gray-300">www.waseet.com</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map */}
            <div className="rounded-2xl overflow-hidden shadow-lg h-[300px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3435.423750797247!2d31.01050727463904!3d30.565580993693434!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14f7d6eb70a91047%3A0xc353387ed2f37809!2sMenoufiya%20University!5e0!3m2!1sen!2seg!4v1740747833865!5m2!1sen!2seg"
                className="w-full h-full"
                allowFullScreen=""
                loading="lazy"
              ></iframe>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            variants={fadeIn("left", 0.3)}
            initial="hidden"
            whileInView={"show"}
            viewport={{ once: true, amount: 0.7 }}
          >
            <div className="bg-white dark:bg-zinc-800 rounded-2xl shadow-lg p-8">
              <h2 className="text-2xl font-bold mb-6 dark:text-white">Send us a Message</h2>
              <form
                ref={formRef}
                action="https://getform.io/f/bwnqwoja"
                method="POST"
                className="space-y-6"
                onSubmit={handleSubmit}
              >
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Name
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    type="text"
                    placeholder="Enter your name"
                    name="name"
                    id="name"
                    autoComplete="name"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    type="email"
                    placeholder="Enter your email"
                    name="email"
                    id="email"
                    autoComplete="email"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Phone Number
                  </label>
                  <input
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    type="number"
                    placeholder="Enter your phone number"
                    name="phone"
                    id="phone"
                    autoComplete="tel"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all min-h-[120px] dark:bg-zinc-700 dark:border-zinc-600 dark:text-white"
                    placeholder="Write your message here..."
                    name="message"
                    id="message"
                    required
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 px-6 rounded-lg hover:bg-primary/90 transition-colors duration-300 font-medium text-lg"
                >
                  Send Message
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
