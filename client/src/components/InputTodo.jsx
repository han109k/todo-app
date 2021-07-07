import React, { useState } from "react";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const submitForm = async (e) => {
    e.preventDefault();
    try {
      const body = {description};
      console.log(body);
      const response = await fetch("http://localhost:3001/todo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      console.log(response);
    } catch (error) {
      console.error(error.message);
    }
    setDescription('');
  };

  return (
    <>
      <h1 className="text-center my-5">Input Todo</h1>
      <form onSubmit={submitForm}>
        <div className="d-flex">
          <label className="form-label pt-2" htmlFor="input">
            Todo:
          </label>
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
      </form>
    </>
  );
};

export default InputTodo;
