// Liskov Substitution Principle.
// The derived class should extend, not substitute the behavior of the parent
// class. Say, we have super-class A and its sub-class B. So, if we replace all
// the uses of class B with class A, the program shouldn't change. After all,
// class B only *extends* class A.
// The example is based on: 
// https://springframework.guru/principles-of-object-oriented-design/liskov-substitution-principle/

class TransportationDevice {
  constructor(public name: string, public speed: number) {
    this.name = name;
    this.speed = speed;
  }

  get deviceName() {
    return this.name;
  }

  set deviceName(name: string) {
    this.name = name;
  }

  get deviceSpeed() {
    return this.speed;
  }

  set deviceSpeed(speed: number) {
    this.speed = speed;
  }
}

class DeviceWithoutEngine extends TransportationDevice {
  constructor(public name: string, public speed: number) {
    super(name, speed);
  }

  startMoving(): void { /* ... */ }
}

class Bicycle extends DeviceWithoutEngine {
  // ...
}

class Engine {
  constructor() { /* ... */ }
}

class DeviceWithEngine extends TransportationDevice {
  constructor(public name: string, public speed: number, public engine: Engine) {
    super(name, speed);
    this.engine = engine;
  }

  startEngine(): void { /* ... */ }
}

class Car extends DeviceWithEngine {
  // ...
}

// We could make one class "TrasportationDevice" with "startEngine" method, "Car"
// and "Bicycle" inherited from. But we would run across a discrepancy here: 
// "Bicycle" couldn't implement "startEngine" as it has no engine. So we splitted
// "TransportationDevice" into 2 sub-classes: devices *with* an engine and
// *without*.