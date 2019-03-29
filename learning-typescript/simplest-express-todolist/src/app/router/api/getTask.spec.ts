import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/GET: get task at "/api/:taskId"`, () => {
  const fakeId = "000000000000000000000101";
  const task: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  it("should get task", async () => {
    // Adding a new task.
    const taskDataResponse = await sendData("/api", agent, task, "post");
    const returnedAgent = taskDataResponse.agent;
    const taskId = taskDataResponse.response.body._id;

    // Getting the needed task.
    const response = await returnedAgent.get(`/api/${taskId}`);
    response.should.be.json;
    response.should.have.status(200);
    
    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("_id").be.a("string");
    body.should.have.property("content").be.a("string").eql(task.content);
    body.should.have.property("createdAt").be.a("string").not.be.empty;
    body.should.have.property("tagsList").be.a("array").have.members(task
      .tagsList).have.lengthOf(2);
    body.should.have.property("title").be.a("string").eql(task.title);
    body.should.have.property("updatedAt").be.a("string").not.be.empty;
  });

  it("should not get task if task doesn't exist", async () => {
    const response = await agent.get(`/api/${fakeId}`);
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object").be.empty;
  });
});