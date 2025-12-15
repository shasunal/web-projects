// import libraries
const express = require("express");
//cors allows requests from the browser
const cors = require("cors");

//pull other functions in my project
const { generatePuzzle } = require("./services/puzzleGenerator");
const { validateWord } = require("./services/validator");

//Create app
const app = express();
const PORT = 3000;

//middleware that runs before my routes
app.use(cors());
//allows my server to reas json files which I will have for the validation
app.use(express.json());
//use any file in public folder
app.use(express.static("public"));

// Get request for data
app.get("/api/puzzle", async (req, res) => {
  try {
    //selects rows and columns constraint rules
    const puzzle = await generatePuzzle();
    //convert js to json and sends to frontend
    res.json(puzzle);
    //handles errors
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to generate" });
  }
});

//Post 
app.post("/api/validate", async (req, res) => {
    //reads input words
  const { word, rowConstraint, colConstraint } = req.body;
  //prevents bad data from going in
  if (!word || !rowConstraint || !colConstraint) {
    return res.status(400).json({ error: "Missing data" });
  }

  try {
    //checks each row colum word to make sure they are fine
    const result = await validateWord(word, rowConstraint, colConstraint);
    //sends back the results to frontend
    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Validation failed" });
  }
});

//Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
