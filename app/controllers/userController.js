const db = require('../utils/db');

class UserController {
  static async getUsers(req, res) {
    try {
      const users = await db.findAll({
        table: 'users'
      });

      return res.status(200).json(users);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  static async getOneUser(req, res) {
    try {
      const user = await db.findById({
        table: 'users',
        id: req.params.id
      });

      return res.status(200).json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }

  static async createUser(req, res) {
    try {
      const user = await db.create({
        table: 'users',
        body: { id: 1, name: 'Sherman' }
      });

      return res.status(200).json(user);
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UserController;
