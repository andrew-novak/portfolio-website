const _ = require("lodash");

const logger = require("../debug/logger");

const initialState = {
  isActive: false,
  route: null,
  buttonFiles: {
    // every file we receive
    totalFilenames: [],
    // files to clean up after failed upload
    // if they are not in successfulFilenames as well
    startedFilenames: [],
    successfulFilenames: [],
    progress: null,
  },
};

// reset only the values included in initialState, but other "target" valuies intact
const bringInitialState = (target, initialState) => {
  for (const prop in initialState) {
    // array or object
    if (typeof initialState[prop] === "object" && initialState[prop] !== null) {
      target[prop] = Array.isArray(initialState[prop])
        ? [...initialState[prop]]
        : { ...initialState[prop] };
      // recursively copy nested structures
      bringInitialState(target[prop], initialState[prop]);
    }
    // primitives
    else {
      target[prop] = initialState[prop];
    }
  }
};

const ongoingDataUpdate = {
  ...initialState,

  // middleware:
  start: function (req, res, next) {
    if (this.isActive) {
      logger.error(
        `unable to ${req.method} "${req.path}", a different data update is currently in progress: ${this.route}`
      );
      return res
        .status(400)
        .json({ message: `A different data update is currently in progress.` });
    }
    this.isActive = true;
    this.route = `${req.method} "${req.path}"`;
    return next();
  },

  end: function () {
    bringInitialState(this, initialState);
  },
};

ongoingDataUpdate.start = ongoingDataUpdate.start.bind(ongoingDataUpdate);
ongoingDataUpdate.end = ongoingDataUpdate.end.bind(ongoingDataUpdate);

module.exports = ongoingDataUpdate;
