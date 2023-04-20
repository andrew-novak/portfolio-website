const { Schema, Mixed, model } = require("mongoose");

const ProjectSchema = new Schema({
  id: Number,
  position: Number,
  title: String,
  // DraftJS Raw JS Object
  description: {
    blocks: [
      {
        key: String,
        text: String,
        type: Mixed,
        depth: Number,
        inlineStyleRanges: Array,
        entityRanges: Array,
        data: Mixed,
      },
    ],
    entityMap: Mixed,
  },
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

/*
e.g.
an each column below represents a position
4 3 2 1 0
_________
A B C D E - before move(0, 4)
E A B C D - after
  _____
A B C D E - before move(3, 1)
A C D B E - after
*/
ProjectSchema.statics.move = async function (origin, target) {
  if (origin === target) return;

  let isMovingHigher = true;
  if (origin < target) {
  } else if (origin > target) isMovingHigher = false;
  else {
    throw new Error(
      "movePosition error: unable to compare 2 argument positions"
    );
  }

  const projects = await this.find({
    position: isMovingHigher
      ? { $lte: target, $gte: origin }
      : { $lte: origin, $gte: target },
  }).sort({ position: "descending" });

  // make sure origin and target are in db
  // create copy of positions
  let isOriginFound = false;
  let isTargetFound = false;
  const positions = projects.map((project) => {
    if (project.position === origin) isOriginFound = true;
    if (project.position === target) isTargetFound = true;
    return project.position;
  });
  if (!isOriginFound)
    throw new Error("project with passed 'origin' position does not exist");
  if (!isTargetFound)
    throw new Error("project with passed 'target' position does not exist");

  // moving higher
  if (isMovingHigher) {
    projects.forEach((project, index) => {
      project.position =
        index === projects.length - 1 ? positions[0] : positions[index + 1];
    });
  }
  // moving lower
  else {
    projects.forEach((project, index) => {
      project.position =
        index === 0 ? positions[positions.length - 1] : positions[index - 1];
    });
  }

  // save changes
  const promises = projects.map(
    (project) =>
      new Promise(async (resolve, reject) => {
        //project.markModified("position");
        await project.save();
        resolve();
      })
  );
  await Promise.all(promises);
};

const Project = model("Project", ProjectSchema);

module.exports = Project;
