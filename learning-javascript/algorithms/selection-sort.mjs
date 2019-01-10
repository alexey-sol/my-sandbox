// node --experimental-modules selection-sort.mjs
import { findSmallestNumber, generateArrayOfNumbers } from "./utils";

// selectionSort(array: number[]): number[];
const selectionSort = (array) => {
  // It's a simple algorithm which loops through the given array "len" times,
  // so its speed is O(n * n). Also this function "ruins" the input array.

  const sortedArray = [],
        len = array.length;

  for (let i = 0; i < len; i++) {
    const smallestIndex = findSmallestNumber(array), // n
          cutNumber = array.splice(smallestIndex, 1)[0];

    sortedArray.push(cutNumber);
  }

  return sortedArray;
}

let randomNumbersArray = generateArrayOfNumbers(1, 10, true);
console.log(selectionSort(randomNumbersArray));