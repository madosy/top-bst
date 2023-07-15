import sortedArrayToBST from "./sortedArrayToBST.js";
import Tree from "./Tree.js";
import prettyPrint from "./prettyPrint.js";

let test1 = [1, 7, 4, 6, 10, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let test2 = [1, 2, 3, 4, 5, 6, 7];

let tree = new Tree(test2);
console.log(tree);
prettyPrint(tree.root);

let myNodes = [];
tree.levelOrder((node) => myNodes.push(node));
console.log(myNodes);
console.log(tree.levelOrder());
console.log(tree.preorder());
