//prevent repetition and stores words in memory
//or else every word will trigger a request to datamuse 
//and results could change each time
//this is for producing consistent results

const { fetchWordsForQuery } = require("../services/datamuse");

//holds cached words in a set and labeled by id
const wordCache = {};


//makes sure that we don't already have the word cached
//if it is not then get them from datamuse
async function ensureConstraintCached(constraint) {
  const { id, query } = constraint;

  //if already cached do nothing
  if (wordCache[id]) {
    return;
  }
  //fetch words for constraint
  const words = await fetchWordsForQuery(query);
  //Store as a new set
   wordCache[id] = words;
}


//get the cached word set that is already stored by the id
function getWordSet(constraintId) {
  const words = wordCache[constraintId];
  if (!words) return null;

  return new Set(words.map(w => w.word));
}
//get top 10 scoring words 
function getTopWords(constraintId) {
 const words = wordCache[constraintId];
  if (!words) return [];

  return words;
}



//export functions
module.exports = {
  ensureConstraintCached,
  getWordSet,
  getTopWords
};
