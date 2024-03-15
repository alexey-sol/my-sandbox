const path = require("path");
const indexFile = path.join( __dirname, "../../../client/public/index.html" );

// Retrieves "index.html" and sends it to the client. 

module.exports = (request, response, next) => {
  response.sendFile(indexFile, (error) =>
    (error) ? next(error) : null);
};