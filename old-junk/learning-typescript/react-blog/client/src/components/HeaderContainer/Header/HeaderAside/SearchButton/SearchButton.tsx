import React from "react";
import IconArrow from "Components/IconArrow/IconArrow";
import IconSearch from "Components/IconSearch/IconSearch";
import SearchLine from "./SearchLine/SearchLine";
import styles from "./SearchButton.module.scss";

interface IState {
  isOpen: boolean;
}

export default class SearchButton extends React.Component<{}, IState> {
  private searchRef: React.RefObject<HTMLButtonElement>;

  constructor(props: {}) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.searchRef = React.createRef();
    this.state = { isOpen: false };
  }

  public componentDidMount = () =>
    document.addEventListener("click", this.handleClick)

  public componentWillUnmount = () =>
    document.removeEventListener("click", this.handleClick)

  // If the search line is closed (by default), show "search" icon, otherwise
  // show "arrow" icon.
  public render = () => (
    <React.Fragment>
      <button
        ref={ this.searchRef }
        className={ styles.SearchButton }
        title="Поиск"
      >
        {
          (this.state.isOpen) ?
            (<IconArrow className={ styles.Icon } />) :
            (<IconSearch className={ styles.Icon } />)
        }
      </button>

      {
        this.state.isOpen &&
        <SearchLine id="search-line" handleKeyDown={ this.handleKeyDown } />
      }
    </React.Fragment>
  )

  private handleClick(event: React.MouseEvent | MouseEvent) {
    const target = event.target && event.target as Node;
    const button = this.searchRef.current;
    const searchLine = document.getElementById("search-line");

    if (!target || !button) return;

    // Click on the button? Change state (and perform search if there's input).
    if (button.contains(target)) {
      const input = searchLine && (searchLine as HTMLInputElement).value;
      (input) ? this.search(input) : null;

      this.setState({ isOpen: !this.state.isOpen });

    // Click on the search line? Do nothing.
    } else if (target === searchLine) {
      return;

    // Click outside of the element? Hide the search line.
    } else {
      this.setState({ isOpen: false });
    }
  }

  private handleKeyDown(event: React.KeyboardEvent) {
    if (event.key === "Escape")
      this.setState({ isOpen: false });

    else if (event.key === "Enter") {
      const target = event.target && (event.target as HTMLInputElement);
      this.search(target.value);
      this.setState({ isOpen: false });
    }
  }

  private search(value: string) {
    console.log(value);
  }
}