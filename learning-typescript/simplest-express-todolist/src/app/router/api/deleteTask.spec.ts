import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/DELETE: delete task at "/api/:taskId"`, () => {
  const fakeId = "000000000000000000000101";
  const taskData: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  it("should delete task", async () => {
    // Adding a new task.
    const taskDataResponse = await sendData("/api", agent, taskData, "post");
    const returnedAgent = taskDataResponse.agent;
    const taskId = taskDataResponse.response.body._id;

    // Deleting the specified task.
    const response = await returnedAgent.delete(`/api/${taskId}`);
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("result").be.a("string").eql("success");
  });

  it("should not delete task if task doesn't exist", async () => {
    const response = await agent.delete(`/api/${fakeId}`);
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("result").be.a("string").eql("fail");
  });
});