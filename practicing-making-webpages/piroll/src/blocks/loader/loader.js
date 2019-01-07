// Loader(...urls: string[]): Loader;
class Loader {
  constructor(...urls) {
    this._urlsList = urls;
  }

  // urlsList: string[];
  get urlsList() {
    return this._urlsList;
  }

  // addUtls(...urls: string[]): void;
  addUrls(...urls) {
    urls.forEach(url => this._urlsList.push(url));
  }

  // execute(): void;
  execute() {
    this.urlsList.forEach(url => {
      const script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.async = false; // scripts must be loaded coherently
      document.head.appendChild(script);
    });
  }

  // reset(): void;
  reset() {
    this._urlsList = [];
  }
}