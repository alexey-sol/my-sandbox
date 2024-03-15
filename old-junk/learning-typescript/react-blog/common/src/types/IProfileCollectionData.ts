// Describes data collected from the fields of the form updating the user's
// profile (on the client). The fields themselves (as elements) are described
// by "IProfileCollection".

export default interface IProfileCollectionData {
  birthdate: string | null;
  email: string;
  sex: string | null;
  name: string;
  picture: string;
}