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
}

const ongoingDataUpdate = {
  ...initialState,

  // middleware:
  start: (req, res, next) => {
    if (this.isActive) {
      logger.error(`unable to ${req.method} "${req.path}", a different data update is currently in progress: ${this.route}`);
      return res.status(400).json({ message: `A different data update is currently in progress.` });
    }
    this.isActive = true;
    this.route = `${req.method} "${req.path}"`;
    return next();
  },

  end: () => {
    // bring back initalState props values
   for (const prop in initialState) {
     this[prop] = initialState[prop];
   }
  },
}

module.exports = ongoingDataUpdate;
