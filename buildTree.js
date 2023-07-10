import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";
import Node from "./Node.js";
import Tree from "./Tree.js";

function buildTree(array) {
  let sortedArray = mergeSort(array);
  let filteredArray = removeDuplicates(sortedArray);

  let middle = Math.floor(filteredArray.length / 2);
  if (filteredArray[middle] == null) return null;
  let root = new Node(filteredArray[middle]);

  if (array.length > 1) {
    let leftArray = filteredArray.slice(0, middle);
    let rightArray = filteredArray.slice(middle + 1);
    root.left = buildTree(leftArray);
    root.right = buildTree(rightArray);
  }

  return root;
}

export default buildTree;
