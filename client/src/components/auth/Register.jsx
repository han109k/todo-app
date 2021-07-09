import React, { useState } from "react";
import {Link} from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Register = ({setAuth}) => {
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { email, password, name } = inputs;

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {

      const body = {name, email, password}

      const response = await fetch("http://localhost:3001/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body)
      });
      
      // getting JWT token
      const parseRes = await response.json();

      // console.log(parseRes);

      //* Set localStorage to use json web token
      if(parseRes.token) {
        localStorage.setItem("token", parseRes.token);
        
        setAuth(true);
      } else {
        toast.error(parseRes);
        setAuth(false);
      }
      
      

    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <>
      <h1 className="display-3 text-center mt-5">Register</h1>
      <ToastContainer />
      <form onSubmit={onSubmitForm}>
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
          <button className="btn btn-success">Register</button>
        </div>
        <div className="text-center">
          <p className="mt-5">Do you have an account? Login instead...</p>
          <Link to="/login"><button className="btn btn-primary">Login</button></Link>
        </div>
      </form>
    </>
  );
};

export default Register;
