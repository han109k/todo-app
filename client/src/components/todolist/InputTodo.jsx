import React, { useState } from "react";
import { useGlobalContext } from "../../context/TodoProvider";

const InputTodo = () => {
  const { dispatch } = useGlobalContext();
  const [description, setDescription] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const customHeaders = new Headers(); // fetch API

      customHeaders.append("Content-Type", "application/json");
      customHeaders.append("token", localStorage.token);

      const body = { description };
      console.log(body);
      const response = await fetch("http://localhost:3001/dashboard/todos", {
        method: "POST",
        headers: customHeaders,
        body: JSON.stringify(body),
      });

      console.log(response);

      // setWatchTodos(true);
      dispatch({ type: "WATCH", payload: true });
    } catch (error) {
      console.error(error.message);
    }
    setDescription("");
  };

  return (
    <div className="container">
      <h1 className="text-center my-5">Your Todo:</h1>
      <form onSubmit={submitForm}>
        <div className="row justify-content-center">
          <div className="col-8">
            <div className="d-flex">
              <input
                className="form-control"
                type="text"
                name=""
                id="input"
                placeholder="type here"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="btn btn-success">Submit</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default InputTodo;
