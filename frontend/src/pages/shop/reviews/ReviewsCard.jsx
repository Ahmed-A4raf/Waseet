import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import { motion } from "framer-motion";
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
    <div className="mx-auto p-6 bg-white shadow-md rounded-2xl relative dark:bg-zinc-800">
      <motion.h2
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="text-2xl font-semibold mb-6 text-center dark:text-zinc-50"
      >
        Product Feedback
      </motion.h2>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Reviews Section */}
        <motion.div
          variants={fadeIn("right", 0.2)}
          initial="hidden"
          whileInView={"show"}
          viewport={{ once: true, amount: 0.7 }}
          className="md:w-1/2"
        >
          <h3 className="text-xl font-semibold mb-4 dark:text-zinc-50">
            Product Reviews
          </h3>
          {paginatedReviews.length === 0 ? (
            <p className="text-gray-500 mb-6 dark:text-zinc-400">
              No reviews yet. Be the first to review this product!
            </p>
          ) : (
            paginatedReviews.map((rev, index) => (
              <div
                key={index}
                className="mb-6 border-b pb-4 dark:border-zinc-600"
              >
                <div className="flex items-center space-x-4 mb-2">
                  {rev.profileImage ? (
                    <img
                      src={rev.profileImage}
                      alt={rev.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center text-primary font-bold text-lg">
                      {rev.name?.charAt(0).toUpperCase()}
                    </div>
                  )}

                  <div className="flex-1">
                    <p className="font-semibold text-primary">{rev.name}</p>
                    <p className="text-sm text-gray-500 dark:text-zinc-400">
                      {new Date(rev.date).toLocaleDateString()}
                    </p>

                    {/* ⭐ Lucide Stars */}
                    <div className="flex items-center mt-1 text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          fill={i < rev.rating ? "#facc15" : "none"}
                          stroke="#facc15"
                        />
                      ))}
                    </div>
                  </div>

                  {rev.userId === user?.id && (
                    <button
                      onClick={() => handleDelete(rev.id)}
                      className="text-red-600 text-xl border-none cursor-pointer hover:text-red-800 dark:text-red-400 dark:hover:text-red-600"
                    >
                      <i className="ri-delete-bin-line"></i>
                    </button>
                  )}
                </div>

                <p className="text-gray-700 mt-2 dark:text-zinc-200">
                  {rev.comment}
                </p>
              </div>
            ))
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              <motion.button
                variants={fadeIn("right", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.7 }}
                className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                <i className="ri-arrow-left-wide-line"></i>
              </motion.button>

              {[...Array(totalPages)].map((_, i) => (
                <motion.button
                  variants={fadeIn("up", 0.2)}
                  initial="hidden"
                  whileInView={"show"}
                  viewport={{ once: true, amount: 0.5 }}
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`p-1 w-10 h-10 mx-1 rounded-full ${
                    currentPage === i + 1
                      ? "bg-primary text-zinc-900"
                      : "bg-white dark:bg-zinc-700"
                  }`}
                >
                  {i + 1}
                </motion.button>
              ))}

              <motion.button
                variants={fadeIn("left", 0.2)}
                initial="hidden"
                whileInView={"show"}
                viewport={{ once: true, amount: 0.7 }}
                className="p-1 w-10 h-10 mx-1 rounded-full bg-gray-200 text-black dark:text-white dark:bg-zinc-900"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                <i className="ri-arrow-right-wide-line"></i>
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
          <h3 className="text-xl font-semibold mb-4 dark:text-zinc-50">
            Your Rating
          </h3>
          <div className="flex space-x-1 mb-4 cursor-pointer text-2xl text-yellow-400">
            {[1, 2, 3, 4, 5].map((star) => (
              <Star
                key={star}
                onClick={() => setRating(star)}
                size={24}
                fill={star <= rating ? "#facc15" : "none"}
                stroke="#facc15"
                className="cursor-pointer"
              />
            ))}
          </div>

          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your thoughts about this product..."
            className="w-full focus:outline-primary bg-primary-light border px-5 py-3 resize-y min-h-36 max-h-80 rounded-md dark:bg-zinc-800 dark:text-zinc-50 dark:border-zinc-600 dark:focus:outline-zinc-800"
            rows={5}
          />

          <button
            onClick={handleSubmit}
            className="w-full mt-4 px-6 py-2 bg-primary text-white rounded-md hover:bg-primary-dark transition-all"
          >
            Submit Review
          </button>
        </motion.div>
      </div>

      {/* Toast Message */}
      {showToast.show && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300 z-50">
          {showToast.message}
        </div>
      )}

      {/* Popup Message */}
      {popupMessage && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white text-center p-6 rounded-xl shadow-xl max-w-xs">
            <p className="text-red-600 font-semibold mb-4">{popupMessage}</p>
            <button
              onClick={() => setPopupMessage(null)}
              className="bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewsCard;
