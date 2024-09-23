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

    deleteItem(node, value){
      //Base case - value not in tree
      if(node === null) {
        return node;
      }

      if(value < node.value){
        node.left = this.deleteItem(node.left, value);
      }
      else if (value > node.value){
        node.right = this.deleteItem(node.right, value);
      }
      else {
        if(node.left === null) {
          return node.right;
        }
        if(node.right === null) {
          return node.left;  
        }

        let succ = this.getSuccesor(node);
        node.value = succ.value;
        node.right = this.deleteItem(node.right, succ.value);
      }
      return node;
    }

    getSuccesor(curr){
      curr = curr.right;
      while(curr !== null && curr.left !== null){
        curr = curr.left;
      }
      return curr;
    }

    find(value) {
      let node = this.root;
      while(node != null){
        if(node.value === value) return node;
        if(value < node.value){
          node = node.left;
        }
        else if(value > node.value){
          node = node.right;
        }
      }    
      return console.error('Value not in tree');    
    }
    
    levelOrder(callback) {
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      let node = this.root;
      if(node === null ) return;
      let queue = [];
      queue.push(this.root);
      while(queue.length != 0){   
        node = queue.shift();
        callback(node.value);
        if(node.left != null){
          queue.push(node.left);
        }
        if(node.right != null){
          queue.push(node.right);
        }
      }
    }

    levelOrderRecursive(node, queue, callback){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null ) return;
      if(queue.length === 0) return;
      
      node = queue.shift();
      callback(node.value);
      if(node.left != null) queue.push(node.left);
      if(node.right != null) queue.push(node.right); 
      this.levelOrderRecursive(node, queue, callback);
    }

    cb(value) {
      console.log(`This node's value is ${value}.`);
    }

    //left, root, right
    inOrder (node, callback){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      this.inOrder(node.left, callback);
      callback(node.value);
      this.inOrder(node.right, callback);
    }

    //preorder root, left, right
    preOrder (node, callback){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      callback(node.value);
      this.preOrder(node.left, callback);
      this.preOrder(node.right, callback);
    }

    //postorder: left, right, root
    postOrder (node, callback){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      this.postOrder(node.left, callback);
      this.postOrder(node.right, callback);
      callback(node.value);
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
test.prettyPrint(test.root);
let array = [test.root];
console.log(test.levelOrderRecursive(test.root, array, test.cb));

