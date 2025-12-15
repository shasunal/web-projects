//does the inputed word belong at the intersection of row and col
//server.js calls validator sends back that words intersect

const { getWordSet } = require("../cache/wordCache");

//can only read words
//only lowercase
function checkWord(word) {
  return word
    .toLowerCase()
    .trim();
}

async function validateWord(word, rowConstraintId, colConstraintId) {
    //the word is ready to go
const checked = checkWord(word);

  //aviods empty input
  if (!checked) {
    return { valid: false };
  }

  //retrieve cached word sets
  const rowSet = getWordSet(rowConstraintId);
  const colSet = getWordSet(colConstraintId);

//check if something went wrong
  if (!rowSet || !colSet) {
    return { valid: false };
  }

  //row and column intersect
  const rowMatch = rowSet.has(checked);
  const colMatch = colSet.has(checked);


  return {
    valid: rowMatch && colMatch,
    rowMatch,
    colMatch
  };
}
//export
module.exports = {
  validateWord
};