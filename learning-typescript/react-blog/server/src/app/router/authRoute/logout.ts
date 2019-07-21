import { Request, Response } from "express";

type ILogout =
  (request: Request, response: Response) => void;

let logout: ILogout;

// Destroys the session.
logout = function(
  request: Request,
  response: Response
) {
  const session = request.session;

  if (session)
    return session.destroy(error =>
      (error) ?
        response.send({ result: "fail" }) :
        response.send({ result: "success" })
    );

  response.send({ result: "fail" });
};

export default logout;