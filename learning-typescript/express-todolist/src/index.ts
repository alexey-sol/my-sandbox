// These 2 resources turned out to be extremely useful for me when developing:
// https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html
// https://github.com/Microsoft/TypeScript-Node-Starter

// So, here's the plan. First we need to initialize the project using "npm init".
// There's nothing special except the one thing: we need to set "main" field to
// "lib" (see below why). Then we're installing the following packages: "express",
// "typescript", and "@types/express" (which contains TS' type definitions for 
// Express). 

// After that "tsconfig.json" should be initialized. I used the options specified
// in the article above (the 1st link) but I'd like to note that "outDir" may be 
// set to, say, "" which is the project's root directory. In our case, all the 
// compiled files will be put in "lib" directory. In turn, *.ts files are needed to 
// be put in "src" directory. When compiling, directory structure is saved, so there
// are no problems with it.

// In addition, we can use "Live compile + run" concept. But the exact plan
// suggested in the article, didn't work for me (nodemon didn't want to "recognize
// ts-node as something"). I've solved this issue as follows. First I installed 
// "ts-node" (*) and "nodemon" locally (as suggested). But then I've performed the 
// thing put forward by this (**) lad, Daniel. By creating "nodemon.json", this 
// concept of live compilation has worked for me. "npm start", and there it is: the 
// application is run as intended.

// (*) It's a kinda replacement of the standard Node REPL, that allows to execute TS.
// (**) https://stackoverflow.com/a/45102585

// Memo. Binaries of local packages can be launched easily by using NPX: "npx nodemon"
// being in the project directory. So there's no need to install all these packages
// globally.

// Regarding importing modules. Node modules can be imported in this way: "import
// express = require('express')". However, I use the standard ES6 syntax everywhere:
// "import express from 'express'". It works pretty well and doesn't look that weird.

// And as concerns the structure of the project. It's partly based on the material:
// https://blog.codeship.com/advanced-node-js-project-structure-tutorial/
// https://github.com/RisingStack/multi-process-nodejs-example
// I've slightly modified it although due to the utter simplicity of this project.

require("./util/logger");
require("./app");