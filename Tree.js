import Node from "./Node.js";
import mergeSort from "./mergeSort.js";
import removeDuplicates from "./removeDuplicates.js";
import prettyPrint from "./prettyPrint.js";

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

  insertAt(root, value) {
    if (root.data == value) return;

    if (root.data < value) {
      if (root.right == null) return (root.right = new Node(value));
      else this.insertAt(root.right, value);
    } else {
      if (root.left == null) return (root.left = new Node(value));
      else this.insertAt(root.left, value);
    }
  }

  insert(value) {
    this.insertAt(this.root, value);
    prettyPrint(this.root);
  }

  getSmallestNode(root) {
    if (root.left !== null) return this.getSmallestNode(root.left);
    else return root;
  }

  deleteAt(root, value, parent = null) {
    if (root == null) return;

    const isLeafNode = root.left == null && root.right == null;
    const hasTwoChild = root.left !== null && root.right !== null;
    const hasOneChild =
      (root.left !== null || root.right !== null) && !hasTwoChild;

    if (root.data == value) {
      if (isLeafNode) {
        parent.right !== null && parent.right.data == root.data
          ? (parent.right = null)
          : (parent.left = null);
      }
      if (hasOneChild) {
        parent.right !== null && parent.right.data == root.data
          ? (parent.right = root.left || root.right)
          : (parent.left = root.left || root.right);
      }
      if (hasTwoChild) {
        let nextBiggestNode = this.getSmallestNode(root.right);
        this.delete(nextBiggestNode.data);
        nextBiggestNode.left = root.left;
        nextBiggestNode.right = root.right;

        if (parent !== null) {
          parent.right.data == root.data
            ? (parent.right = nextBiggestNode)
            : (parent.left = nextBiggestNode);
        } else {
          this.root = nextBiggestNode;
        }
      }
      return;
    }
    if (root.data > value) return this.deleteAt(root.left, value, root);
    if (root.data < value) return this.deleteAt(root.right, value, root);
  }

  delete(value) {
    this.deleteAt(this.root, value);
  }

  findAt(root, value) {
    if (root == null) return null;
    if (root.data == value) return root;
    if (root.data > value) return this.findAt(root.left, value);
    if (root.data < value) return this.findAt(root.right, value);
  }

  find(value) {
    return this.findAt(this.root, value);
  }
}
export default Tree;
