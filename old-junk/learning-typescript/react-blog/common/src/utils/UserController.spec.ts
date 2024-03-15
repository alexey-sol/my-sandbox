import chai from "chai";
import UserController from "./UserController";
import IProviderUserData from "Types/IProviderUserData";
import IResult from "Types/IResult";
import IUserModel from "Types/IUserModel";
import IUserProfile from "Types/IUserProfile";

const should = chai.should();
const userController = new UserController();

describe("UserController", () => {
  const fakeUserId = "00000000000000000000000a";

  const userData: IProviderUserData = {
    birthday: null,
    email: "rd@test.com",
    name: "Dwayne Dibley",
    picture: "someurl",
    provider: "google",
    providerId: "123",
    sex: null
  };

  describe("add", () => {
    it("should add user", async () => {
      const user: IUserModel = await userController.add(userData);
      user.should.be.a("object");
      user.should.have.property("createdAt").be.a("date");
      user.should.have.property("profile").be.a("object");
      user.should.have.property("provider").be.a("string").eql(userData.provider);
      user.should.have.property("providerId").be.a("string").eql(userData.providerId);
      user.should.have.property("updatedAt").be.a("date");

      const userProfile: IUserProfile = user.profile;
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

    it("should not add user if \"email\" isn't specified", async () => {
      const userDataCopy = Object.assign({}, userData);
      delete userDataCopy.email; // "email" is a required field

      try {
        await userController.add(userDataCopy);
      } catch (error) {
        error.should.be.a("error");
        error.should.have.property("details").be.a("array");
        error.should.have.property("isJoi").eql(true);
        error.should.have.property("name").eql("ValidationError");

        const detail = error.details[0];
        detail.should.be.a("object");
        detail.should.have.property("message").be.a("string").eql(`"email" is required`);
        detail.should.have.property("type").be.a("string").eql("any.required");
      }
    });
  });

  describe("delete", () => {
    it("should delete user", async () => {
      const userId = (await userController.add(userData))._id;

      const result: IResult = await userController.delete(userId);
      result.should.be.a("object");
      result.should.have.property("result").be.eql("success");
    });

    it("should not delete nonexistent user", async () => {
      const result: IResult = await userController.delete(fakeUserId);
      result.should.be.a("object");
      result.should.have.property("result").be.eql("fail");
    });
  });

  describe("get", () => {
    it("should get user", async () => {
      const userId = (await userController.add(userData))._id;

      const user = <IUserModel> (await userController.get(userId));
      user.should.be.a("object");
      user.should.have.property("createdAt").be.a("date");
      user.should.have.property("profile").be.a("object");
      user.should.have.property("provider").be.a("string").eql(userData.provider);
      user.should.have.property("providerId").be.a("string").eql(userData.providerId);
      user.should.have.property("updatedAt").be.a("date");

      const userProfile: IUserProfile = user.profile;
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

    it("should not get nonexistent user", async () => {
      const result = await userController.get(fakeUserId);
      should.equal(result, null);
    });
  });

  describe("update", () => {
    it("should update user", async () => {
      const userId = (await userController.add(userData))._id;
      const updatedUserData = Object.assign({}, userData);
      delete updatedUserData.email;
      delete updatedUserData.name;
      updatedUserData.sex = "male";

      const result: IResult = await userController.update(userId, updatedUserData);
      result.should.be.a("object");
      result.should.have.property("result").be.eql("success");
    });

    it("should not update user if there's nothing to update", async () => {
      const userId = (await userController.add(userData))._id;
      const updatedUserData = {}; // all the fields are optional when updating

      const result: IResult = await userController.update(userId, updatedUserData);
      result.should.be.a("object");
      result.should.have.property("result").be.eql("fail");
    });

    it("should not update nonexistent user ", async () => {
      const updatedUserData = Object.assign({}, userData);
      delete updatedUserData.email;

      const result: IResult = await userController.update(fakeUserId, updatedUserData);
      result.should.be.a("object");
      result.should.have.property("result").be.eql("fail");
    });
  });
});