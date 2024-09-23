import Node from "./node.js";
import {mergesort} from "../Recursion/mergesort.js";

export default class Tree {
    constructor() {
        this.root = null;
        this.balanced = true;
    }

    //Method to prepare array, removing duplicates and sorting
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

    insert(value, node=this.root){
      //Base case - insert node when reaching leaf
      if(node === null){
        return new Node(value);
      }
      //Second base case, no duplicate values
      if(node.value === value){
        return node;
      }
      if(value < node.value){
        node.left = this.insert(value, node.left);
      }
      else if(value > node.value){
        node.right = this.insert(value, node.right);
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

    levelOrderRecursive(callback, node=this.root, queue=[this.root]){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null ) return;
      if(queue.length === 0) return;
      
      node = queue.shift();
      callback(node.value);
      if(node.left != null) queue.push(node.left);
      if(node.right != null) queue.push(node.right); 
      this.levelOrderRecursive(callback, node, queue);
    }
    
    printLevelOrder() {
      let array = [];
      this.levelOrderRecursive((value) => array.push(value));
      return(array.join(', '));
    }

    //left, root, right
    inOrder (callback, node=this.root){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      this.inOrder(callback, node.left);
      callback(node.value);
      this.inOrder(callback, node.right);
    }

    printInOrder() {
      let array = [];
      this.inOrder((value) => array.push(value));
      return(array.join(', '));  
    }

    //preorder root, left, right
    preOrder (callback, node=this.root){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      callback(node.value);
      this.preOrder(callback, node.left);
      this.preOrder(callback, node.right);
    }

    printPreOrder() {
      let array = [];
      this.preOrder((value) => array.push(value));
      return(array.join(', '));
    }

    //postorder: left, right, root
    postOrder (callback, node=this.root){
      if(typeof callback != 'function'){
        throw new Error("A callback function must be passed as parameter");
      }
      if(node === null) return;
      this.postOrder(callback, node.left);
      this.postOrder(callback, node.right);
      callback(node.value);
    }

    printPostOrder() {
      let array = [];
      this.postOrder((value) => array.push(value));
      return(array.join(', '));
    }

    height(node=this.root, count=0, array=[]){
      if(node === null) return;
      if(node.left === null && node.right === null) return array.push(count); //reached leaf node
      count++;
      this.height(node.left, count, array);
      this.height(node.right, count, array);
      return(array.reduce((max,n) => n > max ? n : max));  //return maximum value
    }

    depth(node){
      let nodeTraverse = this.root;
      let count = 0;
      while(node.value != nodeTraverse.value){ 
        if(node.value < nodeTraverse.value){
          nodeTraverse = nodeTraverse.left;
          count++;
        }
        else if(node.value > nodeTraverse.value){
          nodeTraverse = nodeTraverse.right;
          count++;
        }
      }
      return count;
    }

    isBalanced(node=this.root, queue=[this.root]){
      if(node === null) return;
      if(queue.length === 0) return;
      
      node = queue.shift();
      
      let heightDiff;
      if(node.left === null && node.right === null){
        heightDiff = 0;
      }
      else if(node.left === null){
        heightDiff = this.height(node.right);
      }
      else if(node.right === null){
        heightDiff = this.height(node.left);
      }
      else {
        heightDiff = this.height(node.left)-this.height(node.right);
      }
      if(heightDiff > 1 || heightDiff < -1){
        this.balanced = false;
        return this.balanced;
      }
      else{
        if(node.left != null) queue.push(node.left);
        if(node.right != null) queue.push(node.right);
        this.isBalanced(node, queue);    
      }      
      return(this.balanced);
    }

    rebalance() {
      let sortedArray = [];
      this.inOrder((value) => {
        sortedArray.push(value);
      });
      this.balanced = true;
      return this.buildTree(sortedArray);
    }


    prettyPrint(node = this.root, prefix = "", isLeft = true) {
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



