import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const Forgetpass = () => {
  // Access email passed from login page (if available)
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");

  // Step 1: Send reset code to email
  const handleSendCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://waseet.runasp.net/api/auth/forgot-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (response.ok) {
        alert("Code sent to your email.");
        setStep(2); // Move to next step
      } else {
        const error = await response.json();
        alert(error.message || "Something went wrong.");
      }
    } catch {
      alert("Network error.");
    }
  };

  // Step 2: Verify the code
  const handleVerifyCode = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://waseet.runasp.net/api/auth/verify-reset-code", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, code }),
      });

      if (response.ok) {
        const result = await response.json();
        setResetToken(result.resetToken);
        alert("Code verified. Now set your new password.");
        setStep(3); // Move to next step
      } else {
        const error = await response.json();
        alert(error.message || "Invalid code.");
      }
    } catch {
      alert("Network error.");
    }
  };

  // Step 3: Submit new password using the reset token
  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://waseet.runasp.net/api/auth/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          Token: resetToken,
          newpassword: newPassword,
        }),
      });

      if (response.ok) {
        alert("Password reset successful. Redirecting to login...");
        navigate("/login");
      } else {
        const error = await response.json();
        alert(error.message || "Failed to reset password.");
      }
    } catch {
      alert("Network error.");
    }
  };

  return (
    <section className="relative h-screen flex items-center justify-center bg-primary/5 dark:bg-zinc-900 overflow-hidden">
      {/* Background SVG Wave (Same as login) */}
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

      {/* Main form card */}
      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
        className="max-w-sm bg-white shadow p-8 rounded-md dark:bg-zinc-800 z-10"
      >
        <h2 className="text-2xl text-center font-bold dark:text-white">
          {step === 1 && "Forgot Password"}
          {step === 2 && "Verify Code"}
          {step === 3 && "Set New Password"}
        </h2>

        <form
          onSubmit={
            step === 1
              ? handleSendCode
              : step === 2
              ? handleVerifyCode
              : handleResetPassword
          }
          className="space-y-5 pt-8"
        >
          {/* Step 1: Email input */}
          {step === 1 && (
            <input
              className="w-full bg-primary-light px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-white"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          )}

          {/* Step 2: Code input */}
          {step === 2 && (
            <input
              className="w-full bg-primary-light px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-white"
              type="text"
              placeholder="Enter verification code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              required
            />
          )}

          {/* Step 3: New password input */}
          {step === 3 && (
            <input
              className="w-full bg-primary-light px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-white"
              type="password"
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          )}

          {/* Submit button */}
          <button
            type="submit"
            className="w-full bg-primary text-white py-3 font-medium rounded-md transition-all duration-200"
          >
            {step === 1 && "Send Code"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Reset Password"}
          </button>

          {/* Back to login link */}
          <div className="text-center pt-3">
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
