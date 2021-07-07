const express = require("express");
const cors = require("cors");
const db = require("./db");
const app = express();

app.use(cors());
app.use(express.json()); // allows us to access the req.body

// ROUTES

// get all Todos
app.get("/todo", async (req, res) => {
  try {
    const todos = await db.query("SELECT * FROM todo");

    res.json(todos.rows);
  } catch (error) {
    console.log(error.message);
  }
});

//get a todo
app.get("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await db.query("SELECT * FROM todo WHERE todo_id=$1", [id]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// create a todo
app.post("/todo", async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todo (description) VALUES ($1) RETURNING *",
      [description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await db.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    console.log(updateTodo);
    res.json("Updated");
  } catch (error) {
    console.error(error);
  }
});

// delete a todo
app.delete("/todo/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    console.log(deleteTodo);
    res.json("Deleted");
  } catch (error) {
    console.log(error);
  }
});

app.listen(3001, () => {
  console.log("Listening on port : 3001");
});
