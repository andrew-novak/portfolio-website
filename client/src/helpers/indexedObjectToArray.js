const isPositiveInteger = (string) => {
  const number = Number(string);
  const isInteger = Number.isInteger(number);
  const isPositive = number >= 0;
  return isInteger && isPositive;
};

const indexedObjectToArray = (object) => {
  const array = [];
  Object.keys(object).forEach((key) => {
    if (!isPositiveInteger(key)) {
      throw new Error(
        `Unable to change the indexed object to an array, the key is not a positive integer string`
      );
    }
    const index = parseInt(key);
    array[index] = object[index];
  });
  return array;
};

export default indexedObjectToArray;
