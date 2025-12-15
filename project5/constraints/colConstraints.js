// these do not do front end or fetch data or anything it is just rules of words
//these are more literal similarities of words
//a bunch of selection for random replayability
//sp and ml are for datamuse query parameters
//sp = words that match a spelling pattern


const colConstraints = [
  { id: "ml_person", label: "person", query: { ml: "person" } },
  { id: "ml_place", label: "place", query: { ml: "place" } },
  { id: "ml_object", label: "object", query: { ml: "object" } },
  { id: "ml_body", label: "body", query: { ml: "body" } },
  { id: "ml_animal", label: "animal", query: { ml: "animal" } },
  { id: "ml_nature", label: "nature", query: { ml: "nature" } }
];

module.exports = colConstraints;
