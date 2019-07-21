// Describes the Yandex' answer containing token for OAuth.

export default interface IYandexToken {
  access_token: string;
  expires_in: number;
  refresh_token: string;
  token_type: string;
}