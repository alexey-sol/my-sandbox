import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/PUT: update task at "/api/:taskId"`, () => {
  const fakeId = "000000000000000000000101";

  const task: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  const update: ITaskData = {
    content: "I still don't know what to write down here.",
    tagsList: ["more sensible stuff is here"],
    title: "Hello there"
  };

  it("should update task", async () => {
    // Adding a new task.
    const taskDataResponse = await sendData("/api", agent, task, "post");
    const returnedAgent = taskDataResponse.agent;
    const taskId = taskDataResponse.response.body._id;

    // Updating that task.
    const updatedTaskDataResponse =
      await sendData(`/api/${taskId}`, returnedAgent, update, "put");

    const response = updatedTaskDataResponse.response;
    response.should.be.json;
    response.should.have.status(200);

    const result = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.a("string").eql("success");
  });

  it("should not update if there's nothing to update", async () => {
    // Adding a new task.
    const taskDataResponse = await sendData("/api", agent, task, "post");
    const returnedAgent = taskDataResponse.agent;
    const taskId = taskDataResponse.response.body._id;

    // Updating that task.
    const updatedTaskDataResponse =
      await sendData(`/api/${taskId}`, returnedAgent, undefined, "put");

    const response = updatedTaskDataResponse.response;
    response.should.be.json;
    response.should.have.status(200);

    const result = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.a("string").eql("fail");
  });

  it("should not get task if task doesn't exist", async () => {
    const response = (await sendData(`/api/${fakeId}`, agent, update, "put"))
      .response;
    response.should.be.json;
    response.should.have.status(200);
  
    const result = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.a("string").eql("fail");
  });
});