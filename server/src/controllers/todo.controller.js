import Todo from "../models/Todo.js";

// GET /api/todos
export async function listTodos(req, res, next) {
  try {
    const todos = await Todo.find().sort({ createdAt: -1 });
    res.json(todos);
  } catch (err) {
    next(err);
  }
}

// GET /api/todos/:id
export async function getTodo(req, res, next) {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

// POST /api/todos
export async function createTodo(req, res, next) {
  try {
    const { title, description, dueDate } = req.body;
    const todo = await Todo.create({ title, description, dueDate });
    res.status(201).json(todo);
  } catch (err) {
    next(err);
  }
}

// PUT /api/todos/:id
export async function updateTodo(req, res, next) {
  try {
    const todo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!todo) return res.status(404).json({ message: "Not found" });
    res.json(todo);
  } catch (err) {
    next(err);
  }
}

//DELETE ALL /api/todos
export async function deleteAllTodos(req, res, next) {
  try {
    await Todo.deleteMany({});
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}

// DELETE /api/todos/:id
export async function deleteTodo(req, res, next) {
  try {
    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    next(err);
  }
}
