import Tree from "./Tree.js";
import prettyPrint from "./prettyPrint.js";

const testScript = () => {
  // Tie it all together
  // Write a simple driver script that does the following:

  // Create a binary search tree from an array of random numbers < 100. You can create a function that returns an array of random numbers every time you call it, if you wish.
  let randomArray = Array.from({ length: 20 }).map(() =>
    Math.floor(Math.random() * 500)
  );
  let myBST = new Tree(randomArray);
  console.log(myBST);
  prettyPrint(myBST.root);

  // Confirm that the tree is balanced by calling isBalanced.
  console.log(`isBalanced? ${myBST.isBalanced()}`);

  // Print out all elements in level, pre, post, and in order.
  console.log({
    level: myBST.levelOrder(),
    preorder: myBST.preorder(),
    postorder: myBST.postorder(),
    inorder: myBST.inorder(),
  });

  // Unbalance the tree by adding several numbers > 100.
  console.log("Inserting 200 random values... (duplicates are skipped)");
  let anotherRandomArray = Array.from({ length: 200 }).map(() =>
    Math.floor(Math.random() * 1000)
  );
  anotherRandomArray.forEach((item) => myBST.insert(item));

  // Confirm that the tree is unbalanced by calling isBalanced.
  console.log(`isBalanced? ${myBST.isBalanced()}`);
  if (myBST.isBalanced()) prettyPrint(myBST.root);
  // Balance the tree by calling rebalance.
  console.log(`rebalancing...`);
  myBST.rebalance();
  // Confirm that the tree is balanced by calling isBalanced.
  console.log(`isBalanced? ${myBST.isBalanced()}`);

  // Print out all elements in level, pre, post, and in order.
  console.log({
    level: myBST.levelOrder(),
    preorder: myBST.preorder(),
    postorder: myBST.postorder(),
    inorder: myBST.inorder(),
  });
};

export default testScript;
