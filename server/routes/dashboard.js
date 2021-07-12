const router = require("express").Router();
const db = require("../db");
const authorize = require("../middleware/authorization");

router.get("/", authorize, async (req, res) => {
  try {
    // req.user has payload
    // res.json(req.user);

    // SQL Alias: user as u
    const user = await db.query(
      "SELECT u.user_name, t.todo_id, t.description, t.entry_date FROM users AS u LEFT JOIN todos as t ON u.user_id = t.user_id WHERE u.user_id = $1",
      [req.user.id]
    );

    console.log(user.rows);

    res.json(user.rows);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

// ROUTES

//* Create a todo
router.post("/todos", authorize, async (req, res) => {
  try {
    console.log(req.body);
    const { description } = req.body;
    const newTodo = await db.query(
      "INSERT INTO todos (user_id, description) VALUES ($1, $2) RETURNING *",
      [req.user.id, description]
    );

    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//* Update a todo
router.put("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateTodo = await db.query(
      "UPDATE todos SET description = $1 WHERE todo_id = $2 AND user_id = $3 RETURNING *",
      [description, id, req.user.id]
    );

    if (updateTodo.rows.length === 0) {
      return res.json("Editing is unauthorized!");
    }

    console.log("Updated ", updateTodo);
    res.json("Updated");
  } catch (error) {
    console.error(error);
  }
});

//* Delete a todo
router.delete("/todos/:id", authorize, async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await db.query(
      "DELETE FROM todos WHERE todo_id = $1 AND user_id = $2 RETURNING *",
      [id, req.user.id]
    );

    if (deleteTodo.rows.length === 0) {
      return res.json("Deleting is unauthorized!");
    }

    console.log("Deleted ", deleteTodo);
    res.json("Deleted");
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
