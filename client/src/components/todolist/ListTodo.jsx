import React, { useState, useEffect } from "react";
import EditToDo from "./EditTodo";

const ListTodo = ({ data, setWatchTodos }) => {
  const [todos, setTodos] = useState([]);

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/dashboard/todos/${id}`, {
        method: "DELETE",
        headers: { token: localStorage.token },
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    setTodos(data);
    console.log(data);
  }, [data]);

  return (
    <>
      <table className="table table-light table-striped mt-5">
        <thead>
          <tr>
            <th scope="col">Description</th>
            <th scope="col">Edit</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.length !== 0 &&
            todos[0].todo_id !== null &&
            todos.map((todo) => {
              return (
                <tr key={todo.todo_id}>
                  <td>{todo.description}</td>
                  <td>
                    <EditToDo todo={todo} setWatchTodos={setWatchTodos}/>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteTodo(todo.todo_id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          {/* <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr> */}
        </tbody>
      </table>
    </>
  );
};

export default ListTodo;
