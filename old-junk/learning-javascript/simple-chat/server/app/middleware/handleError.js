module.exports = function(error, request, response) {
  console.error(error);
  response.send(error);
};