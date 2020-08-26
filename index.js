const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middleware
app.use(cors());
app.use(express.json());

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

//create a To Do

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newToDo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.json(newToDo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all To Do

app.get("/todos", async (req, res) => {
  try {
    const allToDos = await pool.query("SELECT * FROM todo");
    res.json(allToDos.rows);
  } catch (error) {
    console.error(error.message);
  }
});

//get a To Do

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const toDo = await pool.query("SELECT * FROM todo WHERE TODO_ID = $1", [
      id,
    ]);
    res.json(toDo.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//update a To Do
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const updateToDo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );
    res.json("To Do was updated");
  } catch (error) {
    console.error(error.message);
  }
});
//delete a To Do

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleteToDo = await pool.query("DELETE FROM todo WHERE TODO_ID = $1", [
      id,
    ]);
    res.json("To Do was deleted");
  } catch (error) {
    console.error(error.message);
  }
});
