# Simplest Express To-Do List
First of all, this application has no graphical interface. Oh well. It's been made just for studying how TypeScript works in back-end, after all. So the choice how to communicate with the server, is yours: it may be, say, Postman or cURL. Let's consider cURL here since it may be rather tedious to form HTTP-requests via Postman.

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
curl --data '{"title": "Test", "content": "Huh?", "tagsList": ["junk", "gibberish"]}' --header "Content-Type: application/json" http://127.0.0.1:8081/api
```
We should get such a response:
```
{
  "tagsList": ["junk", "gibberish"],
  "_id": "5c9e5c0e4e35c3007cfa1ae6",
  "content": "Huh?",
  "title": "Test",
  "createdAt": "2019-03-29T17:55:26.672Z",
  "updatedAt": "2019-03-29T17:55:26.672Z",
  "__v": 0
}
```
Alright, we've created a new document. And we've even got its ID. So let's use that ID and tune the document just a bit:
```
curl -X PUT -d '{"content": "Hello there"}' -H "Content-Type: application/json" http://127.0.0.1:8081/api/5c9e5c0e4e35c3007cfa1ae6
```
The response comes: `{ "result": "success" }`. So let's now figure out how our task looks at the moment. It could be done in such a way:
```
curl -H "Content-Type: application/json" http://127.0.0.1:8081/api/5c9e5c0e4e35c3007cfa1ae6
```
And we can see that the document's been successfuly updated, indeed:
```
{
  "tagsList": ["junk","gibberish"],
  "_id": "5c9e5c0e4e35c3007cfa1ae6",
  "content": "Hello there",
  "title": "Test",
  "createdAt": "2019-03-29T17:55:26.672Z",
  "updatedAt": "2019-03-29T17:57:01.476Z",
  "__v": 0
}
```
Fine, it's time to check out DELETE method:
```
curl -X DELETE -H "Content-Type: application/json" http://127.0.0.1:8081/api/5c9e5c0e4e35c3007cfa1ae6
```
`{ "result": "success" }` is the answer to this. Is it true, has the document been really deleted? Let's find out, just for giggles, you know:
```
curl -H "Content-Type: application/json" http://127.0.0.1:8081/api
```
Yep, there's nothing to show to us: we've got an empty array.