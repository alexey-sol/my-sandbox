import Joi from "joi";
import mongoose from "mongoose";
import User from "Server/models/User";
import IController from "Types/IController";
import IProviderUserData from "Types/IProviderUserData";
import IResult from "Types/IResult";
import IUserModel from "Types/IUserModel";
import IUserProfileUpdate from "Types/IUserProfileUpdate";

export default class UserController implements IController<
  IProviderUserData,
  IUserProfileUpdate,
  IUserModel
> {
  public async add(data: IProviderUserData) {
    const dataSchema = Joi.object().keys({
      birthday: Joi.string().allow(null),
      email: Joi.string().min(1).required(),
      name: Joi.string().min(1).required(),
      picture: Joi.string().optional(),
      provider: Joi.string().min(1).required(),
      providerId: Joi.string().min(1).required(),
      sex: Joi.string().allow(null)
    });

    const { error, value: userData } = Joi.validate(data, dataSchema,
      { stripUnknown: true });

    if (error)
      throw error;

    let user: IUserModel | null;

    // First, let's try to find the user in DB. Maybe they're just trying to
    // log in?
    try {
      user = await User.findOne({
        provider: userData.provider,
        providerId: userData.providerId
      });
    } catch (error) {
      throw error;
    }

    // Is there no such user? Then add them to DB!
    if (!user) {
      const userOptions = {
        _id: new mongoose.Types.ObjectId(),
        profile: {
          birthdate: (userData.birthday) ?
            new Date(userData.birthday) :
            null,
          comments: [],
          email: userData.email,
          name: userData.name,
          picture: userData.picture,
          posts: [],
          role: "user",
          sex: userData.sex
        },
        provider: userData.provider,
        providerId: userData.providerId
      };

      user = new User(userOptions);

      try {
        await user.save();
      } catch (error) {
        throw error;
      }
    }

    return user;
  }

  public async delete(id: string) {
    const fail: IResult = { result: "fail" };
    const success: IResult = { result: "success" };

    let deleted;

    try {
      deleted = await User.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }

    return (deleted.deletedCount === 0) ? fail : success;
  }

  public async get(id: string) {
    let user: IUserModel | null;

    try {
      user = await User.findById(id);
    } catch (error) {
      throw error;
    }

    return user;
  }

  public async getAll() {
    let users: IUserModel[];

    try {
      users = await User.find({});
    } catch (error) {
      throw error;
    }

    return users;
  }

  public async update(id: string, data: IUserProfileUpdate) {
    const dataSchema = Joi.object().keys({
      birthday: Joi.string().allow(null).optional(),
      email: Joi.string().optional(),
      name: Joi.string().optional(),
      picture: Joi.string().optional(),
      sex: Joi.string().allow(null).optional()
    });

    const { error, value: userData } = Joi.validate(data, dataSchema,
      { stripUnknown: true });

    if (error)
      throw error;

    const fail: IResult = { result: "fail" };
    const success: IResult = { result: "success" };

    let user: IUserModel | null;

    try {
      user = await User.findById(id);
    } catch (error) {
      throw error;
    }

    if (!user)
      return fail;

    let changesCount = 0;
    // Allows to find out if there are actual changes in fields.

    for (const key in user.profile) {
      const isValid = user.profile.hasOwnProperty(key);

      if (isValid && user.profile[key] !== userData[key]) {
        user.profile[key] = userData[key];
        changesCount++;
      }
    }

    if (changesCount === 0) // nothing new? Then let DB be
      return fail;

    try {
      await user.save();
    } catch (error) {
      throw error;
    }

    return success;
  }

}