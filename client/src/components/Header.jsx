import React from "react";
import { ToastContainer, toast } from "react-toastify";
import { useGlobalContext } from "../context/TodoProvider";

const Header = () => {

  const { name, dispatch } = useGlobalContext();

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    dispatch({ type: "AUTH-FALSE" });
    toast.info(`Logged out`);
  };

  return (
    <header className="container py-3 mb-4 border-bottom">
      <div className="row">
        <div className="col-11 d-flex">
          <a
            href="/"
            className="text-dark text-decoration-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="35"
              height="35"
              fill="currentColor"
              className="bi bi-check2-square me-3 mb-3"
              viewBox="0 0 16 16"
            >
              <path d="M3 14.5A1.5 1.5 0 0 1 1.5 13V3A1.5 1.5 0 0 1 3 1.5h8a.5.5 0 0 1 0 1H3a.5.5 0 0 0-.5.5v10a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V8a.5.5 0 0 1 1 0v5a1.5 1.5 0 0 1-1.5 1.5H3z" />
              <path d="m8.354 10.354 7-7a.5.5 0 0 0-.708-.708L8 9.293 5.354 6.646a.5.5 0 1 0-.708.708l3 3a.5.5 0 0 0 .708 0z" />
            </svg>
            <span className="fs-3"><h1 className="d-inline">Todo App</h1></span>
          </a>
        </div>
        <div className="col-1 my-auto">
          {name !== '' && <button className="btn btn-sm btn-warning ms-auto" onClick={logout}>Logout</button>}
        </div>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
      />

    </header>
  );
};

export default Header;
