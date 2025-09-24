import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import pastQuestionsRoutes from "./routes/pastQuestions.js";

const app = express();

// Enable CORS for all origins
app.use(cors());

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/pastquestions", pastQuestionsRoutes);

// Root route
app.get("/", (req, res) => {
  res.send("hello guys");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

export default app;
