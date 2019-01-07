// It's a simple version assuming that all the elements are already presented
// on the page. It provides no render.

// Tab(event: Event, elem: HTMLElement): Tab;
class Tab {
  constructor(event, elem) {
    this.event = event;
    this.elem = elem;
    // There's really not much point in using this "event" object... A new toy.
  }

  // init(): void;
  init() {
    const contentList = this.elem.querySelectorAll(".tab__content");

    if (!contentList || !contentList[0])
      return console.error("No content to show");

    // It's assumed that all the elements with content are hidden by default.
    // So choose one to be shown. Let it be the middle one.
    const defaultContent = contentList[ Math.floor(contentList.length / 2) ];
    defaultContent.classList.add("tab__content_active");

    // Okay, let's now deal with the selectors ("dots").
    const tabSelectorsList = this.elem.querySelectorAll(".tab__dot");

    if (!tabSelectorsList || !tabSelectorsList[0])
      return console.error("No selectors to choose content");

    const self = this;
    this.event.on("click", this.openTab.bind(self));

    // The number of tabs selectors equals to the number of the elements with
    // content. It means that if we get both lists, the corresponding indexes
    // are related to each other. The 1st tab selector ("dot") is associated
    // with the 1st blockquote, and so on.

    tabSelectorsList.forEach((tabSelector, index) =>
      tabSelector.onclick = () =>
        this.event.emit("click", contentList[index]));
  }

  // openTab(tabContentToShow: HTMLElement): void;
  openTab(tabContentToShow) {
    if (!tabContentToShow || !(tabContentToShow instanceof HTMLElement))
      return console.error(`"tabContentToShow" argument is ${typeof
        tabContentToShow} while it must be HTML element`);

    // First, loop through all the elements with content and make them hidden.
    this.elem.querySelectorAll(".tab__content_active").forEach(elem => {
      elem.classList.remove("tab__content_active");
    })

    // Then make the needed one visible.
    tabContentToShow.classList.add( "tab__content_active");
  }
}

new Tab(
  new Event(),
  document.querySelector(".tab")
).init();