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

  levelOrder(callbackfn = null) {
    let queue = [];
    let values = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let firstItem = queue.shift();
      if (firstItem.left !== null) queue.push(firstItem.left);
      if (firstItem.right !== null) queue.push(firstItem.right);

      callbackfn !== null ? callbackfn(firstItem) : values.push(firstItem.data);
    }
    if (callbackfn == null) return values;
  }

  preorder(callbackfn = null) {
    var values = [];
    let root = this.root;
    preorderAt(root, callbackfn);
    if (callbackfn == null) return values;

    function preorderAt(root, callbackfn) {
      if (root == null) return;
      callbackfn !== null ? callbackfn(root) : values.push(root.data);
      preorderAt(root.left, callbackfn);
      preorderAt(root.right, callbackfn);
    }
  }

  inorder(callbackfn = null) {
    var values = [];
    let root = this.root;
    inorderAt(root, callbackfn);
    if (callbackfn == null) return values;

    function inorderAt(root, callbackfn) {
      if (root == null) return;
      inorderAt(root.left, callbackfn);
      callbackfn !== null ? callbackfn(root) : values.push(root.data);
      inorderAt(root.right, callbackfn);
    }
  }

  postorder(callbackfn = null) {
    var values = [];
    let root = this.root;
    postorderAt(root, callbackfn);
    if (callbackfn == null) return values;

    function postorderAt(root, callbackfn) {
      if (root == null) return;
      postorderAt(root.left, callbackfn);
      postorderAt(root.right, callbackfn);
      callbackfn !== null ? callbackfn(root) : values.push(root.data);
    }
  }

  height(node = this.root) {
    //return the deepest
    let isLeafNode = node.left == null && node.right == null;
    let hasLeftChild = node.left !== null;
    let hasRightChild = node.right !== null;
    let leftHeight = 0;
    let rightHeight = 0;

    if (isLeafNode) return 0;
    if (hasLeftChild) leftHeight = 1 + this.height(node.left);
    if (hasRightChild) rightHeight = 1 + this.height(node.right);
    return leftHeight > rightHeight ? leftHeight : rightHeight;
  }

  depth(node = this.root) {
    let jump = 0;
    let currentNode = this.root;
    let isNodeFound = false;
    let isLeafNode = (node) => node.left == null && node.right == null;

    while (isNodeFound == false) {
      if (currentNode == node) isNodeFound = true;
      else if (isLeafNode(currentNode)) {
        jump = null;
        break;
      } else {
        currentNode.data > node.data
          ? (currentNode = currentNode.left)
          : (currentNode = currentNode.right);
        jump++;
      }
    }
    return jump;
  }

  isBalanced(node = this.root) {
    let result = isBalancedAt(node);
    return result == -1 ? false : true;

    function isBalancedAt(root) {
      if (root == null) return 0;
      let leftHeight = isBalancedAt(root.left);
      let rightHeight = isBalancedAt(root.right);

      if (leftHeight == -1 || rightHeight == -1) return -1;
      if (Math.abs(leftHeight - rightHeight) > 1) return -1;
      else return Math.max(leftHeight, rightHeight) + 1;
    }
  }

  rebalance() {
    let orderedArray = this.inorder();
    this.root = this.buildTree(orderedArray);
    return this.root;
  }
}
export default Tree;
