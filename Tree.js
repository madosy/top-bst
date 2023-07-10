import Node from "./Node.js";
import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(array) {
    let sortedArray = mergeSort(array);
    let filteredArray = removeDuplicates(sortedArray);

    let middle = Math.floor(filteredArray.length / 2);
    if (filteredArray[middle] == null) return null;
    let root = new Node(filteredArray[middle]);

    if (array.length > 1) {
      let leftArray = filteredArray.slice(0, middle);
      let rightArray = filteredArray.slice(middle + 1);
      root.left = this.buildTree(leftArray);
      root.right = this.buildTree(rightArray);
    }
    return root;
  }

  insert() {
    //check the data; if greater, move to right. else move to left.
    //if left/right is null, create a node there.
  }
  delete() {}
}
export default Tree;
