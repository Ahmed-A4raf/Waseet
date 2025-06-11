import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const Register = () => {
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [registerUser, { isLoading }] = useRegisterUserMutation();
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match");
      return;
    }
    setMessage("");

    const data = {
      displayName,
      email,
      password,
      role,
      phoneNumber,
    };
    try {
      await registerUser(data).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setMessage(error.data?.message || "Registration failed");
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
        whileInView={"show"}
        viewport={{ once: true, amount: 0.7 }}
        className="relative w-full max-w-md bg-white/80 backdrop-blur-xl dark:bg-zinc-800/80 p-8 rounded-2xl shadow-2xl shadow-primary/10"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-primary text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
          Welcome to Waseet
        </div>

        <h2 className="text-3xl text-center font-bold mt-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Create Account
        </h2>

        <form onSubmit={handleRegister} className="space-y-4 mt-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type="text"
                placeholder="Full Name"
                required
              />
              <i className="ri-user-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>

            <div className="relative">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type="email"
                placeholder="Email Address"
                required
              />
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>

            <div className="relative">
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type="number"
                placeholder="Phone Number"
                required
              />
              <i className="ri-phone-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>

            <div className="relative">
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type={showPassword ? "text" : "password"}
                placeholder="Password"
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

            <div className="relative">
              <input
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
              />
              <i className="ri-lock-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-primary transition-colors"
              >
                {showConfirmPassword ? (
                  <i className="ri-eye-off-line"></i>
                ) : (
                  <i className="ri-eye-line"></i>
                )}
              </button>
            </div>
          </div>

          <div className="flex justify-center gap-4 p-2">
            {["admin", "serviceProvider", "customer"].map((roleOption) => (
              <label
                key={roleOption}
                className="relative cursor-pointer flex items-center group"
              >
                <input
                  onChange={() => setRole(roleOption)}
                  checked={role === roleOption}
                  value={roleOption}
                  className="sr-only peer"
                  type="radio"
                  name="role"
                />
                <div className="w-4 h-4 border-2 border-primary/30 rounded-full peer-checked:border-primary peer-checked:bg-primary transition-all duration-300"></div>
                <span className="ml-2 text-sm text-gray-600 peer-checked:text-primary capitalize group-hover:text-primary transition-colors dark:text-zinc-400">
                  {roleOption}
                </span>
              </label>
            ))}
          </div>

          {message && (
            <p className="text-red-500 text-center text-sm bg-red-100 dark:bg-red-900/30 py-2 rounded-lg">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-medium 
            hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 
            active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Registering...
              </span>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-zinc-400">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
          >
            Sign in
          </Link>
        </p>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-full border-t border-gray-300 dark:border-zinc-700"></div>
          <div className="relative bg-white dark:bg-zinc-800 px-4 text-sm text-gray-500 dark:text-zinc-400">
            Or continue with
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {["google", "facebook", "instagram", "tiktok"].map((platform) => (
            <button
              key={platform}
              className="flex items-center justify-center p-2 rounded-xl bg-white/50 dark:bg-zinc-900/50 
              hover:bg-primary hover:text-white transform hover:-translate-y-0.5 
              transition-all duration-300 group border border-primary/20"
            >
              <i className={`ri-${platform}-fill text-xl group-hover:scale-110 transition-transform`}></i>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
