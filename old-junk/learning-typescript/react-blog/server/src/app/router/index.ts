import express from "express";
import authRoute from "./authRoute";
import publicRoute from "./publicRoute";
import mw from "../middleware";

const authRouter = express.Router(); // starts with "/auth"
const publicRouter = express.Router(); // the paths start with "/"

// Providing the user with a session.
authRouter.post("/", authRoute.authenticate);

// Redirecting the user to the provider.
authRouter.get("/yandex", mw.addSocketIdToSession, authRoute.redirectToYandex);

// Callback URI for the provider.
authRouter.get("/yandex/callback", authRoute.getYandexData);

// Logout.
authRouter.get("/logout", authRoute.logout);

// Handle every other route with static "index.html".
publicRouter.get("*", publicRoute);

export { authRouter, publicRouter };