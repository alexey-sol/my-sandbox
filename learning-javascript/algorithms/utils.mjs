// generateArrayOfNumbers(start?: number, end?: number): number[];
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

export class Node {
  constructor(value, next, prev) {
    this.value = value;
    this.next = next;
    this.prev = prev;    
  }
}

export class LinkedNode {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // addToHead(value: any): void;
  // Creates a new node and adds it to the beginning of the list.
  addToHead(value) {
    const node = new Node(value, this.head, null);

    if (this.head) // is there something? Put the node in the very beginning
      this.head.prev = node;
    else // is there no nodes yet?
      this.tail = node; // the node becomes the First and the Last

    this.head = node;
  }

  addToTail(value) {
    const node = new Node(value, null, this.tail);

    if (this.tail)
      this.tail.next = node;
    else
      this.head = node;

    this.tail = node;
  }

  // remove
}

// Linked list is implemented on the basis of "The Little Guide of Linked List
// in JavaScript" [1].

// [1]: https://hackernoon.com/the-little-guide-of-linked-list-in-javascript-9daf89b63b54