namespace Interface {
  // "Method" describes a function which is passed to "addMethod" method as
  // an argument.
  export interface Method {
    (a: number, b: number): number;
  }
  
  // "Functionality" describes an object which is supposed to contain an
  // arbitrary number of custom methods of "Method" pattern.
  export interface Functionality {
    [operation: string]: Method;
  }
}

import Method = Interface.Method;
import Functionality = Interface.Functionality;

// There's no particular reason to use such a namespace, of course. It only
// provides a lot of excess code and no benefit in this scenario. But I'm
// just mastering new constructions here in this project.

// "CalculatorInterface" describes an instance of the "Calculator".
export interface CalculatorInterface {
  calculate(input: string): number;
  addMethod(operation: string, method: Method): void;
}

export class Calculator implements CalculatorInterface {
  private functionality: Functionality = { // some basic functionality
    "+": (a: number, b: number): number => a + b,
    "-": (a: number, b: number): number => a - b
  }

  public calculate(input: string): number {
    type StringArray = Array<string>; // or it might be: string[]

    const split: StringArray = input.split(" ");
    const a: number = +split[0],
          b: number = +split[2],
          operator: string = split[1];
    // It's rather a rough solution, but it is enough for this exercise.
    
    if (!this.functionality[ operator ] || isNaN(a) || isNaN(b))
      return NaN;

    return this.functionality[ operator ]( a, b );
  }

  public addMethod(operation: string, method: Method): void {
    this.functionality[ operation ] = method;
  }
}

// BTW, methods and properties of the class are public by default, without 
// explicit specification.