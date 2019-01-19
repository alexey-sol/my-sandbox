// node --experimental-modules binary-search.mjs

// binarySearch(numbersArray: number[], item: number): number;
export default function binarySearch(numbersArray, item) {
  let steps = 0; // represents the number of guesses; a simple count

  let low = 0, // finding the "extreme points"
      high = numbersArray.length - 1,
      mid; // the middle index lying between "low" and "high"
  let guess;

  while (low <= high) {
    steps++;

    mid = Math.ceil((low + high) / 2);
    guess = numbersArray[mid];

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

// The point of this search is: with every guess, we eliminate half the numbers
// by guessing the middle one (lying between the range of "low" and "high"; the
// range gets narrowed down with each iteration according to the current
// guess).

// The amount of guesses may be estimated with help of logarithm with base 2
// where "n" is a number of elements to loop through.