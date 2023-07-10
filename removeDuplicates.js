function removeDuplicates(array) {
  let mySet = new Set(array);
  let myArray = Array.from(mySet);
  return myArray;
}

export default removeDuplicates;
