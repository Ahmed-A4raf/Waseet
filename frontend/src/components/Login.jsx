import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../redux/features/auth/authApi";
import { setUser } from "../redux/features/auth/authSlice";

const Login = () => {
  const [massage, setMassage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const disptach = useDispatch();
  const [loginUser, { isLoading: loginLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  // Retrieve email from localStorage on component mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem("rememberedEmail");
    if (rememberedEmail) {
      setEmail(rememberedEmail);
      setRememberMe(true);
    }
  }, []);

  // Handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    const data = {
      email,
      password,
    };
    try {
      const response = await loginUser(data).unwrap();
      const { token, user } = response;
      disptach(setUser({ user }));
      alert("Login successful");
      navigate("/");

      // Save email to localStorage if "Remember Me" is checked
      if (rememberMe) {
        localStorage.setItem("rememberedEmail", email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }
    } catch (error) {
      setMassage("Please check your email and password");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-primary/5 dark:bg-zinc-900">
      <div className="max-w-sm shadow bg-white mx-auto p-8 rounded-md dark:bg-zinc-800">
        <h2 className="text-3xl text-center font-bold pt-5 dark:text-zinc-50">Sign in</h2>
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
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md dark:bg-zinc-900 dark:text-zinc-50"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
          />
          <div className="flex items-center justify-between">
            <div className="space-x-2">
              <input
                type="checkbox"
                name="remember"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
              />
              <label htmlFor="remember" className="dark:text-zinc-50">Remember Me</label>
            </div>
            <Link to="/forgetpass" className="hover:text-primary hover:underline dark:text-zinc-50">
              Forget Password?
            </Link>
          </div>

          {/* Message */}
          {massage && <p className="text-red-500">{massage}</p>}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:text-white hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            Login
          </button>
        </form>
        <p className="my-5 text-sm text-center dark:text-zinc-400">
          Don't have an account?
          <Link to="/register" className="text-primary px-1 hover:underline">
            Sign Up
          </Link>
        </p>

        {/* OR */}
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

        {/* Social Login */}
        <div className="flex items-center justify-center mt-5">
          <ul className="flex items-center gap-4">
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                <i className="ri-google-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                <i className="ri-facebook-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                <i className="ri-instagram-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                <i className="ri-tiktok-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Login;