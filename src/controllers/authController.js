// Example using in-memory users array. Replace with DB logic in production.
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const users = []; // In-memory user store

export const register = async (req, res) => {
  const { email, password } = req.body;
  // Check if user already exists
  const existingUser = users.find((user) => user.email === email);
  if (existingUser) {
    return res.status(400).json({ message: "User already exists" });
  }
  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const user = { email, password: hashedPassword };
  users.push(user);
  res.status(201).json({ message: "User registered successfully" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  // Find user
  const user = users.find((user) => user.email === email);
  if (!user) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // Compare password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid credentials" });
  }
  // Generate JWT token
  const token = jwt.sign({ email: user.email }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.json({ token });
};
