import { Router } from "express";
import { protect } from "../middlewares/auth.js";
import {
  listTodos,
  getTodo,
  createTodo,
  updateTodo,
  deleteAllTodos,
  deleteTodo,
} from "../controllers/todo.controller.js";

const router = Router();

router.use(protect); // semua route di bawah ini butuh token
router.get("/", listTodos);
router.get("/:id", getTodo);
router.post("/", createTodo);
router.put("/:id", updateTodo);
router.delete("/", deleteAllTodos)
router.delete("/:id", deleteTodo);

export default router;
