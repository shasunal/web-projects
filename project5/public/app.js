//fetch puzzle 
//render 5x5 grid +1 for the labels
//send user input to be validated/checked
//apply styling
//only check word if it matches after user leaves the cell

//get html elements
const gridContainer = document.getElementById("grid");
//button that load a new puzzle
const newPuzzleBtn = document.getElementById("newPuzzle");

//store all the ids and labels
let currentPuzzle = null;

//get new puzzle with row and col constraints
async function loadPuzzle() {
  //loading message that happens before fetching
  gridContainer.innerHTML = "loading…";

  const response = await fetch("/api/puzzle");
  //backend sends new constraints 
//with rows columns, and prefilled words

  const puzzle = await response.json();
//save the puzzle
  currentPuzzle = puzzle;
 
  renderGrid(puzzle);
}

 //renders 5x5 grid
function renderGrid(puzzle) {
  const { size, rows, cols,prefilled } = puzzle;
//clear previous session
  gridContainer.innerHTML = "";
  // + 1 because grid is actuallt 6x6 counting labels 
  gridContainer.style.gridTemplateColumns = `auto repeat(${size}, 1fr)`;

    //top right corner of the grid leave empty so labels are aligned
  const corner = document.createElement("div");
  corner.className = "corner";
  gridContainer.appendChild(corner);
//load column labels (top row)
  cols.forEach(col => {
    const colLabel = document.createElement("div");
    colLabel.textContent = col.label;
    colLabel.className = "col-label";
    gridContainer.appendChild(colLabel);
  });

  // Loop through rows and columns to create cells
  rows.forEach((row, rowIndex) => {
//load row labels (left side)
    const rowLabel = document.createElement("div");
    rowLabel.textContent = row.label;
    rowLabel.className = "row-label";
    gridContainer.appendChild(rowLabel);

//input cells for the rows
    cols.forEach((col, colIndex) => {
      const input = document.createElement("input");
      input.type = "text";

      // Store constraint IDs on each cell
      //sent to validation to see if words matches
      input.dataset.row = row.id;
      input.dataset.col = col.id;

      //pheck if this cell should be prefilled
      const preset = prefilled?.find(
        p => p.row === rowIndex && p.col === colIndex
      );

      if (preset) {
        //preset words are locked in and already valid
        input.value = preset.word;
        input.disabled = true;
        input.classList.add("valid");
      } else {
        //only validate when the user leaves the cell
        input.addEventListener("blur", () => {
          checkCell(input);
        });
      }

      //Important- append the input to the grid
      gridContainer.appendChild(input);
    });
  });
}

//send user input to be validated
async function checkCell(input) {
  const word = input.value;
//if there is an empty cell, do not make a server call
  if (!word) {
    input.className = "";
    return;
  }
//retrieve the ids
  const rowConstraint = input.dataset.row;
  const colConstraint = input.dataset.col;

  //checks for validation 
  const response = await fetch("/api/validate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      word,
      rowConstraint,
      colConstraint
    })
  });
//the backend will check if the word matches for both row and column
  const result = await response.json();

  input.className = "";
//if the result is valid for both row and col
  if (result.valid) {
    input.classList.add("valid");
  } else if (result.rowMatch || result.colMatch) {
    //if the word fits for only 1 but not the other
    input.classList.add("partial");
  } else {
    //does not fit for either row or col
    input.classList.add("invalid");
  }
}

//button new puzzle
newPuzzleBtn.addEventListener("click", loadPuzzle);

//start
loadPuzzle();