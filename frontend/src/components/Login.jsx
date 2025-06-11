import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";
import { motion } from "framer-motion";
import { fadeIn } from "../utils/animationVariants";

const Login = () => {
  const [message, setMessage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    const data = { email, password };
    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      dispatch(setUser({ user }));
      alert("Login successful");
      navigate("/");

      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    } catch (error) {
      setMessage("Please check your email and password");
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
          Welcome Back
        </div>

        <h2 className="text-3xl text-center font-bold mt-4 bg-gradient-to-r from-primary to-primary-dark bg-clip-text text-transparent">
          Sign in to Waseet
        </h2>

        <form onSubmit={handleLogin} className="space-y-4 mt-8">
          <div className="space-y-4">
            <div className="relative">
              <input
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                placeholder="Email Address"
                name="email"
                id="email"
                value={email}
                required
              />
              <i className="ri-mail-line absolute left-3 top-1/2 -translate-y-1/2 text-primary"></i>
            </div>

            <div className="relative">
              <input
                className="w-full bg-white/50 dark:bg-zinc-900/50 px-5 py-3 rounded-xl outline-none border border-primary/20 focus:border-primary transition-all duration-300 pl-10"
                onChange={(e) => setPassword(e.target.value)}
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                name="password"
                id="password"
                value={password}
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
          </div>

          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 cursor-pointer group">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <span className="text-gray-600 group-hover:text-primary transition-colors dark:text-zinc-400">
                Remember Me
              </span>
            </label>
            <button
              type="button"
              onClick={() => navigate("/forgetpass", { state: { email } })}
              className="text-primary hover:text-primary-dark transition-colors"
            >
              Forgot Password?
            </button>
          </div>

          {message && (
            <p className="text-red-500 text-center text-sm bg-red-100 dark:bg-red-900/30 py-2 rounded-lg">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-primary to-primary-dark text-white py-3 rounded-xl font-medium 
            hover:shadow-lg hover:shadow-primary/20 transform hover:-translate-y-0.5 
            active:translate-y-0 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loginLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Signing in...
              </span>
            ) : (
              "Sign in"
            )}
          </button>
        </form>

        <p className="mt-6 text-sm text-center text-gray-600 dark:text-zinc-400">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="text-primary font-medium hover:underline hover:text-primary-dark transition-colors"
          >
            Create Account
          </Link>
        </p>

        <div className="relative flex items-center justify-center my-6">
          <div className="absolute w-full border-t border-gray-300 dark:border-zinc-700"></div>
          <div className="relative bg-white dark:bg-zinc-800 px-4 text-sm text-gray-500 dark:text-zinc-400">
            Or continue with
          </div>
        </div>

        <div className="grid grid-cols-4 gap-3">
          {["google-fill", "facebook-fill", "instagram-fill", "tiktok-fill"].map((icon) => (
            <button
              key={icon}
              className="flex items-center justify-center p-2 rounded-xl bg-white/50 dark:bg-zinc-900/50 
              hover:bg-primary hover:text-white transform hover:-translate-y-0.5 
              transition-all duration-300 group border border-primary/20"
            >
              <i className={`ri-${icon} text-xl group-hover:scale-110 transition-transform`}></i>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
