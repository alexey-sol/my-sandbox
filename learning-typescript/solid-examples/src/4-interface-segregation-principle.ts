// Interface Segregation Principle.
// Interfaces should be splitted into smaller ones which meet the needs of
// users better.

// Interfaces representing ISmartDevice.
interface PrinterInterface {
  print(): void;
}

interface FaxInterface {
  fax(): void;
}

interface ScannerInterface {
  scan(): void;
}

class AllInOnePrinter implements PrinterInterface, FaxInterface, ScannerInterface {
  print(): void { /* ... */ }
  fax(): void { /* ... */ }
  scan(): void { /* ... */ }
}

// Now we can implement some simple device, say, a thing which can only print.
// If there was one interface with many methods, such a device would have many
// inapplicable methods.

class EconomicPrinter implements PrinterInterface {
  print(): void { /* ... */ }
}