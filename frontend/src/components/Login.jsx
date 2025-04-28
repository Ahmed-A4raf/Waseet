import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

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
    <section className="h-screen flex items-center justify-center bg-primary/5 dark:bg-zinc-900">
      <div className="max-w-sm w-full mx-auto bg-white shadow p-8 rounded-md dark:bg-zinc-800">
        <h2 className="text-3xl text-center font-bold pt-5 dark:text-zinc-50">Sign in</h2>
        <form onSubmit={handleLogin} className="space-y-4 max-w-sm mx-auto pt-8">
          {/* Email Input */}
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

          {/* Password Input with Toggle */}
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

          {/* Remember me & Forget password */}
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
            <Link to="/forgetpass" className="hover:text-primary hover:underline dark:text-zinc-50">
              Forget Password?
            </Link>
          </div>

          {/* Error Message */}
          {message && <p className="text-red-500">{message}</p>}

          {/* Login Button */}
          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            {loginLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Sign Up Link */}
        <p className="my-5 text-sm text-center dark:text-zinc-400">
          Don't have an account?
          <Link to="/register" className="text-primary px-1 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* OR Separator */}
        <div className="flex items-center justify-center">
          <div className="relative flex items-center justify-center">
            <span className="relative z-10 p-1 text-sm text-white font-bold">OR</span>
            <span className="absolute w-1/3 h-1/3 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-1/2 h-1/2 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-3/4 h-3/4 rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-full h-full rounded-full bg-primary animate-ping"></span>
            <span className="absolute w-full h-full rounded-full bg-primary"></span>
          </div>
        </div>

        {/* Social Buttons */}
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
      </div>
    </section>
  );
};

export default Login;
