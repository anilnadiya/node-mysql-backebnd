const Client = require('../models/client.model');

// Create and Save a new User
exports.create = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty!" });
    return;
  }

  const user = new Client({
    name: req.body.name,
    email: req.body.email,
  });

  Client.create(user, (err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while creating the User." });
    else res.send(data);
  });
};

// Retrieve all client
exports.findAll = (req, res) => {
  Client.getAll((err, data) => {
    if (err)
      res.status(500).send({ message: err.message || "Some error occurred while retrieving users." });
    else res.send(data);
  });
};
