//this folder fetches from datamuse and checks words and returns outputs
//doesn't have to do with html
//takes constraints we chose and gathers words

//api endpoint
const DATAMUSE_BASE_URL = "https://api.datamuse.com/words";

//build datamuse URL from a query object in constraints folder and limits to ### results
//url wil look like https://api.datamuse.com/words?ml=sound&sp=*ing

function buildDataMuseURL(query, maxResults = 500) {
  const params = new URLSearchParams({
    ...query,
    max: maxResults,
  });
  return `${DATAMUSE_BASE_URL}?${params.toString()}`;
}

//fetch words from datamuse for given constraint
//return array of words

async function fetchWordsForQuery(query) {
  //makes url
  const url = buildDataMuseURL(query);

  try {
    //fetch request
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Datamuse error: ${response.status}`);
    }
    const data = await response.json();

    //datamuse return a word and scoring
    //make into lowercase for consistency reading
    return data
      .filter((item) => /^[a-z]+$/.test(item.word))
      .map((item) => ({
        word: item.word.toLowerCase(),
        score: item.score,
      }));
  } catch (error) {
    console.error("Datamuse fetch failed:", error);
    return [];
  }
}
//export function

module.exports = {
  fetchWordsForQuery,
};
