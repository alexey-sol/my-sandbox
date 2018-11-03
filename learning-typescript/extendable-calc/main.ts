import { Calculator } from "./Calculator";
import { pow } from "./pow";

const calculator = new Calculator();

calculator.addMethod("*", (a: number, b: number) => a * b);
calculator.addMethod("/", (a: number, b: number) => a / b);
calculator.addMethod("**", (a: number, b: number) => pow(a, b));

const a: number = 2,
      b: number = 4;

console.log(`${a} + ${b} =`, calculator.calculate(`${a} + ${b}`));
console.log(`${a} - ${b} =`, calculator.calculate(`${a} - ${b}`));
console.log(`${a} * ${b} =`, calculator.calculate(`${a} * ${b}`));
console.log(`${a} / ${b} =`, calculator.calculate(`${a} / ${b}`));
console.log(`${a} ** ${b} =`, calculator.calculate(`${a} ** ${b}`));

// The implementation is based on: 
// https://learn.javascript.ru/task/calculator-extendable

// In comments, keywords and identifiers are wrapped in brackets. For example,
// [class] means "class" keyword. The names of the types are wrapped in quotes:
// [null] value belongs to "null" type.

// I run this stuff via Node. "node main" in the command line serves well (of
// course, after compilation).