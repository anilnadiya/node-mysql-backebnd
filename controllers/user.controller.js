const User = require('../models/user.model');

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new User({
    name: req.body.name,
    email: req.body.email,
  });

  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    else res.send(data);
  });
};

// Retrieve all Users
exports.findAll = (req, res) => {
  User.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
    else res.send(data);
  });
};
