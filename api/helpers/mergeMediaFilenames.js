const mergeMediaFilenames = (oldFilenames, newFilenames) => {
  const length = Math.max(oldFilenames.length, newFilenames.length);
  const emptyArray = new Array(length).fill(null);
  const mergedFilenames = emptyArray.map((_, index) => {
    const old = oldFilenames[index];
    // "fresh", because "new" is a keyword
    const fresh = newFilenames[index];
    if (old && fresh)
      throw new Error(
        "Media Filenames Merge Error - old and new filenames try to take same index in array"
      );
    if (old) {
      return old;
    }
    if (fresh) return fresh;
    throw new Error(
      "Media Filenames Merge Error - no filename for index in array"
    );
  });
  return mergedFilenames;
};

module.exports = mergeMediaFilenames;
