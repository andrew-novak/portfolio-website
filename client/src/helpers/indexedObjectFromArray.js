const indexedObjectFromArray = (array) => {
  const object = {};
  array.forEach((value, index) => {
    object[index] = value;
  });
  return object;
};

export default indexedObjectFromArray;
