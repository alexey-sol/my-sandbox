import IIndexer from "./IIndexer";

// Describes a data object sent from the client on "profileSubmit" event.

export default interface IUserProfileUpdate extends IIndexer<any> {
  birthdate?: Date | null;
  email?: string;
  name?: string;
  picture?: string;
  sex?: string | null;
}