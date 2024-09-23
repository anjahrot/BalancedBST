import { arrayRandom, numberRandom } from "./toolbox.js";
import Tree from "./balancedBST.js";

let arr = arrayRandom(40, 99);
const tree = new Tree();
console.log('Creates new balanced BST from sorted array.')
tree.buildTree(arr);
console.log('Tree is balanced: ', tree.isBalanced());
console.log('All elements in level order:', tree.printLevelOrder());
console.log('All elements pre order: ', tree.printPreOrder());
console.log('All elements post order: ', tree.printPostOrder());
console.log('All elements in order: ', tree.printInOrder());
for(let i=0;i<4;i++){
    let value = numberRandom(101,150);
    tree.insert(value);
    console.log('Insert value: ', value);
};
console.log('Tree is balanced: ', tree.isBalanced());
console.log('Rebalances tree.')
tree.rebalance();
tree.prettyPrint();
console.log('Tree is balanced: ', tree.isBalanced());
console.log('All elements in level order:', tree.printLevelOrder());
console.log('All elements pre order: ', tree.printPreOrder());
console.log('All elements post order: ', tree.printPostOrder());
console.log('All elements in order: ', tree.printInOrder());