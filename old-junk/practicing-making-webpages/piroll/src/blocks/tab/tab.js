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
    if (!this.elem) return;

    const contentList = this.elem.querySelectorAll(".tab__content"),
          tabSelectorsList = this.elem.querySelectorAll(".tab__dot");

    if (!tabSelectorsList || !tabSelectorsList[0])
      return console.error("No selectors to choose content");

    else if (!contentList || !contentList[0])
      return console.error("No content to show");

    // The number of tabs selectors equals to the number of the elements with
    // content. It means that if we get both lists, the corresponding indexes
    // are related to each other. The 1st tab selector ("dot") is associated
    // with the 1st blockquote, and so on.

    // It's assumed that all the elements with content are hidden by default.
    // So choose one to be shown. Let it be the middle one ("indexByDefault").

    const indexByDefault = Math.floor(contentList.length / 2);
    const defaultContent = contentList[ indexByDefault ],
          defaultTabSelector = tabSelectorsList[ indexByDefault ];

    defaultContent.classList.add("tab__content_active");
    defaultTabSelector.classList.add("tab__dot_active");

    // It's time to set handlers.
    const self = this;
    this.event.on("click", this.openTab.bind(self));

    tabSelectorsList.forEach((tabSelector, index) =>
      tabSelector.onclick = () =>
        this.event.emit("click", index));
  }

  // openTab(activeIndex: string | number): void;
  openTab(activeIndex) {
    if (!activeIndex && isNaN(activeIndex)) {
      return console.error(`"activeIndex" argument is ${typeof activeIndex
        } while it must be number or string convertible to number`);
    }

    // First, loop through all the active elements to make them hidden.
    this.elem.querySelectorAll(".tab__content_active").forEach(elem => {
      elem.classList.remove("tab__content_active");
    })

    this.elem.querySelectorAll(".tab__dot_active").forEach(elem => {
      elem.classList.remove("tab__dot_active");
    })

    // Then make the needed pair "tab-content - tab-selector" visible.
    const contentList = this.elem.querySelectorAll(".tab__content"),
          tabSelectorsList = this.elem.querySelectorAll(".tab__dot");

    contentList[ +activeIndex ].classList.add( "tab__content_active");
    tabSelectorsList[ +activeIndex ].classList.add( "tab__dot_active");
  }
}

new Tab(
  new Event(),
  document.querySelector(".tab")
).init();