import Joi from "joi";
import { Request } from "express";
import logger from "Utils/logger";

type IRedirectToYandex = (request: Request) => void;

let redirectToYandex: IRedirectToYandex;

// Is envoked when the user clicks on "log in" button. Creates a URL for
// requesting OAuth code in the provider, then passes this URL back to the
// client (so that the user will be redirected to the provider and will be
// able to provide the application with an access to their profile; or not).
redirectToYandex = function(request: Request): void {
  const envSchema = Joi.object().keys({
    CLIENT_ID_YANDEX: Joi.string().min(1).required()
  });

  const { error, value: env } = Joi.validate(process.env, envSchema,
    { stripUnknown: true });

  if (error) {
    logger.error(`Client ID for Yandex is needed to be specified as `
      + `environment variable!`, error);
    return;
  }

  // Socket ID to contact the right client. It's attached to the redirect URL
  // as a "state" query string.
  const socketId = request.query && request.query.socketId;
  const requestCodeUrl = `https://oauth.yandex.ru/authorize?response_type`
  + `=code&client_id=${ env.CLIENT_ID_YANDEX }&state=${ socketId }`;

  // This URL will be put in the popup's href.
  const io = request.app.get("_io");
  io.in(socketId).emit("redirectUrl", requestCodeUrl);
};

export default redirectToYandex;