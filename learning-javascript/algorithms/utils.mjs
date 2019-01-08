// generateListOfNumbers(start?: number, end?: number): number[];
export const generateListOfNumbers = (start = 1, end = 10) => {
  const result = [];

  for (let n = start; n <= end; n++)
    result.push(n);

  return result;
}

// sortAsNumbers(a: number, b: number): number;
export const sortAsNumbers = (a, b) => a - b;