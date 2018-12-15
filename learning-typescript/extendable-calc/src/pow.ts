interface Pow {
  (number: number, exponent: number): number;
} 

const pow: Pow = (num: number, exp: number): number => 
  (exp > 1) ? 
    (num * pow(num, exp - 1)) :
    (num);

export default pow;
// God, arrow functions are so legit. Parentheses are for better readability.