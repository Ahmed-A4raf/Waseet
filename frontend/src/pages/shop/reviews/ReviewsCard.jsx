import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion, AnimatePresence } from "framer-motion";
import { fadeIn } from "../../../utils/animationVariants";
import { Star } from "lucide-react";

const ReviewsCard = ({ productId }) => {
  const [user, setUser] = useState(null);
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [showToast, setShowToast] = useState({ show: false, message: "" });
  const [currentPage, setCurrentPage] = useState(1);
  const [popupMessage, setPopupMessage] = useState(null);
  const navigate = useNavigate(); 

  const reviewsPerPage = 3;
  const API_BASE_URL = "http://waseet.runasp.net/api/Review";

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) {
      setUser(storedUser);
    }
  }, []);

  useEffect(() => {
    if (user && productId) {
      fetchReviews();
    }
  }, [user, productId]);

  const fetchReviews = async () => {
    try {
      const token = user?.token;
      const res = await fetch(`${API_BASE_URL}/GetReviews/${productId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch reviews");

      const data = await res.json();
      setReviews(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async () => {
    if (!user || !user.token) {
      navigate("/login");
      return;
    }

    if (user?.role !== "customer") {
      setPopupMessage("You must be logged in as a customer to submit a review.");
      return;
    }

    if (!comment.trim()) return;

    const token = user.token;

    const newReview = {
      comment,
      rating,
      date: new Date().toISOString(),
      productId,
    };

    try {
      const res = await fetch(`${API_BASE_URL}/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(newReview),
      });

      if (!res.ok) throw new Error("Failed to submit review");

      setComment("");
      setRating(5);
      setShowToast({ show: true, message: "Review submitted!" });
      fetchReviews();

      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    const token = user?.token;

    try {
      const res = await fetch(`${API_BASE_URL}/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to delete review");

      setReviews((prev) => prev.filter((rev) => rev.id !== id));
      setShowToast({ show: true, message: "Review deleted!" });

      setTimeout(() => {
        setShowToast((prev) => ({ ...prev, show: false }));
      }, 2000);
    } catch (err) {
      console.error(err);
    }
  };

  const totalPages = Math.ceil(reviews.length / reviewsPerPage);
  const paginatedReviews = reviews.slice(
    (currentPage - 1) * reviewsPerPage,
    currentPage * reviewsPerPage
  );

  return (
    <div className="mx-auto p-8 bg-white/80 backdrop-blur-md shadow-lg rounded-2xl relative dark:bg-zinc-800/80 border border-gray-100 dark:border-zinc-700">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="text-3xl font-bold mb-8 text-center bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent"
      >
        Product Reviews
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-10">
        {/* Reviews Section */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="md:w-1/2 space-y-6"
        >
          <h3 className="text-2xl font-semibold mb-6 dark:text-zinc-50 flex items-center gap-2">
            <i className="ri-chat-3-line text-primary"></i>
            Customer Feedback
          </h3>
          
          {paginatedReviews.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center space-y-4">
              <i className="ri-chat-off-line text-4xl text-gray-400 dark:text-zinc-500"></i>
              <p className="text-gray-500 dark:text-zinc-400">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          ) : (
            <div className="space-y-6">
              {paginatedReviews.map((rev, index) => (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  key={index}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900/50 dark:border-zinc-700"
                >
                  <div className="flex items-center space-x-4">
                    {rev.profileImage ? (
                      <img
                        src={rev.profileImage}
                        alt={rev.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-primary/20"
                      />
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/30 flex items-center justify-center text-primary font-bold text-xl ring-2 ring-primary/20">
                        {rev.name?.charAt(0).toUpperCase()}
                      </div>
                    )}

                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold text-lg text-primary">{rev.name}</p>
                        {rev.userId === user?.id && (
                          <button
                            onClick={() => handleDelete(rev.id)}
                            className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                          >
                            <i className="ri-delete-bin-line text-xl"></i>
                          </button>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 dark:text-zinc-400">
                        {new Date(rev.date).toLocaleDateString('en-US', { 
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="flex items-center mt-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={18}
                            className={`${
                              i < rev.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300 dark:text-zinc-600"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="mt-4 text-gray-700 dark:text-zinc-300 leading-relaxed">
                    {rev.comment}
                  </p>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-8 gap-2">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors disabled:opacity-50"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="ri-arrow-left-s-line text-xl"></i>
              </motion.button>

              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-10 h-10 rounded-lg font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary/20 dark:bg-primary/20 dark:hover:bg-primary/30 transition-colors disabled:opacity-50"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="ri-arrow-right-s-line text-xl"></i>
              </motion.button>
            </div>
          )}
        </motion.div>

        {/* Add Review Section */}
        <motion.div
          variants={fadeIn("left", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="md:w-1/2"
        >
          <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 dark:bg-zinc-900/50 dark:border-zinc-700">
            <h3 className="text-2xl font-semibold mb-6 dark:text-zinc-50 flex items-center gap-2">
              <i className="ri-star-smile-line text-primary"></i>
              Rate & Review
            </h3>
            
            <div className="flex items-center gap-2 mb-6">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.div
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  key={star}
                >
                  <Star
                    onClick={() => setRating(star)}
                    size={20}
                    className={`cursor-pointer transition-colors ${
                      star <= rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300 dark:text-zinc-600"
                    }`}
                  />
                </motion.div>
              ))}
            </div>

            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share your experience with this product..."
              className="w-full p-4 rounded-xl bg-gray-50 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-primary/20 resize-none dark:bg-zinc-800/50 dark:border-zinc-700 dark:text-zinc-50 dark:placeholder-zinc-400"
              rows={6}
            />

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={handleSubmit}
              className="w-full mt-4 py-3 bg-primary text-white rounded-xl font-medium hover:bg-primary-dark transition-colors flex items-center justify-center gap-2"
            >
              <i className="ri-send-plane-fill"></i>
              Submit Review
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Toast Message */}
      <AnimatePresence>
        {showToast.show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2"
          >
            <i className="ri-checkbox-circle-line"></i>
            {showToast.message}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Popup Message */}
      <AnimatePresence>
        {popupMessage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-xl max-w-md mx-4"
            >
              <div className="text-center">
                <div className="w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                  <i className="ri-error-warning-line text-3xl text-red-600 dark:text-red-400"></i>
                </div>
                <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-6">{popupMessage}</p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setPopupMessage(null)}
                  className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  Got it
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ReviewsCard;
