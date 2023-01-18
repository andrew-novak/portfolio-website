const { Schema, model } = require("mongoose");

const ProjectSchema = new Schema({
  id: Number,
  order: Number,
  title: String,
  description: String,
  mediaFilenames: [String],
});

ProjectSchema.statics.getNextId = async function () {
  // const [project] = await this.model("Project").find(....
  const [project] = await this.find().sort({ id: "desc" }).limit(1).exec();
  const nextId = project ? project.id + 1 : 0;
  return nextId;
};

ProjectSchema.statics.getNextOrder = async function () {
  // const [project] = await this.model("Project").find(....
  const [project] = await this.find().sort({ order: "desc" }).limit(1).exec();
  const nextOrder = project ? project.order + 1 : 0;
  return nextOrder;
};

const Project = model("Project", ProjectSchema);

module.exports = Project;
