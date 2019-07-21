// Describes the interface (on the client) controlling the loading screen:
// when it must appear/disappear.

export default interface ILoadingScreenControl {
  decrementLoadingSubsNum(): void;
  incrementLoadingSubsNum(): void;
}