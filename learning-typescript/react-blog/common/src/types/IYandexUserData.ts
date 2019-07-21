// Describes the user's data retrieved from Yandex after successful
// authentication. It's later transformed into an object consistent with
// "IProviderUserData" and sent to the client.

export default interface IYandexUserData {
  id: string;
  birthday: string | null;
  default_avatar_id: string;
  default_email: string;
  display_name: string;
  sex: string | null;
}