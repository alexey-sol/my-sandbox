// generateArrayOfNumbers(start?: number, end?: number, useRandomNumbers?:
// boolean): number[];
export const generateArrayOfNumbers = (start = 1, end = 10, useRandomNumbers =
false) => {
  const result = [];

  for (let n = start; n <= end; n++)
    (useRandomNumbers) ?
      result.push(getRandomInteger(0, 30)) :
      result.push(n);

  return result;
}

// findSmallestNumber(array: number[]): number;
export const findSmallestNumber = (array) => {
  let smallest = array[0],
      smallestIndex = 0;

  array.forEach((number, index) => {
    if (number < smallest) {
      smallest = number;
      smallestIndex = index;
    }
  });

  return smallestIndex;
}

// getRandomInteger(min: number, max: number): number;
export const getRandomInteger = (min, max) =>
  Math.floor(Math.random() * (max - min)) + min;

// addAll(a: Set, b: Set): Set;
// Returns a set which represents a union of the received sets "a" and "b".
// The functions "addAll", "removeAll", and "retainAll" were borrowed from the
// "ECMAScript 6 sets: union, intersection, difference" [1].
export const addAll = (a, b) => 
  new Set([...a, ...b]);

// removeAll(a: Set, b: Set): Set;
// Returns a set which represents a difference of the received sets "a" and
// "b".
export const removeAll = (a, b) =>
  new Set( [...a].filter(item =>
    !b.has(item)) );
  
// retainAll(a: Set, b: Set): Set;
// Returns a set which represents an intersection of the received sets "a" and
// "b".
export const retainAll = (a, b) =>
  new Set( [...a].filter(item =>
    b.has(item)) );

export class Node {
  // constructor Node(value: any, next: Node | null, prev: Node | null): Node;
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;    
  }
}

// "LinkedList" is created on the basis of "The Little Guide of Linked List in
// JavaScript" [2].
export class LinkedList {
  // constructor LinkedList(Node: Node): LinkedList;
  constructor(Node) {
    this.Node = Node;
    this.head = null;
    this.tail = null;
  }

  // addToHead(value: any): void;
  // Creates a new node and adds it to the beginning of the list.
  addToHead(value) {
    const node = new this.Node(value, this.head, null);

    if (this.head) // is there something? Put the node in the very beginning
      this.head.prev = node;
    else // is there no nodes yet?
      this.tail = node; // the node becomes the First and the Last

    this.head = node;
  }

  // addToTail(value: any): void;
  // Creates a new node and adds it to the ending of the list.
  addToTail(value) {
    const node = new this.Node(value, null, this.tail);

    if (this.tail)
      this.tail.next = node;
    else
      this.head = node;

    this.tail = node;
  }

  // removeHead(): any;
  // Removes the head of the list and fixes that list accordingly. Returns the
  // value of the removed node.
  removeHead() {
    if (!this.head)
      return null;

    const value = this.head.value;
    this.head = this.head.next;

    if (this.head) // maybe it was the only node in the list
      this.head.prev = null;
    else
      this.tail = null;

    return value;
  }

  // removeTail(): any;
  // Removes the tail of the list and fixes that list accordingly. Returns the
  // value of the removed node.
  removeTail() {
    if (!this.tail)
      return tail;

    const value = this.tail.value;
    this.tail = this.tail.prev;

    if (this.tail)
      this.tail.next = null;
    else
      this.head = null;

    return value;
  }

  // search(value: any): Node | null;
  // Goes through the list and searches for the "value". If it finds the value,
  // returns the relative node; otherwise returns null.
  search(value) {
    if (!this.head)
      return null;

    let currentNode = this.head;

    while (currentNode) {
      if (currentNode.value === value)
        return currentNode;

      currentNode = currentNode.next;
    }

    return null;
  }
}

// [1]: http://2ality.com/2015/01/es6-set-operations.html
// [2]: https://hackernoon.com/the-little-guide-of-linked-list-in-javascript-9daf89b63b54