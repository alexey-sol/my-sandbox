import chai from "chai";
import server from "../../server";
import sendData from "Utils/sendDataViaAgent";
import IResult from "Types/IResult";

const should = chai.should();
const agent = chai.request.agent(server);

describe(`/GET: log out user at "/auth/logout"`, () => {
  it("should destroy session", async () => {
    const response = (await sendData("/auth/logout", agent)).response;
    response.should.have.status(200);
    response.should.not.have.cookie("sess");

    const result: IResult = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.eql("success");
  });
});