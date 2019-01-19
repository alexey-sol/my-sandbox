// node --experimental-modules test/binary-search.test.mjs
import "mjs-mocha"; // [1]
import chai from "chai";
import binarySearch from "../binary-search";
import { generateArrayOfNumbers } from "../utils";

const expect = chai.expect;

describe("binary-search", () => {
  const list = generateArrayOfNumbers(1, 10); // an ordered list: [1; 10]
  const stepsAtMost = Math.ceil(
    Math.log2(list.length)
  ); // how many steps must be undertaken in the worst case scenario; O(log n)

  list.forEach((numToFind, indexToReturn) => {
    if (indexToReturn % 3 === 0) {
      it(`should find number ${numToFind} and return index ${indexToReturn
      } in max ${stepsAtMost} steps (for ${list.length} numbers array)`, () => {
        const result = binarySearch(list, numToFind);
        expect(result.index).to.be.equal(indexToReturn);
        expect(result.steps).to.be.at.most(stepsAtMost);
      });
    }
  });

  const list2 = generateArrayOfNumbers(1, 1000); // an ordered list: [1; 1000]
  const stepsAtMost2 = Math.ceil(
    Math.log2(list2.length)
  );

  it(`should find number 501 and return index 500 in 1 step (for ${list2.length
  } numbers array)`, () => {
    const result = binarySearch(list2, 501);
    expect(result.index).to.be.equal(500);
    expect(result.steps).to.be.at.most(1);
  });

  it(`should not find number 1001 in ${list2.length} numbers array in max ${
  stepsAtMost2} steps`, () => {
    const result = binarySearch(list2, 1001);
    expect(result.index).to.be.equal(null);
    expect(result.steps).to.be.at.most(stepsAtMost2);
  });
});

// [1]: https://www.npmjs.com/package/mjs-mocha