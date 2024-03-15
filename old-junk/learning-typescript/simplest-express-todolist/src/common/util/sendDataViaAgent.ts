interface IResolvedValue {
  agent: ChaiHttp.Agent;
  response: Express.Request & { body: any };
}

interface ISendDataViaAgent {
  (url: string, agent: ChaiHttp.Agent, data?: Object, method?: string):
    Promise<IResolvedValue>;
}

let sendDataViaAgent: ISendDataViaAgent;

// Simplifies making requests with cookies in Mocha & Chai tests using Chai's
// agent. Returns an object containing a response and the agent which may be
// useful for making further requests within one session.
sendDataViaAgent = function(url: string, agent: ChaiHttp.Agent, data?: Object,
method?: string): Promise<IResolvedValue> {
  method = method && method.toLowerCase();

  return new Promise((resolve, reject) => {
    let usedMethod;

    switch (method) {
      case "delete":
        usedMethod = agent.delete(url);
        break;

      case "post":
        usedMethod = agent.post(url);
        break;

      case "put":
        usedMethod = agent.put(url);
        break;

      case "get":
      default:
        usedMethod = agent.get(url);
    }

    usedMethod
      .set("Content-Type", "application/json")
      .send(data)
      .then((response) => resolve({ agent, response }))
      .catch((error: Error) => reject(error));
  });
}

export default sendDataViaAgent;