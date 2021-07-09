import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };

      const response = await fetch("http://localhost:3001/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      const parseRes = await response.json();

      // console.log("Parsed token: ", parseRes);

      if (parseRes.token) {
        //* Set localStorage to use json web token
        localStorage.setItem("token", parseRes.token);

        toast.success(`Welcome back!`);
        setAuth(true);
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="display-3 text-center mt-5">Login</h1>

      <form onSubmit={onSubmitForm}>
        <label className="form-label" htmlFor="text">
          Email
        </label>
        <input
          className="form-control mb-3"
          type="email"
          name="email"
          value={email}
          onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
          required
        />
        <label className="form-label" htmlFor="text">
          Password
        </label>
        <input
          className="form-control mb-3"
          type="password"
          name="password"
          value={password}
          onChange={(e) => setInputs({ ...inputs, password: e.target.value })}
          required
        />
        <div className="text-center">
          <button className="btn btn-success">Login</button>
        </div>
        <div className="text-center">
          <p className="mt-5">Don't have an account? Register now...</p>
          <Link to="/register">
            <button className="btn btn-info">Register</button>
          </Link>
        </div>
      </form>
    </>
  );
};

export default Login;
