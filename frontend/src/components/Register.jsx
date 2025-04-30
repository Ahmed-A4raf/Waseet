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
    <section className="relative h-screen flex items-center justify-center bg-primary/5 dark:bg-zinc-900 overflow-hidden">
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
        viewport={{ once: true, amount: 0.7 }}
        className="max-w-sm shadow bg-white mx-auto p-8 rounded-md z-10 dark:bg-zinc-800"
      >
        <h2 className="text-3xl text-center font-bold pt-5 dark:text-zinc-50">
          Create Account
        </h2>
        <form
          onSubmit={handleRegister}
          className="space-y-4 max-w-sm mx-auto pt-8"
        >
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md outline-none dark:bg-zinc-900 dark:text-zinc-50"
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md outline-none dark:bg-zinc-900 dark:text-zinc-50"
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md outline-none dark:bg-zinc-900 dark:text-zinc-50"
            type="number"
            required
            placeholder="Phone Number"
          />

          {/* Password */}
          <div className="relative">
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-primary-light px-5 py-3 rounded-md outline-none dark:bg-zinc-900 dark:text-zinc-50"
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-zinc-400"
            >
              {showPassword ? (
                <i className="ri-eye-off-line"></i>
              ) : (
                <i className="ri-eye-line"></i>
              )}
            </button>
          </div>

          {/* Confirm Password */}
          <div className="relative">
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full bg-primary-light px-5 py-3 rounded-md outline-none dark:bg-zinc-900 dark:text-zinc-50"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-zinc-400"
            >
              {showConfirmPassword ? (
                <i className="ri-eye-off-line"></i>
              ) : (
                <i className="ri-eye-line"></i>
              )}
            </button>
          </div>

          {/* Role Selection */}
          <div className="flex justify-between gap-2 p-1">
            {["admin", "serviceProvider", "customer"].map((roleOption) => (
              <label
                key={roleOption}
                className="cursor-pointer flex items-center"
              >
                <input
                  onChange={() => setRole(roleOption)}
                  value={roleOption}
                  className="sr-only peer"
                  type="radio"
                  name="role"
                />
                <div className="w-4 h-4 border-2 rounded-full peer-checked:bg-primary transition"></div>
                <span className="ml-1 text-sm text-gray-500 peer-checked:text-primary capitalize dark:text-zinc-50">
                  {roleOption}
                </span>
              </label>
            ))}
          </div>

          {message && <p className="text-red-500">{message}</p>}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:text-white hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="my-5 text-sm text-center dark:text-zinc-400">
          Already have an account?
          <Link to="/login" className="text-primary px-1 hover:underline">
            Sign in
          </Link>
        </p>

        {/* OR + Social Buttons */}
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

        <div className="flex items-center justify-center mt-5">
          <ul className="flex items-center gap-4">
            {["google", "facebook", "instagram", "tiktok"].map((platform) => (
              <li key={platform}>
                <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transition-all duration-300 dark:bg-zinc-900 hover:dark:bg-primary hover:dark:text-zinc-900">
                  <i className={`ri-${platform}-fill`}></i>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default Register;
