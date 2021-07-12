import React, { useState, useEffect } from "react";
import EditToDo from "./EditTodo";

const ListTodo = ({ data }) => {
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
    // console.log(data);
  }, [data]);

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-10">
          <table className="table table-hover mt-5">
            <thead>
              <tr className="table-light">
                <th className="text-center" >#</th>
                <th className="text-center" >Description</th>
                <th className="text-center" >Created On</th>
                <th className="text-end pe-5" >Edit</th>
                {/* <th scope="col">Delete</th> */}
              </tr>
            </thead>
            <tbody className="text-center">
              {todos.length !== 0 &&
                todos[0].todo_id !== null &&
                todos.map((todo, index) => {
                  return (
                    <tr key={todo.todo_id}>
                      <td className="table-secondary">{index + 1}</td>
                      <td>{todo.description}</td>
                      <td>{todo.entry_date.slice(0, 10)}</td>
                      <td className="text-end">
                        <EditToDo todo={todo} />
                        <button
                          className="btn btn-sm btn-danger ms-1 py-0"
                          onClick={() => deleteTodo(todo.todo_id)}
                        >
                          Delete
                        </button>
                      </td>
                      {/* <td>

                      </td> */}
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ListTodo;
