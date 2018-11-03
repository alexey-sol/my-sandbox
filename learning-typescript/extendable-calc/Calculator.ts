export interface CalculatorDescription {
  calculate(expression: string): number;
  addMethod(operation: string, func: Function): void;
}

// Okay, as far I comprehended, by defining [interface], we've created some kind of a
// template. We'll use this "template" for checking the "correctness" of the instance
// object.

export class Calculator implements CalculatorDescription {
  // In fact, there's no particular reason to use [class]. A regular function might be 
  // sufficient. But I just wanted to use [interface] in this way. Besides, [implements] 
  // keyword sounds so bizzare for me.

  private _functionality: object = { // some basic in-built functionality
    "+": (a: number, b: number) => a + b,
    "-": (a: number, b: number) => a - b
  };

  // At first I've put [_functionality] assignment in [constructor] but it seems that this
  // way also works fine. So this class has no constructor. Regarding [_functionality]: it's
  // a private property. This means that you can't change it in the instance.

  public calculate(expression: string): number { 
    // Operands and operator in [expression] must be separated from each other with spaces; 
    // [expression] must have the following form: "2 + 3".
    interface StringArray {
      readonly [index: number]: string;
      // [readonly] is an analogue of [const] for properties. In this scenario, once some index
      // gets value, that index can not be reassigned later.
    }

    const split: StringArray = expression.split(" "); 
    // Or we just might use string[] annotation instead of that interface with index signature:
    // split: string[];
    
    const a: number = +( split[0] ),
          b: number = +( split[2] ),
          operator: string = split[1];
    // It's a rather rough solution, but it would be enough for this exercise.

    if (!operator || isNaN(a) || isNaN(b))
      return NaN;

    return this._functionality[ operator ]( a, b );
  }

  public addMethod(operation: string, func: Function): void {
    this._functionality[ operation ] = func;
  }
  
  // I'm not sure if there's a need to specify [public]. It seems that methods and properties of the
  // class are public by default, without explicit specification.
} 

// BTW, [null] also belongs to "void". However, in TS, [null] and [undefined] have their own
// types of the same name, as well.

// An important memo: if a function returns, say, [null] instead of expected "number", it won't
// be an error since "null" and "undefined" are considered subtypes of some other types (like
// "number") *if* there's no [--strictNullChecks] flag in the options.

// The documentation is here:
// https://www.typescriptlang.org/docs/home.html