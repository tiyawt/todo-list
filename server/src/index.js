import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();
const app = express();
app.use(express.json());

await connectDB();

app.get("/", (req, res) => res.send("🚀 Server is running!"));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes); //butuh auth

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`✅ Server ready at http://localhost:${PORT}`)
);
