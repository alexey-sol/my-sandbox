// Interface Segregation Principle.
// Interfaces should be splitted into smaller ones which meet the needs of
// users better.

// Interfaces representing ISmartDevice.
interface IPrinter {
  print(): void;
}

interface IFax {
  fax(): void;
}

interface IScanner {
  scan(): void;
}

class AllInOnePrinter implements IPrinter, IFax, IScanner {
  print(): void { /* ... */ }
  fax(): void { /* ... */ }
  scan(): void { /* ... */ }
}

// Now we can implement some simple device, say, a thing which can only print.
// If there was one interface with many methods, such a device would have many
// inapplicable methods.

class EconomicPrinter implements IPrinter {
  print(): void { /* ... */ }
}