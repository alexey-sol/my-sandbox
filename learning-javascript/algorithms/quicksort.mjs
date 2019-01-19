// node --experimental-modules quicksort.mjs
import { getRandomInteger } from "./utils";

// quicksort(number[]): number[];
export default function quicksort(array) {
  // It's the base case. Does the array contain 0 or 1 element? Return it as
  // is. 
  if (array.length <= 1)
    return array;

  // A recursive case: steps needed to be taken to come to the base case.
  else { 
    // It's said in "Grokking algorithms" that it's better to grab a random
    // element as a pivot: it will show a better result on average. However,
    // I tested it a bit on same arrays, and the version with a random pivot
    // showed worse results than the version with pivot which was always the
    // 1st element (it was taken more steps). :s
    const index = getRandomInteger(0, array.length - 1);

    // The "pivot" is a number which splits the array into 2 parts. The "less"
    // array will contain numbers less than "pivot", the "greater" one will
    // contain numbers greater than "pivot".
    const pivot = array[index];
    const less = array.filter(number => (number < pivot) ? true : false),
          greater = array.filter(number => (number > pivot) ? true : false);

    return [
      ...quicksort(less),
      pivot,
      ...quicksort(greater)
    ];
    // There's one issue with this function. It omits duplicate elements.
  }
};