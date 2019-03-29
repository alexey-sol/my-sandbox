// node --experimental-modules breadth-first-search.mjs

// euclideanGCD(a: number, b: number): number;
export default function euclideanGCD(a, b) {
  


  let aRemainder = 0;

  if (b === 0)
    return a;

  else {
    aRemainder = a % b;
    return euclideanGCD(b, aRemainder);
  }
};

console.log(euclideanGCD(357, 234));