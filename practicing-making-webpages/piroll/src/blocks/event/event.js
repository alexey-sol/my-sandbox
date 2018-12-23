// It's been made according to the following implemenatation of the pub/sub
// pattern: https://gist.github.com/learncodeacademy/777349747d8382bfb722

class Event {
  constructor() {
    this._events = {};
  }

  // Returns all the events.
  get events() {
    return this._events;
  }

  // Calls all the functions of the relative events, passing on "payload" data
  // to those functions.
  emit(eventName, payload) {
    const event = this.events[eventName];

    if (event)
      event.forEach(fn => fn(payload));
  }

  // Removes "fn" named function from the list of the relative event.
  off(eventName, fn) {
    const event = this.events[eventName];

    if (event) {
      this._events[eventName] = 
        event.filter(eventFn => eventFn.name !== fn.name);
    }
  }

  // Puts "fn" named function in the list of the relative event.
  on(eventName, fn) {
    if (!fn.name)
      return console.error(
        `Function passed on to "on" method, must be named.`
      );

    const event = this.events[eventName] || [];

    if (!isPresentedIn(fn, event)) {
      this._events[eventName] = event;
      this._events[eventName].push(fn);
    }

    function isPresentedIn(fn, event) {
      let isPresented = false; 
      event.forEach(eventFn => {
        isPresented = (eventFn.name === fn.name) ? true : isPresented;
        // Is condition false? Preserve the old value, then.
      });
      
      return isPresented;
    }
  }
}