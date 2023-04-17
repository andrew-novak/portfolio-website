import { PROJECT_SET_POSITION } from "constants/actionTypes";

const swapArrayElements = (passedArray, index1, index2) => {
  const array = [...passedArray];
  const tempItem = array[index1];
  array[index1] = array[index2];
  array[index2] = tempItem;
  return array;
};

const changePosition = (direction, positionIndex, positions) => (dispatch) => {
  let targetIndex;
  // since projects are sorted in descending position by 'position' field
  // index 0 is the highest 'position' value
  if (direction === "next") targetIndex = positionIndex - 1;
  else if (direction === "previous") targetIndex = positionIndex + 1;
  else
    throw new Error(
      "invalid swapPosition direction, expected 'next' or 'previous'"
    );

  // if target index outside of available space
  if (targetIndex < 0 || targetIndex > positions.length - 1) return;

  const newPositions = swapArrayElements(positions, positionIndex, targetIndex);

  const position = newPositions[positionIndex].position;
  newPositions[positionIndex].position = newPositions[targetIndex].position;
  newPositions[targetIndex].position = position;

  dispatch({
    type: PROJECT_SET_POSITION,
    position,
    positionIndex: targetIndex,
    positions: newPositions,
  });
};

export default changePosition;
