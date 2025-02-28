import React, { useState } from "react";
import { Link } from "react-router-dom";

const Forgetpass = () => {
  const [email, setEmail] = useState("");

  const handleResetPass = async (e) => {
    e.preventDefault();
    const data = {
      email,
    };
    // console.log(data);
  };
  return (
    <section className="h-screen flex items-center justify-center bg-primary/5">
      <div className="max-w-sm shadow bg-white mx-auto p-8 rounded-md">
        <h2 className="text-3xl text-center font-bold pt-5">
          Reset your password
        </h2>
        <p className="text-center text-gray-700 my-2">
          If the account exist, we will email you instructions to reset the
          password.
        </p>
        <hr />
        <form
          onSubmit={handleResetPass}
          className="space-y-4 max-w-sm mx-auto pt-8"
        >
          <input
            className="w-full bg-primary-light focus:outline-none px-5 py-3 rounded-md"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Email Address"
            name="email"
            id="email"
            required
          />

          <button
            type="submit"
            className="w-full mt-5 bg-primary text-white hover:bg-primary-dark hover:text-white hover:shadow-md hover:shadow-primary hover:-translate-y-2 py-3 font-medium rounded-md transition-all duration-200"
          >
            Reset password
          </button>

          <div className="text-center space-y-2">
            <Link to="/login" className=" text-primary hover:underline">
              Return to login
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Forgetpass;
