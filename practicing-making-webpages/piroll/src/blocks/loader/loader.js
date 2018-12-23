class Loader {
  constructor(...urls) {
    this._urlsList = urls;
  }

  get urlsList() {
    return this._urlsList;
  }

  addUrls(...urls) {
    urls.forEach(url => this._urlsList.push(url));
  }

  launch() {
    this.urlsList.forEach(url => {
      const script = document.createElement("script");
      script.src = url;
      script.type = "text/javascript";
      script.async = false; // scripts must be loaded coherently
      document.head.appendChild(script);
    });
  }

  reset() {
    this._urlsList = [];
  }
}