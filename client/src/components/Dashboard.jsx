import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

import InputTodo from "./todolist/InputTodo";
import ListTodo from "./todolist/ListTodo";

const Dashboard = ({ setAuth }) => {
  const [name, setName] = useState("");
  const [todoList, setTodoList] = useState([]);
  const [watchTodos, setWatchTodos] = useState(false);

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log("Dashboard ", parseRes)

      setName(parseRes[0].user_name);
      setTodoList(parseRes);

    } catch (error) {
      console.error(error.message);
    }
  }

  const logout = (e) => {
    e.preventDefault();
    localStorage.removeItem("token");
    setAuth(false);
    toast.info(`Logged out`);
  };

  useEffect(() => {
    getName();
    setWatchTodos(false);
  }, [watchTodos]);

  return (
    <>
      <div className="d-flex justify-content-end">
        <button className="btn btn-warning" onClick={logout}>
          Logout
        </button>
      </div>
      <h2 className="display-5 text-center">{name}'s todo list</h2>
      <InputTodo setWatchTodos={setWatchTodos} />
      <ListTodo data={todoList} setWatchTodos={setWatchTodos}/>
    </>
  );
};

export default Dashboard;
