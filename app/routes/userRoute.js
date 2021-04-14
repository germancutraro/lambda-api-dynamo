const UserController = require('../controllers/userController');

module.exports = (api, _) => {
  // Get users
  api.get('/users', UserController.getUsers);
  // Get one
  api.get('/users/:id', UserController.getOneUser);
  // Create
  api.post('/users', UserController.createUser);
};
