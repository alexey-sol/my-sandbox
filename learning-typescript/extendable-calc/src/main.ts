import { Calculator, CalculatorInterface } from "./Calculator";
import pow from "./pow";

const calculator: CalculatorInterface = new Calculator();

calculator.addMethod("*", (a: number, b: number) => a * b);
calculator.addMethod("/", (a: number, b: number) => a / b);
calculator.addMethod("**", (a: number, b: number) => pow(a, b));

const a: number = 2,
      b: number = 4;

console.log(`${a} + ${b} =`, calculator.calculate({ a, operator: "+", b }));
console.log(`${a} - ${b} =`, calculator.calculate({ a, operator: "-", b }));
console.log(`${a} * ${b} =`, calculator.calculate({ a, operator: "*", b }));
console.log(`${a} / ${b} =`, calculator.calculate({ a, operator: "/", b }));
console.log(`${a} ** ${b} =`, calculator.calculate({ a, operator: "**", b }));

// The implementation is based on: 
// https://learn.javascript.ru/task/calculator-extendable

// Memo. I run this stuff via Node. Inputting "node lib/main" being in the root
// of the project, serves well. To compile the files, it's enough to type in "tsc"
// into the command prompt. Parameters of the compiler are set in "tsconfig.json".