//label - poetic meaning
//query - for the api
//different themes of words
//a bunch of selection for random replayability
//ml is words relating to a word

const rowConstraints = [
  { id: "ml_sound", label: "sound", query: { ml: "sound" } },
  { id: "ml_movement", label: "movement", query: { ml: "movement" } },
  { id: "ml_touch", label: "touch", query: { ml: "touch" } },
  { id: "ml_emotion", label: "emotion", query: { ml: "emotion" } },
  { id: "ml_texture", label: "texture", query: { ml: "texture" } }
];

module.exports = rowConstraints;
