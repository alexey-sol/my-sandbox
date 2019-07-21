// Describes an object providing session control for the user: the possibility
// to sign in / out.

export default interface ISessionControl {
  login(provider: string): void;
  logout(): void;
}