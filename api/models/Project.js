const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  id: Number,
  position: Number,
  title: String,
  description: String,
  colors: [String],
  mediaFilenames: [String],
});

ProjectSchema.statics.getNextId = async function () {
  // const [project] = await this.model("Project").find(....
  const [project] = await this.find().sort({ id: "desc" }).limit(1).exec();
  const nextId = project ? project.id + 1 : 0;
  return nextId;
};

ProjectSchema.statics.getNextPosition = async function () {
  // const [project] = await this.model("Project").find(....
  const [project] = await this.find()
    .sort({ position: "desc" })
    .limit(1)
    .exec();
  const nextPosition = project ? project.position + 1 : 0;
  return nextPosition;
};

const Project = model("Project", ProjectSchema);

module.exports = Project;
