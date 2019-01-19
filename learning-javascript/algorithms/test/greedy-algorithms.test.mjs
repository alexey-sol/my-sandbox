// node --experimental-modules test/greedy-algorithms.test.mjs
import "mjs-mocha"; // [1]
import chai from "chai";
import getBestStations from "../greedy-algorithms";

const expect = chai.expect;

describe("greedy-algorithms", () => {
  const statesToCover = // the states we need to cover
    new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

  // Stations and the states they cover:
  const stations = {
    "kone": new Set(["id", "nv", "ut"]),
    "ktwo": new Set(["wa", "id", "mt"]),
    "kthree": new Set(["or", "nv", "ca"]),
    "kfour": new Set(["nv", "ut"]),
    "kfive": new Set(["ca", "az"])
  };

  it(`should return set containing "kone", "ktwo", "kthree", and "kfive"`,
  () => {
    const result = getBestStations(statesToCover, stations);
    expect(result).to.be.a("set").with.lengthOf(4);
    expect(result.has("kone")).to.be.equal(true);
    expect(result.has("ktwo")).to.be.equal(true);
    expect(result.has("kthree")).to.be.equal(true);
    expect(result.has("kfive")).to.be.equal(true);
  });
});

// [1]: https://www.npmjs.com/package/mjs-mocha