import chai from "chai";
import server from "../../server";
import sendData from "../../../common/util/sendDataViaAgent";
import ITaskData from "../../../common/types/ITaskData";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/POST: add task at "/api"`, () => {
  const taskData: ITaskData = {
    content: "Uhm...",
    tagsList: ["junk", "gibberish"],
    title: "Huh?"
  };

  it("should add new task", async () => {
    const response = (await sendData("/api", agent, taskData, "post")).response;
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("_id").be.a("string");
    body.should.have.property("content").be.a("string").eql(taskData.content);
    body.should.have.property("createdAt").be.a("string").not.be.empty;;
    body.should.have.property("tagsList").be.a("array").have
      .members(taskData.tagsList).have.lengthOf(2);
    body.should.have.property("title").be.a("string").eql(taskData.title);
    body.should.have.property("updatedAt").be.a("string").not.be.empty;;
  });

  it("should add new task if optional fields aren't set", async () => {
    const taskCopy = Object.assign({}, taskData);
    delete taskCopy.content;
    delete taskCopy.tagsList;

    const response = (await sendData("/api", agent, taskCopy, "post")).response;
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("_id").be.a("string");
    body.should.have.property("content").be.a("string").be.empty;
    body.should.have.property("createdAt").be.a("string").not.be.empty;;
    body.should.have.property("tagsList").be.a("array").be.empty;
    body.should.have.property("title").be.a("string").eql(taskData.title);
    body.should.have.property("updatedAt").be.a("string").not.be.empty;;
  });

  it("should not add new task if required fields aren't set",
  async () => {
    const taskCopy = Object.assign({}, taskData);
    delete taskCopy.title;

    const response = (await sendData("/api", agent, taskCopy, "post")).response;
    response.should.be.json;
    response.should.have.status(200);

    const body = response.body;
    body.should.be.a("object");
    body.should.have.property("isJoi").eql(true);
    body.should.have.property("name").eql("ValidationError");
    body.should.have.property("details").be.a("array");
    body.should.have.property("_object").be.a("object").eql(taskCopy);

    const detail = body.details[0];
    detail.should.be.a("object");
    detail.should.have.property("message").be.a("string").eql(`"title" is required`);
    detail.should.have.property("type").be.a("string").eql("any.required");
  });
});