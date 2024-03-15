// Describes the user's data retrieved from the provider after successful
// authentication. It's used for a Socket.IO event.

export default interface IProviderUserData {
  birthday: string | null;
  email: string;
  name: string;
  picture: string;
  provider: string;
  providerId: string;
  sex: string | null;
}