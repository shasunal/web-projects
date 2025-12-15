//creates rows and columns with the constraints we have

//import constraints 
const rowConstraints = require("../constraints/rowConstraints");
const colConstraints = require("../constraints/colConstraints");

//every constraint required to be cached
//uses highest words tto be prefilled I made it biggerFseed
//the words were just being used over and over again
const {
  ensureConstraintCached,
  getTopWords
} = require("../cache/wordCache");
//grid size
const GRID_SIZE = 4;
//
function pickRandom(array, count) {
  const copy = [...array];
  const selected = [];

  while (selected.length < count && copy.length > 0) {
    const index = Math.floor(Math.random() * copy.length);
    selected.push(copy.splice(index, 1)[0]);
  }

  return selected;
}
//random row and col
function randomCell() {
  return {
    row: Math.floor(Math.random() * GRID_SIZE),
    col: Math.floor(Math.random() * GRID_SIZE)
  };
}
//randomize row and column
async function generatePuzzle() {
  // select constraints
  const selectedRows = pickRandom(rowConstraints, GRID_SIZE);
  const selectedCols = pickRandom(colConstraints, GRID_SIZE);

  // cache all constraints so we don't keep calling datamuse
  //if we keep calling the match results may change 
  const allConstraints = [...selectedRows, ...selectedCols];
  for (const constraint of allConstraints) {
    await ensureConstraintCached(constraint);
  }

  // prefilled words in the grid
  const prefilled = [];
  const usedCells = new Set();

  //prefill with using top 20 scoring words so users cam have hints
 function preConstraint(constraint) {
    const topWords = getTopWords(constraint.id, 20);
    if (topWords.length === 0) return;

    //random empty cell
    let cell;
    do {
      cell = randomCell();
    } while (usedCells.has(`${cell.row},${cell.col}`));
//mark the cell as used
    usedCells.add(`${cell.row},${cell.col}`);
//choose random word from the 20 top scoring
    const chosen =
      topWords[Math.floor(Math.random() * topWords.length)];
//enter the prefilled words into the grid
    prefilled.push({
      row: cell.row,
      col: cell.col,
      word: chosen.word
    });
  }

  //prefill 1 word
  selectedRows.forEach(preConstraint);
  selectedCols.forEach(preConstraint);

  // return puzzle with label
  return {
    size: GRID_SIZE,
    rows: selectedRows.map(({ id, label }) => ({ id, label })),
    cols: selectedCols.map(({ id, label }) => ({ id, label })),
    prefilled
  };
}

module.exports = {
  generatePuzzle
};