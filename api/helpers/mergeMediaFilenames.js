const mergeMediaFilenames = (oldFilenames, newFilenames) => {
  const length = Math.max(oldFilenames.length, newFilenames.length);
  const emptyArray = new Array(length).fill(null);
  const mergedFilenames = emptyArray.map((ignore, index) => {
    const old = oldFilenames[index];
    const neww = newFilenames[index];
    if (old && neww)
      throw new Error(
        "Media Filenames Merge Error - old and new filenames try to take same index in array"
      );
    if (old) {
      return old;
    }
    if (neww) return neww;
    throw new Error(
      "Media Filenames Merge Error - no filename for index in array"
    );
  });
  return mergedFilenames;
};

module.exports = mergeMediaFilenames;
