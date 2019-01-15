// node --experimental-modules greedy-algorithms.mjs
import { removeAll, retainAll } from "./utils";

// Unfortunately, ES6' Set doesn't have in-built methods to get a union, an
// intersection, and a difference. The "removeAll" and "retainAll" functions
// allow to get a difference and an intersection of two sets.

// Closer to the topic. Suppose, we have a radio show, and we need stations
// presented in "stations", to cover "statesToCover". There're overlaps in
// the coverage areas, so we need to minimize the number of the stations so
// that the remaining ones still could cover the whole list.

// getBestStations(statesToCover: Set, station: IStations): Set; // [1]
const getBestStations = (statesToCover, stations) => {
  const finalStations = new Set(); // the stations we chose

  while (statesToCover.size) {
    let bestStation = null;
    let statesCovered = new Set();

    for (let station in stations) {
      const states = stations[station];
      const covered = retainAll(statesToCover, states);

      if (covered.size > statesCovered.size) {
        bestStation = station;
        statesCovered = covered;
      }
    }

    statesToCover = removeAll(statesToCover, statesCovered);
    finalStations.add(bestStation);

    // Remove the states which have been covered, from "statesToCover", and add
    // the station with the largest coverage area to the "finalStations".
  }

  return finalStations;
};

// We have here a loop inside of a loop, so the runtime of this algorithm is
// O(n * n).

// The states we need to cover:
let statesToCover = new Set(["mt", "wa", "or", "id", "nv", "ut", "ca", "az"]);

// Stations and the states they cover:
const stations = {
  "kone": new Set(["id", "nv", "ut"]),
  "ktwo": new Set(["wa", "id", "mt"]),
  "kthree": new Set(["or", "nv", "ca"]),
  "kfour": new Set(["nv", "ut"]),
  "kfive": new Set(["ca", "az"])
};

console.log(getBestStations(statesToCover, stations));
// Spoiler! The result is: "kone", "ktwo", "kthree", "kfive".
console.log(statesToCover);

// It's a JS version of the example given in the chapter "Approximation
// algorithms" from Grokking Algorithms.

// [1]: interface IStations { [key: string]: Set; }