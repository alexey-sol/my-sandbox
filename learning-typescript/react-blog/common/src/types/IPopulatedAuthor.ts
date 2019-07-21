import IUserProfile from "./IUserProfile";

// Describes a post's field "author" after population (by default, it's a
// MongoDB's ID; after population it becomes an object containing the user's
// profile).

export default interface IPopulatedAuthor {
  profile: IUserProfile;
}