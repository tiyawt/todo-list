import jwt from "jsonwebtoken";
import User from "../models/User.js";

function signToken(user) {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
}

// REGISTER
export async function register(req, res, next) {
  try {
    const { email, password } = req.body;
    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: "Email already registered" });

    const user = await User.create({ email, password });
    const token = signToken(user);
    res
      .status(201)
      .json({
        token,
        user: { id: user._id, email: user.email, role: user.role },
      });
  } catch (e) {
    next(e);
  }
}

// LOGIN
export async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password)))
      return res.status(401).json({ message: "Invalid credentials" });

    const token = signToken(user);
    res.json({
      token,
      user: { id: user._id, email: user.email, role: user.role },
    });
  } catch (e) {
    next(e);
  }
}
