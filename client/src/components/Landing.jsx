import React from "react";

const Landing = () => {
  return (
    <div className="container">
      <div className="p-5 mb-4 bg-white rounded-3">
        <div className="container-fluid py-5">
          <h1 className="display-5 fw-bold">Todo App</h1>
          <p className="col-md-8 fs-4">
            Using a series of utilities, you can create this todo list.
          </p>
          <a className="btn btn-primary btn-lg" href="/login">
            Sign In
          </a>
        </div>
      </div>
    </div>
  );
};

export default Landing;
