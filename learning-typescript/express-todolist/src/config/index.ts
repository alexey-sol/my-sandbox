import isNodeEnv from "../util/isNodeEnv";

// Is it a local development? Use .env, then. dotenv allows to add contents
// of .env file to process.env. In production, we will set environmental
// variables by means of the service we use (say, Heroku).

if (isNodeEnv( "development" ))
  require("dotenv").config({ silent: true });

  // Silent? It seems, the official documentation lacks the description of
  // this option. As far as I've understood, it kills the error which occurs
  // if there's no .env file.

import config from "./web";
export default config;