export const pow: Function = (num:number, exp:number): number => 
  (exp > 1) ? 
    (num * pow(num, exp - 1)) :
    (num);
    
// God, arrow functions are so legit. Parentheses are for better readability.