function sortedArrayToBST(inputArray) {
  if (inputArray.length <= 0) return "-";
  if (inputArray.length == 1) return inputArray[0];

  let middleIndex = Math.floor(inputArray.length / 2);
  if (inputArray.length == 2) middleIndex = 1;

  let root = inputArray[middleIndex];
  let left = inputArray.slice(0, middleIndex);
  let right = inputArray.slice(middleIndex + 1);
  return `(${root}) ${sortedArrayToBST(left)} ${sortedArrayToBST(right)}`;
}

export default sortedArrayToBST;
