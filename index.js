require('dotenv').config({
  path: '.env.dev'
});
const api = require('lambda-api')({
  version: 'v1.0',
  base: 'api/v1',
  compression: true
});

api.use((req, res, next) => {
  res.cors();
  next();
});

api.register(require('./app/routes/userRoute'));

api.routes(true);

exports.handler = async (event, context, callback) => {
  context.callbackWaitsForEmptyEventLoop = false;
  return await api.run(event, context, callback);
};
