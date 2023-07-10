function mergeSort(inputArray) {
  if (inputArray.length == 1) return inputArray;
  else {
    let midIndex = Math.floor(inputArray.length / 2);
    let firstHalf = mergeSort(inputArray.slice(0, midIndex));
    let secondHalf = mergeSort(inputArray.slice(midIndex));
    let finalArray = [];

    while (firstHalf.length > 0 && secondHalf.length > 0) {
      if (firstHalf[0] < secondHalf[0]) {
        finalArray.push(firstHalf.shift());
      } else {
        finalArray.push(secondHalf.shift());
      }
    }
    finalArray.push(...firstHalf);
    finalArray.push(...secondHalf);
    return finalArray;
  }
}
export default mergeSort;
