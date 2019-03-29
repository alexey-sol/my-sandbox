# Simplest Express To-Do List
First of all, this application has no graphical interface. Oh well. It's been made just for studying how TypeScript works in back-end, after all. So the choice how to communicate with the server, is yours: it may be, say, Postman or cURL. Let's consider cURL here since it's kinda tedious to form HTTP-requests via Postman.

## CRUD using cURL
The API looks like this:
- POST `${protocol}${hostname}/api` - *Add the task*;
- PUT `${protocol}${hostname}/api/:taskId` - *Update the task*;
- GET `${protocol}${hostname}/api` - *Get all the tasks*;
- GET `${protocol}${hostname}/api/:taskId` - *Get the task*;
- DELETE `${protocol}${hostname}/api` - *Delete all the tasks*;
- DELETE `${protocol}${hostname}/api/:taskId` - *Delete the task*.

So, let's add a new task to DB. With the use of cURL, a request may look like this one (the field `title` is required, `content` and `tagsList` fields are optional):
```
curl --data '{"title": "Huh?", "content": "Uhm...", "tagsList": ["junk", "gibberish"]}' --header "Content-Type: application/json" http://127.0.0.1:8081/api
```
We should get such a response:
```
{
  "tagsList": ["junk", "gibberish"],
  "_id": "5bfc318becff0a06b8bf89ea",
  "content": "Uhm...",
  "title": "Huh?",
  "createdAt": "2018-11-26T17:46:51.396Z",
  "updatedAt": "2018-11-26T17:46:51.396Z",
  "__v": 0
}
```
Alright, we've created a new document. And we've even got its ID. So let's use that ID and tune the document just a bit:
```
curl -X PUT -d '{"content": "Hello there"}' -H "Content-Type: application/json" http://127.0.0.1:8081/api/5bfc318becff0a06b8bf89ea
```
The response comes: `{ "result": "success" }`. So let's now figure out how our task looks at the moment (it's needed to be said in advance that it will give us the same output as the previous one, so we'll omit it for the sake of brevity):
```
curl -H "Content-Type: application/json" http://127.0.0.1:8081/api/5bfc318becff0a06b8bf89ea
``` 
Fine, lastly, let's check out DELETE method:
```
curl -X DELETE -H "Content-Type: application/json" http://127.0.0.1:8081/api/5bfc318becff0a06b8bf89ea
```
`{ "result": "success" }` is the answer to this. Is it true, has the document been really deleted? Let's find out, just for giggles, you know:
```
curl -H "Content-Type: application/json" http://127.0.0.1:8081/api
```
Yep, there's nothing to show to us, indeed: the server sends to us an empty array.

## A few notes to myself
The following are rather notes for myself how I've set up this application. [This article](https://basarat.gitbooks.io/typescript/docs/quick/nodejs.html) helped me a lot.

So, here's the plan. The first thing we need to do is to initialize the project via `npm init`. It's a pretty standard thing, however there's a clause we need to pay attention to: `main` field should be set to `lib` (see below for details). Then we need to install the following packages: `express`, `typescript`, and `@types/express` (the packages with `@types` prefix are type definitions for TS); these are the most essential.

After that `tsconfig.json` should be initialized. The field `outDir` specifies the output folder where all the compiled files will be put in. It's `lib` in our case (while an empty string would represent the project's root directory). In turn, `*.ts` files are needed to be put in `src` directory.

For development environment, it's useful to implement *Live compile + run* concept. The way to do that is described in the article, however it didn't work for me: all I got was "ts-node is not recognized as an internal or external command, operable program or batch file". The solution was the following. First I've installed `ts-node` and `nodemon` locally (as suggested in the article). But then I've performed the thing put forward by [this lad](https://stackoverflow.com/a/45102585), Daniel. By creating `nodemon.json`, this concept of live compilation has worked for me finally: `npm start`, and there it is, the application is run as intended.

Lastly, the structure of the project is based on these 2 examples: [Multi-process Node.js application example](https://github.com/RisingStack/multi-process-nodejs-example) ([here's the article](https://blog.codeship.com/advanced-node-js-project-structure-tutorial/) explaining it) and [TypeScript Node Starter](https://github.com/Microsoft/TypeScript-Node-Starter#typescript-node-starter). As concerns the 1st example, I had to make some changes due to the utter simplicity of my project.