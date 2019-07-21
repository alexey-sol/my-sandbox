// Describes an object of options for the request requiring token from Yandex
// (OAuth).

export default interface IYandexTokenRequestData {
  client_id: string;
  client_secret: string;
  code: string;
  grant_type: string;
}