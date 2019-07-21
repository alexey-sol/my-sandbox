// Describes a collection of fields when gathering data from the form updating
// the user's profile (on the client).

export default interface IProfileCollection extends HTMLCollection {
  birthdate: HTMLInputElement;
  email: HTMLInputElement;
  sex: HTMLSelectElement;
  name: HTMLInputElement;
  picture: HTMLInputElement;
}