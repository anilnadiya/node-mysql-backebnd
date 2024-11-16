const db = require('../config/db.config');

// User Model
const User = function(user) {
  this.name = user.name;
  this.email = user.email;
};

// Create a new User
User.create = (newUser, result) => {
  db.query("INSERT INTO users SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, { id: res.insertId, ...newUser });
  });
};

// Get All Users
User.getAll = (result) => {
  db.query("SELECT * FROM tms_client", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }
    result(null, res);
  });
};

module.exports = User;
