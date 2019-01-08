
// node --experimental-modules binary-search.mjs
import { generateListOfNumbers } from "./utils";

// lookWithBinarySearch(numbersList: number[], item: number): number;
const lookWithBinarySearch = (numbersList, item) => {
  let steps = 0;

  let low = 0, // finding the "extreme points"
      high = numbersList.length - 1,
      mid; // the middle index lying between "low" and "high"
  let guess;

  while (low <= high) {
    steps++;

    mid = Math.ceil((low + high) / 2);
    guess = numbersList[mid];

    if (guess === item)
      return {
        index: mid,
        steps: steps
      };

    else if (guess < item) // "too low" case
      low = mid + 1;

    else // "too high"
      high = mid - 1;
  }

  return {
    index: null,
    steps: steps
  };
}

// Test 1.

const list1 = generateListOfNumbers(1, 10); // 10 numbers list
const stepsAtMost1 = Math.ceil(
  Math.log2(list1.length)
); // how many steps must be undertaken in the worst case scenario
const result1 = lookWithBinarySearch(list1, 7); // find number 7

console.log(
  `1) ${result1.steps} of ${stepsAtMost1} steps. Index: ${result1.index}.`
); // 4 of 4 steps. Index: 6.

// Test 2.

const list2 = generateListOfNumbers(1, 1000); // 1000 numbers list
const stepsAtMost2 = Math.ceil( Math.log2(list2.length) );
const result2 = lookWithBinarySearch(list2, 501); // find number 501

console.log(
  `2) ${result2.steps} of ${stepsAtMost2} steps. Index: ${result2.index}.`
); // 1 of 10 steps. Index: 500.

// Test 3.

const result3 = lookWithBinarySearch(list2, 1001); // find 1001 among 1000
console.log(
  `3) ${result3.steps} of ${stepsAtMost2} steps. Index: ${result3.index}.`
); // 9 of 10 steps. Index: null.

// The point of this search is: with every guess, we eliminate half the numbers
// by guessing the middle one (lying between the range of "low" and "high",
// which gets narrowed down with each iteration according to the current
// guess).

// The amount of guesses may be estimated with help of logarithm with base 2
// where "n" is a number of elements to loop through.