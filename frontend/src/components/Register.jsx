import React, { useState } from "react";
import { Link, Navigate } from "react-router-dom";

const Register = () => {
  const [massage, setMassage] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleRegister = async (e) => {
    e.preventDefault();
    const form = e.target;
    // console.log(form)
    const email = form.email.value;
    const password = form.password.value;
    const confirmPassword = form.confirmPassword.value;
    console.log(email, password, confirmPassword);
    if(password !== confirmPassword){
      setMassage("Please check your password, It doesn't match");
    }else{
      setMassage("");
    //   alredy exist

    }
    const data = {
        name,
        email,
        password,
        confirmPassword,
      };
    // console.log(data)
  };
   
    
  return (
    <section className="h-screen flex items-center justify-center bg-primary/5">
      <div className="max-w-sm shadow bg-white mx-auto p-8 rounded-md">
        <h2 className="text-3xl text-center font-bold pt-5">Create Account</h2>
        <form
          onSubmit={handleRegister}
          className="space-y-4 max-w-sm mx-auto pt-8"
        >
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md"
            onChange={(e) => setName(e.target.value)}
            type="name"
            placeholder="Full Name"
            name="name"
            id="name"
            required
          />
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            required
          />
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md"
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="Password"
            name="password"
            id="password"
            required
          />
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md"
            onChange={(e) => setConfirmPassword(e.target.value)}
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            id="confirmPassword"
            required
          />

          {/* massage */}
          {massage && <p className="text-red-500">{massage}</p>}

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:text-white hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            Register
          </button>
        </form>
        <p className="my-5 text-sm text-center">
          Already have an account?
          <Link to="/login" className="text-primary px-1 hover:underline">
            Sign in
          </Link>
        </p>

        {/* or */}
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

        {/* social login */}
        <div className="flex items-center justify-center mt-5">
          <ul className="flex items-center gap-4">
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300">
                <i className="ri-google-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300">
                <i className="ri-facebook-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300">
                <i className="ri-instagram-fill"></i>
              </button>
            </li>
            <li>
              <button className="text-primary bg-primary-light text-2xl rounded-full size-10 flex items-center justify-center hover:bg-primary hover:text-white transtion-all duration-300">
                <i className="ri-tiktok-fill"></i>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Register;

