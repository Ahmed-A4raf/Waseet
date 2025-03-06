import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from "../redux/features/auth/authApi";

const Register = () => {
  const [message, setMessage] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(""); 
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("customer");

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
    console.log(data);
    try {
      await registerUser(data).unwrap();
      alert("Registration successful");
      navigate("/login");
    } catch (error) {
      setMessage(error.data?.message || "Registration failed");
    }
  };

  return (
    <section className="h-screen flex items-center justify-center bg-primary/5">
      <div className="max-w-sm shadow bg-white mx-auto p-8 rounded-md">
        <h2 className="text-3xl text-center font-bold pt-5">Create Account</h2>
        <form onSubmit={handleRegister} className="space-y-4 max-w-sm mx-auto pt-8">
          <input
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md"
            type="text"
            placeholder="Full Name"
            required
          />
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md"
            type="email"
            placeholder="Email Address"
            required
          />
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md"
            type="text"
            placeholder="Phone Number (optional)"
          />


          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md"
            type="password"
            placeholder="Password"
            required
          />
          <input
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full bg-primary-light px-5 py-3 rounded-md"
            type="password"
            placeholder="Confirm Password"
            required
          />

          {/* Role Selection */}
          <div className="flex justify-between gap-2 p-1">
            {["admin", "serviceProvider", "customer"].map((roleOption) => (
              <label key={roleOption} className="cursor-pointer flex items-center">
                <input
                  onChange={() => setRole(roleOption)}
                  value={roleOption}
                  className="sr-only peer"
                  type="radio"
                  name="role"
                />
                <div className="w-4 h-4 border-2 rounded-full peer-checked:bg-primary transition"></div>
                <span className="ml-1 text-sm text-gray-500 peer-checked:text-primary capitalize">
                  {roleOption}
                </span>
              </label>
            ))}
          </div>

          {message && <p className="text-red-500">{message}</p>}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full mt-5 bg-primary text-white py-3 rounded-md transition-all duration-200"
          >
            {isLoading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="my-5 text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-primary px-1 hover:underline">
            Sign in
          </Link>
        </p>
      </div>
    </section>
  );
};

export default Register;
