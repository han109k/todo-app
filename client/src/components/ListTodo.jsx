import React, { useState, useEffect } from "react";
import EditToDo from "./EditTodo";

const ListTodo = () => {
  const [todos, setTodos] = useState([]);
  const [disable, setDisable] = useState("disabled");

  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:3001/todo");
      const todoArray = await response.json();
      console.log(todoArray);
      setTodos(todoArray); 
    } catch (error) {
      console.log(error.message);
    }
  };

  const editTodo = () => {
    setDisable('');
  }

  const deleteTodo = async (id) => {
    try {
      await fetch(`http://localhost:3001/todo/${id}`, {
        method: "DELETE",
      });
      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (error) {
      console.error(error.message);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

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
          {todos &&
            todos.map((todo) => {
              return (
                <tr key={todo.todo_id}>
                  <td>
                    {todo.description}
                  </td>
                  <td>
                    <EditToDo todo={todo}/>
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
