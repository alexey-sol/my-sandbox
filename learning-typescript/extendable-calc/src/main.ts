import { Calculator, CalculatorInterface } from "./Calculator";
import pow from "./pow";

const calculator: CalculatorInterface = new Calculator();

calculator.addMethod("*", (a: number, b: number) => a * b);
calculator.addMethod("/", (a: number, b: number) => a / b);
calculator.addMethod("**", (a: number, b: number) => pow(a, b));

const a: number = 2,
      b: number = 4;

const inputList: string[] = [
  `${a} + ${b}`,
  `${a} - ${b}`,
  `${a} * ${b}`,
  `${a} / ${b}`,
  `${a} ** ${b}`,
  `${a} & ${b}` // will be NaN
];

inputList.forEach(input => 
  console.log(`${input} =`, calculator.calculate(input))
);

// The implementation is based on: 
// https://learn.javascript.ru/task/calculator-extendable

// Memo. I run this stuff via Node. It's enough to input "node lib/main" being
// in the root of the project. For compiling the files, there's the command "tsc".
// The parameters of the compiler are set in "tsconfig.json".