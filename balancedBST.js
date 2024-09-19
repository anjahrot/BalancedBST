import Node from "./node.js";
import {mergesort} from "../Recursion/mergesort.js"

class Tree {
    constructor(array) {
        this.array = array;
        this.root = null;
    }

    prepareArray(array) {
        //remove duplicate values using the Set object
        let uniqueArr = [...new Set(array)];
        return mergesort(uniqueArr);
    }

    buildTreeRecursive(sortedArr, start, end){
        //Base Case
        if(start > end) return null;

        //Recursive part
        let mid = parseInt((start+end)/2);
        let node = new Node(sortedArr[mid]);

        node.left = this.buildTreeRecursive(sortedArr, start, mid - 1);
        node.right = this.buildTreeRecursive(sortedArr, mid + 1, end);
        return node;
    }

    buildTree(array) {
        let sortedArray = this.prepareArray(array);
        let end = sortedArray.length-1;
        
        this.root = this.buildTreeRecursive(sortedArray, 0, end); 
    }

    insert(node, value){
      //Base case - insert node when reaching leaf
      if(node === null){
        return new Node(value);
      }
      //Second base case, no duplicate values
      if(node.value === value){
        return node;
      }
      if(value < node.value){
        node.left = this.insert(node.left, value);
      }
      else if(value > node.value){
        node.right = this.insert(node.right, value);
      }
      return node;
    }

    deleteItem(value){
      
    }


    prettyPrint(node, prefix = "", isLeft = true) {
        if (node === null) {
          return;
        }
        if (node.right !== null) {
          this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }
        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.value}`);
        if (node.left !== null) {
          this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
      }
}

let arr = [1, 7, 4, 23, 8, 9, 67, 7, 10];
const test = new Tree(arr);
test.buildTree(arr);
test.insert(test.root, 12);
test.prettyPrint(test.root);
