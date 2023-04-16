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
  // since projects are sorted in descending order by 'order' field
  // index 0 is the highest 'order' value
  if (direction === "next") targetIndex = positionIndex - 1;
  else if (direction === "previous") targetIndex = positionIndex + 1;
  else
    throw new Error(
      "invalid swapPosition direction, expected 'next' or 'previous'"
    );

  // if target index outside of available space
  if (targetIndex < 0 || targetIndex > positions.length - 1) return;

  const order = positions[targetIndex].order;

  const newPositions = swapArrayElements(positions, positionIndex, targetIndex);

  dispatch({
    type: PROJECT_SET_POSITION,
    order,
    positionIndex: targetIndex,
    positions: newPositions,
  });
};

export default changePosition;
