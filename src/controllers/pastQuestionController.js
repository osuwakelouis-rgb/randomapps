import { readFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const questionsData = JSON.parse(
  readFileSync(join(__dirname, "questionsData.json"), "utf-8")
);

export const getPastQuestions = (req, res) => {
  const { department, level, course, year } = req.query;
  if (
    !department ||
    !level ||
    !course ||
    !year ||
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
