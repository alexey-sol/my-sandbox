// node --experimental-modules selection-sort.mjs
import { findSmallestNumber } from "./utils";

// selectionSort(array: number[]): number[];
export default function selectionSort(array) {
  // It's a simple algorithm which loops through the given array "len" times,
  // so its speed is O(n * n). Also this function "ruins" the input array.

  const sortedArray = [],
        len = array.length;

  for (let i = 0; i < len; i++) {
    const smallestIndex = findSmallestNumber(array),
          cutNumber = array.splice(smallestIndex, 1)[0];

    sortedArray.push(cutNumber);
  }

  return sortedArray;
};