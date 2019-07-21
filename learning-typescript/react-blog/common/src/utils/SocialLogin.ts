import request from "request-promise";
import IProviderError from "Types/IProviderError";
import IYandexToken from "Types/IYandexToken";
import IYandexTokenRequestData from "Types/IYandexTokenRequestData";
import IYandexUserData from "Types/IYandexUserData";

// A class containing static methods for signing the user up via various
// social networks. So it's, basically, just a bunch of functions pursuing
// one goal.

export default class SocialLogin {
  // Exchanges the code for the token and returns that token through a promise.
  public static getYandexToken(tokenRequestData: IYandexTokenRequestData):
  Promise<IYandexToken | IProviderError> {
    return new Promise((resolve, reject) => {
      const reqData = tokenRequestData;
      const form = {
        client_id: reqData.client_id,
        client_secret: reqData.client_secret,
        code: reqData.code,
        grant_type: reqData.grant_type
      };

      request({
        form,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        json: true,
        method: "POST",
        uri: "https://oauth.yandex.ru/token"
      })
      .then(token => resolve(token))
      .catch(error => reject(error));
    });
  }

  public static requestYandexData(token: IYandexToken): Promise<IYandexUserData
  | IProviderError> {
    return new Promise((resolve, reject) => {
      request({
        headers: { Authorization: `OAuth ${token.access_token}` },
        method: "GET",
        uri: "https://login.yandex.ru/info?format=json"
      }) // https://tech.yandex.ru/passport/doc/dg/reference/request-docpage/
      .then(userData => resolve(JSON.parse(userData)))
      .catch(error => reject(error));
    });
  }
}