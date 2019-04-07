// node --experimental-modules test/selection-sort.test.mjs
import "mjs-mocha"; // [1]
import chai from "chai";
import selectionSort from "../selection-sort";
import { generateArrayOfNumbers } from "../utils";

const expect = chai.expect;

describe("selection-sort", () => {
  const randomNumbersArray = generateArrayOfNumbers(1, 10, true);

  it("should return sorted array of numbers", () => {
    const result = selectionSort(randomNumbersArray);
    expect(result).to.be.a("array");

    let prevNum = result[0];

    if (!isNaN(prevNum) && !isNaN(result[1]))
      result.forEach(currentNum => {
        expect(currentNum >= prevNum).to.equal(true);
        prevNum = currentNum;
      });
  });
});

// [1]: https://www.npmjs.com/package/mjs-mocha