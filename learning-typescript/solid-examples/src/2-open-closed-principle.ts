// Open-Closed Principle.
// Software entities (such as classes, modules, functions) should be extendable
// without modifying.

interface AreaInterface {
  calculateArea(): number;
}

class Rectangle implements AreaInterface {
  constructor(public width: number, public height: number) {
    this.width = width;
    this.height = height;
  }

  public calculateArea(): number {
    const area = this.width * this.height;
    return area;
  }
}

class Circle implements AreaInterface {
  constructor(public radius: number) {
    this.radius = radius;
  }

  public calculateArea(): number {
    const area = this.radius * this.radius * Math.PI;
    return area;
  }
}

// Above shapes have a common method "calculateArea", so "AreaCalculator" can
// freely use it. We may add, say, "Square" class later, and we won't need to
// modify "AreaCalculator".

class AreaCalculator {
  public calculate(shape: AreaInterface): number {
    const area = shape.calculateArea();
    return area;
  }
}

const circle = new Circle(5);
const areaCalculator = new AreaCalculator();
console.log( areaCalculator.calculate(circle) );