const { Schema, model } = require("mongoose");

const IntroSchema = new Schema({
  text: String,
  colors: [String],
  imageFilename: String,
});

const Intro = model("Intro", IntroSchema);

module.exports = Intro;
