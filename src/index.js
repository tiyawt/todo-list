import express from "express";
import dotenv from "dotenv";
import fs from "fs";
import yaml from "yaml";
import swaggerUi from "swagger-ui-express";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.routes.js";
import todoRoutes from "./routes/todo.routes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const specPath = path.join(__dirname, "../openapi.yaml");
const spec = yaml.parse(fs.readFileSync(specPath, "utf8"));

const app = express();

app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));


app.use(express.json());
app.use("/docs", swaggerUi.serve, swaggerUi.setup(spec, { explorer: true }));

// DB connect
await connectDB();

app.get("/", (req, res) => res.send("🚀 Server is running!"));
app.use("/api/auth", authRoutes);
app.use("/api/todos", todoRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Server ready at http://localhost:${PORT}`);
  console.log(`📚 Swagger docs at http://localhost:${PORT}/docs`);
});