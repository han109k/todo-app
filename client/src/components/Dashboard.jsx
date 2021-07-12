import React, { useEffect } from "react";
import { toast } from "react-toastify";
import { useGlobalContext } from "../context/TodoProvider";

import InputTodo from "./todolist/InputTodo";
import ListTodo from "./todolist/ListTodo";

const Dashboard = () => {
  const { name, todoList, watchTodos, dispatch } = useGlobalContext();

  async function getName() {
    try {
      const response = await fetch("http://localhost:3001/dashboard", {
        method: "GET",
        headers: { token: localStorage.token },
      });

      const parseRes = await response.json();

      console.log("Dashboard ", parseRes);

      dispatch({ type: "GET-INFO", payload: parseRes });
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    getName();
    dispatch({ type: "WATCH", payload: false });
  }, [watchTodos]);

  return (
    <>
      <div className="container">
        <h2 className="display-5 text-center">{name}'s Todo List</h2>
        <InputTodo />
        <ListTodo data={todoList} />
      </div>
    </>
  );
};

export default Dashboard;
