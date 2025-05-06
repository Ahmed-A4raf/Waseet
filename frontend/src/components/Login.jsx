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
        viewport={{ once: true, amount: "some" }}
        className="max-w-sm w-full mx-auto bg-white shadow p-8 rounded-md dark:bg-zinc-800 z-10"
      >
        <h2 className="text-3xl text-center font-bold pt-5 dark:text-zinc-50">
          Sign in
        </h2>
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto pt-8">
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-zinc-50"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            value={email}
            required
          />

          <div className="relative">
            <input
              className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md pr-12 dark:bg-zinc-900 dark:text-zinc-50"
              onChange={(e) => setPassword(e.target.value)}
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              name="password"
              id="password"
              value={password}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-xl text-gray-500 hover:text-primary transition-all duration-300 dark:text-zinc-600"
            >
              {showPassword ? (
                <i className="ri-eye-off-line"></i>
              ) : (
                <i className="ri-eye-line"></i>
              )}
            </button>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="dark:text-zinc-50">
                Remember Me
              </label>
            </div>
            <button
              type="button"
              onClick={() => navigate("/forgetpass", { state: { email } })}
              className="hover:text-primary hover:underline dark:text-zinc-50"
            >
              Forget Password?
            </button>
          </div>

          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="my-5 text-sm text-center dark:text-zinc-400">
          Don't have an account?
          <Link to="/register" className="text-primary px-1 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* Social login OR */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="relative z-10 p-1 text-sm text-white font-bold">
              OR
            </span>
            <span className="absolute w-1/3 h-1/3 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-1/2 h-1/2 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-3/4 h-3/4 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-full h-full rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-full h-full rounded-full bg-primary"></span>
          </div>
        </div>

        {/* Social buttons */}
        <div className="flex items-center justify-center mt-5">
          <ul className="flex items-center gap-4">
            {["google-fill", "facebook-fill", "instagram-fill", "tiktok-fill"].map((icon) => (
              <li key={icon}>
                <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                  <i className={`ri-${icon}`}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
