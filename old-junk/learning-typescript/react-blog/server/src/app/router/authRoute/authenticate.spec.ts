import chai from "chai";
import server from "../../server";
import sendData from "Utils/sendDataViaAgent";
import UserController from "Utils/UserController";
import IProviderUserData from "Types/IProviderUserData";
import IResult from "Types/IResult";
import IUserProfile from "Types/IUserProfile";

const should = chai.should();
const agent = chai.request.agent(server);
const userController = new UserController();

describe(`/POST: authenticate user at "/auth"`, () => {
  const fictiveUserId = "00000000000000000000000a";

  const userData: IProviderUserData = {
    birthday: null,
    email: "rd@test.com",
    name: "Dwayne Dibley",
    picture: "someurl",
    provider: "google",
    providerId: "123",
    sex: null
  };

  it("should authenticate user and send their profile", async () => {
    const userId = (await userController.add(userData))._id;

    const response =
      (await sendData("/auth", agent, { userId }, "post")).response;

    response.should.be.json;
    response.should.have.status(200);
    response.should.have.cookie("sess");

    const userProfile: IUserProfile = response.body;
    userProfile.should.be.a("object");
    userProfile.should.have.property("birthdate").be.eql(userData.birthday);
    userProfile.should.have.property("comments").be.a("array").be.empty;
    userProfile.should.have.property("email").be.a("string").eql(userData.email);
    userProfile.should.have.property("name").be.a("string").eql(userData.name);
    userProfile.should.have.property("picture").be.a("string").eql(userData.picture);
    userProfile.should.have.property("posts").be.a("array").be.empty;
    userProfile.should.have.property("role").be.a("string").eql("user");
    userProfile.should.have.property("sex").be.eql(userData.sex);
  });

  it("should not authenticate user without their ID", async () => {
    const response =
      (await sendData("/auth", agent, { userId: undefined }, "post"))
      .response;

    response.should.have.status(200);
    response.should.have.cookie("sess");

    const result: IResult = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.eql("fail");
  });

  it("should not authenticate nonexistent user", async () => {
    const response =
      (await sendData("/auth", agent, { userId: fictiveUserId }, "post"))
      .response;

    response.should.have.status(200);
    response.should.have.cookie("sess");

    const result: IResult = response.body;
    result.should.be.a("object");
    result.should.have.property("result").be.eql("fail");
  });
});