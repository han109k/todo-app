import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../../context/TodoProvider";

const Register = ({ setAuth }) => {
  const { dispatch } = useGlobalContext();

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { name, email, password };

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });

      // getting JWT token
      const parseRes = await response.json();

      // console.log(parseRes);

      //* Set localStorage to use json web token
      if (parseRes.token) {
        localStorage.setItem("token", parseRes.token);

        dispatch({ type: "AUTH", payload: true });
      } else {
        toast.error(parseRes);
        dispatch({ type: "AUTH", payload: false });
      }
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="container">
      <h1 className="display-3 text-center mt-5">Register</h1>
      <ToastContainer />
      <form onSubmit={onSubmitForm}>
        <div className="row justify-content-center">
          <div className="col-8">
            <label className="form-label" htmlFor="text">
              Name
            </label>
            <input
              className="form-control mb-3"
              type="text"
              name="name"
              value={name}
              onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
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
          </div>
        </div>

        <div className="row justify-content-center">
          <div className="col-8">
            <label className="form-label" htmlFor="text">
              Password
            </label>
            <input
              className="form-control mb-5"
              type="password"
              name="password"
              value={password}
              onChange={(e) =>
                setInputs({ ...inputs, password: e.target.value })
              }
              required
            />
          </div>
        </div>

        <div className="text-center">
          <button className="btn btn-success">Register</button>
        </div>
        <div className="text-center">
          <p className="mt-5">Do you have an account? Login instead...</p>
          <Link to="/login">
            <button className="btn btn-primary">Login</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Register;
