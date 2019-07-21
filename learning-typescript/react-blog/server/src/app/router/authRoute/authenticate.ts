import { NextFunction, Request, Response } from "express";
import User from "Server/models/User";
import IUserModel from "Types/IUserModel";

type IAuthenticate =
  (request: Request, response: Response, next: NextFunction) =>
    Promise<void>;

let authenticate: IAuthenticate;

// "authenticate" is used in 2 cases.

// 1. The client checks if there's a session. If it exists, then we need to
// find the user in DB and send their profile to the client. The user's ID is
// in "session.user".

// 2. The user just finished signing up, and now the client is trying to
// make "user" entry in the session. In this case, the body of the request
// has "userId" property in it.
authenticate = async function(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const session = request.session;
  const userId = request.body.userId ||
    (session && session.user && session.user._id);

  if (!userId)
    return response.send({ result: "fail" }) && undefined;

  let user: IUserModel | null;

  try {
    user = await User.findById(userId);
  } catch (error) {
    return next(error);
  }

  // Processing the 2nd case. Creating a proper session.
  if (user && userId && user._id.toString() === userId && session)
    session.user = { _id: userId };

  (user) ?
    response.send(user.profile) :
    response.send({ result: "fail" });
};

export default authenticate;