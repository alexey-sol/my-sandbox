import Joi from "joi";
import mongoose from "mongoose";
import sanitizeHtml from "sanitize-html";
import Post from "Server/models/Post";
import IController from "Types/IController";
import IPostData from "Types/IPostData";
import IPostModel from "Types/IPostModel";
import IPostUpdate from "Types/IPostUpdate";
import IResult from "Types/IResult";

const sanitizeHtmlOptions = {
  allowedAttributes: {
    span: ["style", "data-*"]
  },
  allowedTags: ["em", "span", "strong", "li", "p", "ul"]
};

export default class PostController implements IController<
  IPostData,
  IPostUpdate, // get rid of it? 1 interface should be enough for both cases: data and update
  IPostModel
> {
  public async add(data: IPostData) {
    const bodySchema = Joi.object().keys({
      content: Joi.string().min(1).required(),
      pictures: Joi.array().optional()
    });

    const dataSchema = Joi.object().keys({
      author: Joi.string().length(24).required(),
      body: bodySchema,
      header: Joi.string().min(1).required(),
      tags: Joi.array().optional()
    });

    const { error, value: postData } = Joi.validate(data, dataSchema,
      { stripUnknown: true });

    if (error)
      throw error;

    let post: IPostModel;

    try {
      post = await Post.create({
        _id: new mongoose.Types.ObjectId(),
        author: postData.author,
        body: {
          content: sanitizeHtml(postData.body.content, sanitizeHtmlOptions),
          pictures: postData.body.pictures
        },
        comments: [],
        header: postData.header,
        tags: postData.tags || []
      });
    } catch (error) {
      throw error;
    }

    await Post.populate(post, {
      path: "author",
      select: "profile -_id"
    });

    return post;
  }

  public async delete(id: string) {
    const fail: IResult = { result: "fail" };
    const success: IResult = { result: "success" };

    let deleted;

    try {
      deleted = await Post.deleteOne({ _id: id });
    } catch (error) {
      throw error;
    }

    return (deleted.deletedCount === 0) ? fail : success;
  }

  public async get(id: string) {
    let user: IPostModel | null;

    try {
      user = await Post.findById(id)
        .populate({
          path: "author",
          select: "profile -_id"
        });
    } catch (error) {
      throw error;
    }

    return user;
  }

  public async getAll() {
    let posts: IPostModel[];

    try {
      posts = await Post.find({})
        .populate({
          path: "author",
          select: "profile -_id"
          // Populate "author" with "profile" field, exclude the user's ID.
        })
        .sort({
          createdAt: -1
        });
    } catch (error) {
      throw error;
    }

    return posts;
  }

  public async update(id: string, data: IPostUpdate) {
    // don't forget about sanitizing
    const fail: IResult = { result: "fail" };
    return fail;
  }

}