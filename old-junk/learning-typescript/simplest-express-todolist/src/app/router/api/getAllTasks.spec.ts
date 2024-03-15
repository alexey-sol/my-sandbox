import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/GET: get all tasks at "/api"`, () => {
  const taskData: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  it("should get all tasks", async () => {
    // Adding a new task.
    const taskDataResponse = 
      await sendData("/api", agent, taskData, "post");
    const returnedAgent = taskDataResponse && taskDataResponse.agent;

    // Getting everything DB contains.
    const response = returnedAgent && await returnedAgent.get("/api");
    const taskFromDb = response && response.body && response.body[0];

    response.should.have.status(200);
    response.should.be.json;
    response.body.should.be.a("array").be.lengthOf(1);
    taskFromDb.should.be.a("object");
    taskFromDb.should.have.property("_id").be.a("string");
    taskFromDb.should.have.property("content").be.a("string").eql(taskData.content);
    taskFromDb.should.have.property("createdAt").be.a("string").not.be.empty;
    taskFromDb.should.have.property("tagsList").be.a("array").have
      .members(taskData.tagsList).have.lengthOf(2);
    taskFromDb.should.have.property("title").be.a("string").eql(taskData.title);
    taskFromDb.should.have.property("updatedAt").be.a("string").not.be.empty;
  });

  it("should not get all tasks if there's no tasks", async () => {
    const response = await agent.get("/api");
    const body = response.body;

    response.should.have.status(200);
    response.should.be.json;
    body.should.be.a("array").be.empty;
  });
});