import mongoose from "mongoose";

const todoSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: String,
    dueDate: Date,
    status: { type: String, enum: ["pending", "done"], default: "pending" },
  },
  { timestamps: true }
);

export default mongoose.model("Todo", todoSchema);
