import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-white rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">TODO App</h1>
          <p className="col-md-8 fs-4">
            Start using todo lists to create your work or study program.
          </p>
          <Link to="/login">
            <button className="btn btn-primary btn-lg" type="button">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
