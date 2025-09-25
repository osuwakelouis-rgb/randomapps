import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));

// Map department query to correct JSON filename
const departmentFiles = {
  "Computer Science": "Computer_Science.json",
  Biology: "Biology.json",
  "Med-Lab": "Med-Lab.json",
  "Mechanical Engineering": "Mechanical_Engineering.json",
  Philosophy: "Philosophy.json",
  Sociology: "Sociology.json",
};

export const getPastQuestions = (req, res) => {
  const { department, level, course, year } = req.query;

  if (!department || !level || !course || !year) {
    return res.status(400).json({ message: "Missing query parameters" });
  }

  const fileName = departmentFiles[department];
  if (!fileName) {
    return res.status(404).json({ message: "Department not found" });
  }

  let questionsData;
  try {
    const filePath = join(__dirname, fileName);
    questionsData = JSON.parse(readFileSync(filePath, "utf-8"));
  } catch (err) {
    return res.status(500).json({ message: "Error loading department data" });
  }

  if (
    !questionsData[department] ||
    !questionsData[department][level] ||
    !questionsData[department][level][course] ||
    !questionsData[department][level][course][year]
  ) {
    return res.status(404).json({ message: "Past questions not found" });
  }

  res.json({
    questions: questionsData[department][level][course][year],
  });
};
