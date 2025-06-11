import React, { useState } from "react";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const Forgetpass = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const initialEmail = location.state?.email || "";
  const [email, setEmail] = useState(initialEmail);
  const [step, setStep] = useState(1); // 1: Email, 2: Code, 3: New Password
  const [code, setCode] = useState("");
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

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
        setStep(2);
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
        setStep(3);
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
    <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-primary/10 dark:from-zinc-900 dark:to-zinc-800 p-4">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/2 -right-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-1/2 -left-1/2 w-full h-full bg-primary/5 rounded-full blur-3xl"></div>
      </div>

      <motion.div
        variants={fadeIn("up", 0.2)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.7 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl dark:bg-zinc-800/80 p-8 rounded-2xl shadow-2xl shadow-primary/10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
          Password Recovery
        </div>

        <h2 className="text-3xl text-center font-bold mt-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          {step === 1 && "Reset Password"}
          {step === 2 && "Verify Code"}
          {step === 3 && "New Password"}
        </h2>

        <div className="flex justify-center space-x-2 mt-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                s === step
                  ? "bg-primary scale-110"
                  : s < step
                  ? "bg-primary/50"
                  : "bg-gray-300 dark:bg-zinc-700"
              }`}
            />
          ))}
        </div>

        <form
          onSubmit={
            step === 1
              ? handleSendCode
              : step === 2
              ? handleVerifyCode
              : handleResetPassword
          }
          className="space-y-6 mt-8"
        >
          {step === 1 && (
            <div className="relative">
              <input
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>
          )}

          {step === 2 && (
            <div className="relative">
              <input
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type="text"
                placeholder="Enter verification code"
                value={code}
                onChange={(e) => setCode(e.target.value)}
                required
              />
              <i className="ri-shield-keyhole-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>
          )}

          {step === 3 && (
            <div className="relative">
              <input
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type={showPassword ? "text" : "password"}
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
              <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              >
                {showPassword ? (
                  <i className="ri-eye-off-line"></i>
                ) : (
                  <i className="ri-eye-line"></i>
                )}
              </button>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-medium 
            hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 
            active:translate-y-0 transition-all duration-300"
          >
            {step === 1 && "Send Code"}
            {step === 2 && "Verify Code"}
            {step === 3 && "Reset Password"}
          </button>

          <Link
            to="/login"
            className="block text-center text-primary hover:text-primary-dark transition-colors text-sm mt-4"
          >
            Back to Login
          </Link>
        </form>
      </motion.div>
    </section>
  );
};

export default Forgetpass;
