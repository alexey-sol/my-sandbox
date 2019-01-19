// node --experimental-modules test/breadth-first-search.test.mjs
import "mjs-mocha"; // [1]
import chai from "chai";
import breadthFirstSearch from "../breadth-first-search";

const expect = chai.expect;

describe("breadth-first-search", () => {
  it("should find Mango Seller in graph", () => {
    const graph = {
      "me": ["Araq", "Auza"],
      // The 1st-degree connections:
      "Araq": ["Daggoth", "Gorn"],
      "Auza": ["Kagg"],
      // The 2nd-degree connections:
      "Daggoth": ["Kaloth"],
      "Gorn": [],
      "Kagg": ["Nargil the Mango Seller"],
      // The 3rd-degree connections:
      "Kaloth": [],
      "Nargil the Mango Seller": []
    };

    const result = breadthFirstSearch("me", graph);
    expect(result).to.be.a("boolean");
    expect(result).to.be.equal(true);
  });

  it("should not find Mango Seller in graph", () => {
    const graph = {
      "me": []
    };

    const result = breadthFirstSearch("me", graph);
    expect(result).to.be.a("boolean");
    expect(result).to.be.equal(false);
  });
});

// [1]: https://www.npmjs.com/package/mjs-mocha