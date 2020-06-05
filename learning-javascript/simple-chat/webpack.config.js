module.exports = (env) => require(`./webpack.${env}.config.js`);
// "env" may be: "development" | "production"