const { Schema, model } = require("mongoose");

const IntroSchema = new Schema({
  image: String,
  text: String,
});

const Intro = model("Intro", IntroSchema);

module.exports = Intro;
