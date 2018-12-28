// Dependency Inversion Principle.
// High-level modules should not depend on low-level modules. Both types of the
// modules should depend on abstractions.

interface DeveloperInterface {
  develop(): void;
}

class BackEndDeveloper implements DeveloperInterface {
  public develop(): void { 
    this.writeJava(); 
  }

  private writeJava(): void { 
    console.log("Writing Java.");
  }
}

class FrontEndDeveloper implements DeveloperInterface {
  public develop(): void { 
    this.writeJavaScript(); 
  }

  private writeJavaScript(): void {
    console.log("Writing JavaScript.");
  }
}

class Project {
  constructor(private developers: DeveloperInterface[]) {
    this.developers = developers;
  }
  // Here, "Project" doesn't depend on lower-level "...EndDeveloper" classes,
  // but rather abstractions.

  implement(): void {
    this.developers.forEach(dev => dev.develop());
  }
}

// Implementing.

const developers: DeveloperInterface[] = [
  new BackEndDeveloper(),
  new BackEndDeveloper(),
  new FrontEndDeveloper()
];

const project = new Project(developers);
project.implement();