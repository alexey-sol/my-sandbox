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