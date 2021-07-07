import React, { useState } from "react";

const EditToDo = ({ todo }) => {
  const [description, setDescription] = useState(todo.description);

  const editDescription = async(id) => {
    try {

      const body = {description}

      const res = await fetch(`http://localhost:3001/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify(body)
      });

      console.log(res);
    } catch (error) {
      console.error(error.message);
    }
  }

  return (
    <>
      {/* Button trigger modal */}
      <button
        type="button"
        className="btn btn-sm btn-info"
        data-bs-toggle="modal"
        data-bs-target={`#id${todo.todo_id}`}
      >
        Edit
      </button>

      {/* Modal */}
      <div
        className="modal fade"
        id={`id${todo.todo_id}`}
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="staticBackdropLabel">
                Edit Todo
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <input
                type="text"
                name=""
                id=""
                value={description}
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-sm btn-info"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-sm btn-success"
                onClick={() => editDescription(todo.todo_id)}
                data-bs-dismiss="modal"
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditToDo;