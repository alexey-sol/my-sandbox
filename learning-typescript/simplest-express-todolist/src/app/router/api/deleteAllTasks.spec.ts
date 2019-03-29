import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/DELETE: delete all tasks at "/api"`, () => {
  const taskData: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  it("should delete all tasks", async () => {
    // Adding a new task.
    const taskDataResponse = await sendData("/api", agent, taskData, "post");
    const returnedAgent = taskDataResponse.agent;

    // Deleting.
    const response = await returnedAgent.delete("/api");
    response.should.be.json;
    response.should.have.status(200);

    const body = response && response.body;
    body.should.be.a("object");
    body.should.have.property("result").be.a("string").eql("success");
  });

  it("should not delete all tasks if collection doesn't exist",
  async () => {
    const response = await agent.delete("/api");
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("result").be.a("string").eql("fail");
  });
});